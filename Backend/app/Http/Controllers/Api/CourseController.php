
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ResponseHelper;
use App\Http\Services\CourseImageService;
use App\Models\Course;
use App\Models\Subscription;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    protected $imageService;

    public function __construct(CourseImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function index(Request $request)
    {
        $query = Course::query();

        // فلترة حسب الجنس
        if ($request->gender) {
            $query->where(function($q) use ($request) {
                $q->where('gender', $request->gender)
                  ->orWhere('gender', 'both');
            });
        }

        // فلترة حسب الفئة
        if ($request->category) {
            $query->where('category', $request->category);
        }

        // البحث
        if ($request->search) {
            $query->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        // الترتيب
        $sortBy = $request->sort_by ?? 'created_at';
        $sortOrder = $request->sort_order ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        $courses = $query->with(['instructor', 'ratings'])
                        ->paginate($request->per_page ?? 12);

        // إضافة بيانات إضافية لكل كورس
        $courses->getCollection()->transform(function ($course) use ($request) {
            $course->average_rating = $course->ratings->avg('rating') ?? 0;
            $course->ratings_count = $course->ratings->count();
            
            // فحص الاشتراك إذا كان المستخدم مسجل دخول
            if ($request->user()) {
                $course->is_subscribed = Subscription::where('user_id', $request->user()->id)
                    ->where('course_id', $course->id)
                    ->exists();
            }

            return $course;
        });

        return ResponseHelper::success('📚 ' . __('messages.courses.list_retrieved'), $courses);
    }

    public function show($id, Request $request)
    {
        $course = Course::with(['instructor', 'ratings.user', 'lessons'])
                       ->find($id);

        if (!$course) {
            return ResponseHelper::notFound(__('messages.courses.not_found'));
        }

        // إضافة بيانات إضافية
        $course->average_rating = $course->ratings->avg('rating') ?? 0;
        $course->ratings_count = $course->ratings->count();
        $course->lessons_count = $course->lessons->count();

        // فحص الاشتراك
        if ($request->user()) {
            $course->is_subscribed = Subscription::where('user_id', $request->user()->id)
                ->where('course_id', $course->id)
                ->exists();
        }

        return ResponseHelper::success('👁️ ' . __('messages.courses.details_retrieved'), $course);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string',
            'gender' => 'required|in:male,female,both',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return ResponseHelper::validationError($validator->errors());
        }

        $courseData = $request->only(['title', 'description', 'price', 'category', 'gender']);
        $courseData['instructor_id'] = $request->user()->id;

        // رفع الصورة إذا تم توفيرها
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('courses', 'public');
            $courseData['image'] = $imagePath;
        }

        $course = Course::create($courseData);

        // إنشاء صورة تلقائية
        if (!$request->hasFile('image')) {
            $autoImagePath = $this->imageService->generateCourseImage($course);
            $course->update(['auto_image' => $autoImagePath]);
        }

        return ResponseHelper::success(__('messages.courses.created_successfully') . ' 🎉', $course, 201);
    }

    public function update(Request $request, $id)
    {
        $course = Course::find($id);

        if (!$course) {
            return ResponseHelper::notFound(__('messages.courses.not_found'));
        }

        // فحص الصلاحية
        if ($request->user()->role !== 'admin' && $course->instructor_id !== $request->user()->id) {
            return ResponseHelper::unauthorized();
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'category' => 'sometimes|string',
            'gender' => 'sometimes|in:male,female,both',
            'status' => 'sometimes|in:active,inactive',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return ResponseHelper::validationError($validator->errors());
        }

        $updateData = $request->only(['title', 'description', 'price', 'category', 'gender', 'status']);

        // رفع صورة جديدة
        if ($request->hasFile('image')) {
            // حذف الصورة القديمة
            if ($course->image) {
                Storage::disk('public')->delete($course->image);
            }
            $updateData['image'] = $request->file('image')->store('courses', 'public');
        }

        $course->update($updateData);

        // إعادة إنشاء الصورة التلقائية إذا تغيرت البيانات المهمة
        if (isset($updateData['title']) || isset($updateData['price']) || isset($updateData['description'])) {
            if ($course->auto_image) {
                Storage::disk('public')->delete($course->auto_image);
            }
            $autoImagePath = $this->imageService->generateCourseImage($course);
            $course->update(['auto_image' => $autoImagePath]);
        }

        return ResponseHelper::success(__('messages.courses.updated_successfully') . ' ✨', $course);
    }

    public function destroy($id, Request $request)
    {
        $course = Course::find($id);

        if (!$course) {
            return ResponseHelper::notFound(__('messages.courses.not_found'));
        }

        // فحص الصلاحية
        if ($request->user()->role !== 'admin' && $course->instructor_id !== $request->user()->id) {
            return ResponseHelper::unauthorized();
        }

        // حذف الصور
        if ($course->image) {
            Storage::disk('public')->delete($course->image);
        }
        if ($course->auto_image) {
            Storage::disk('public')->delete($course->auto_image);
        }

        $course->delete();

        return ResponseHelper::success(__('messages.courses.deleted_successfully') . ' 🗑️');
    }

    public function getMyCourses(Request $request)
    {
        $courses = Course::where('instructor_id', $request->user()->id)
                        ->with(['ratings'])
                        ->get();

        $courses->transform(function ($course) {
            $course->average_rating = $course->ratings->avg('rating') ?? 0;
            $course->ratings_count = $course->ratings->count();
            $course->subscribers_count = Subscription::where('course_id', $course->id)->count();
            return $course;
        });

        return ResponseHelper::success('👨‍🏫 ' . __('messages.courses.instructor_courses'), $courses);
    }

    public function getSubscribedCourses(Request $request)
    {
        $subscriptions = Subscription::where('user_id', $request->user()->id)
                                   ->with(['course.instructor', 'course.ratings'])
                                   ->get();

        $courses = $subscriptions->map(function ($subscription) {
            $course = $subscription->course;
            $course->average_rating = $course->ratings->avg('rating') ?? 0;
            $course->ratings_count = $course->ratings->count();
            $course->subscription_date = $subscription->created_at;
            return $course;
        });

        return ResponseHelper::success('📖 ' . __('messages.courses.subscribed_courses'), $courses);
    }
}
