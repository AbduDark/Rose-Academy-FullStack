
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class LessonResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'video_url' => $this->video_url,
            'duration' => $this->duration,
            'order' => $this->order,
            'course_id' => $this->course_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'can_access' => Auth::check() ? 
                $this->course->subscriptions()->where('user_id', Auth::id())
                    ->where('status', 'active')
                    ->where('expires_at', '>', now())
                    ->exists() : false,
        ];
    }
}
