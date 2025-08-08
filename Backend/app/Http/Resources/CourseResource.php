
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class CourseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'image' => $this->image,
            'price' => $this->price,
            'category' => $this->category,
            'level' => $this->level,
            'duration' => $this->duration,
            'instructor' => $this->instructor,
            'rating' => $this->rating,
            'students_count' => $this->students_count,
            'lessons_count' => $this->lessons_count,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'is_subscribed' => Auth::check() ? 
                $this->subscriptions()->where('user_id', Auth::id())->exists() : false,
            'is_favorite' => Auth::check() ? 
                $this->favorites()->where('user_id', Auth::id())->exists() : false,
        ];
    }
}
