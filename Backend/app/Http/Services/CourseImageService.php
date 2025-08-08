
<?php

namespace App\Http\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class CourseImageService
{
    protected $imageManager;

    public function __construct()
    {
        $this->imageManager = new ImageManager(new Driver());
    }

    public function uploadAndResize(UploadedFile $file, string $path = 'courses'): string
    {
        // Create unique filename
        $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        
        // Read and resize image
        $image = $this->imageManager->read($file->getPathname());
        
        // Resize to standard course thumbnail size
        $image = $image->resize(800, 600, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        // Save to storage
        $fullPath = $path . '/' . $filename;
        Storage::disk('public')->put($fullPath, $image->encode());

        return $fullPath;
    }

    public function deleteImage(string $path): bool
    {
        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->delete($path);
        }
        
        return false;
    }

    public function updateImage(UploadedFile $newFile, ?string $oldPath = null, string $path = 'courses'): string
    {
        // Delete old image if exists
        if ($oldPath) {
            $this->deleteImage($oldPath);
        }

        // Upload new image
        return $this->uploadAndResize($newFile, $path);
    }

    public function resizeExisting(string $imagePath): string
    {
        $image = $this->imageManager->read(Storage::disk('public')->path($imagePath));
        
        // Resize to standard course thumbnail size
        $image = $image->resize(800, 600, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        // Save back to storage
        Storage::disk('public')->put($imagePath, $image->encode());

        return $imagePath;
    }
}
