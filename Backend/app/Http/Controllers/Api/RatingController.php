
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ResponseHelper;
use App\Models\Rating;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RatingController extends Controller
{
    public function store(Request $request, $courseId)
    {
        $course = Course::find($courseId);
        if (!$course) {
            return ResponseHelper::notFound(__('messages.courses.not_found'));
        }

        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:500'
        ]);

        if ($validator->fails()) {
            return ResponseHelper::validationError($validator->errors());
        }

        $existingRating = Rating::where('user_id', $request->user()->id)
                               ->where('course_id', $courseId)
                               ->first();

        if ($existingRating) {
            $existingRating->update([
                'rating' => $request->rating,
                'review' => $request->review
            ]);
            $rating = $existingRating;
            $message = __('messages.ratings.updated_successfully') . ' ⭐';
        } else {
            $rating = Rating::create([
                'user_id' => $request->user()->id,
                'course_id' => $courseId,
                'rating' => $request->rating,
                'review' => $request->review
            ]);
            $message = __('messages.ratings.created_successfully') . ' 🌟';
        }

        $rating->load('user:id,name');

        // حساب متوسط التقييم للكورس
        $averageRating = Rating::where('course_id', $courseId)->avg('rating');
        $ratingsCount = Rating::where('course_id', $courseId)->count();

        return ResponseHelper::success($message, [
            'rating' => $rating,
            'course_average' => round($averageRating, 1),
            'total_ratings' => $ratingsCount
        ]);
    }

    public function getCourseRatings($courseId)
    {
        $course = Course::find($courseId);
        if (!$course) {
            return ResponseHelper::notFound(__('messages.courses.not_found'));
        }

        $ratings = Rating::where('course_id', $courseId)
                        ->with('user:id,name')
                        ->orderBy('created_at', 'desc')
                        ->paginate(10);

        $averageRating = Rating::where('course_id', $courseId)->avg('rating');
        $ratingsCount = Rating::where('course_id', $courseId)->count();

        $ratingsBreakdown = [];
        for ($i = 1; $i <= 5; $i++) {
            $count = Rating::where('course_id', $courseId)->where('rating', $i)->count();
            $ratingsBreakdown[$i] = [
                'count' => $count,
                'percentage' => $ratingsCount > 0 ? round(($count / $ratingsCount) * 100, 1) : 0
            ];
        }

        return ResponseHelper::success('⭐ ' . __('messages.ratings.list_retrieved'), [
            'ratings' => $ratings,
            'average_rating' => round($averageRating, 1),
            'total_ratings' => $ratingsCount,
            'ratings_breakdown' => $ratingsBreakdown
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $rating = Rating::find($id);

        if (!$rating) {
            return ResponseHelper::notFound(__('messages.ratings.not_found'));
        }

        if ($rating->user_id !== $request->user()->id && $request->user()->role !== 'admin') {
            return ResponseHelper::unauthorized();
        }

        $rating->delete();

        return ResponseHelper::success(__('messages.ratings.deleted_successfully') . ' 🗑️');
    }
}
