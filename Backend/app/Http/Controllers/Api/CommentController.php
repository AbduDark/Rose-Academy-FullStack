
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ResponseHelper;
use App\Models\Comment;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function index($courseId)
    {
        $course = Course::find($courseId);
        if (!$course) {
            return ResponseHelper::notFound(__('messages.courses.not_found'));
        }

        $comments = Comment::where('course_id', $courseId)
                          ->with('user:id,name')
                          ->orderBy('created_at', 'desc')
                          ->paginate(10);

        return ResponseHelper::success('💬 ' . __('messages.comments.list_retrieved'), $comments);
    }

    public function store(Request $request, $courseId)
    {
        $course = Course::find($courseId);
        if (!$course) {
            return ResponseHelper::notFound(__('messages.courses.not_found'));
        }

        $validator = Validator::make($request->all(), [
            'comment' => 'required|string|max:1000'
        ]);

        if ($validator->fails()) {
            return ResponseHelper::validationError($validator->errors());
        }

        $comment = Comment::create([
            'user_id' => $request->user()->id,
            'course_id' => $courseId,
            'comment' => $request->comment
        ]);

        $comment->load('user:id,name');

        return ResponseHelper::success(__('messages.comments.created_successfully') . ' 💭', $comment, 201);
    }

    public function update(Request $request, $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return ResponseHelper::notFound(__('messages.comments.not_found'));
        }

        if ($comment->user_id !== $request->user()->id && $request->user()->role !== 'admin') {
            return ResponseHelper::unauthorized();
        }

        $validator = Validator::make($request->all(), [
            'comment' => 'required|string|max:1000'
        ]);

        if ($validator->fails()) {
            return ResponseHelper::validationError($validator->errors());
        }

        $comment->update(['comment' => $request->comment]);

        return ResponseHelper::success(__('messages.comments.updated_successfully') . ' ✏️', $comment);
    }

    public function destroy(Request $request, $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return ResponseHelper::notFound(__('messages.comments.not_found'));
        }

        if ($comment->user_id !== $request->user()->id && $request->user()->role !== 'admin') {
            return ResponseHelper::unauthorized();
        }

        $comment->delete();

        return ResponseHelper::success(__('messages.comments.deleted_successfully') . ' 🗑️');
    }
}
