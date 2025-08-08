
<?php

namespace App\Http\Services;

use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class CourseImageService
{
    private $templates = [
        'template1.jpg',
        'template2.jpg', 
        'template3.jpg'
    ];

    public function generateCourseImage($course)
    {
        // اختيار قالب عشوائي
        $templateIndex = rand(0, count($this->templates) - 1);
        $template = $this->templates[$templateIndex];
        
        // مسار القالب
        $templatePath = public_path("images/templates/{$template}");
        
        if (!file_exists($templatePath)) {
            // إنشاء صورة افتراضية إذا لم يوجد القالب
            return $this->createDefaultImage($course);
        }

        // إنشاء الصورة
        $image = Image::make($templatePath);
        
        // إضافة النص للصورة
        $this->addTextToImage($image, $course);
        
        // حفظ الصورة
        $fileName = 'course_' . $course->id . '_auto_' . time() . '.jpg';
        $filePath = 'courses/auto-generated/' . $fileName;
        
        Storage::disk('public')->put($filePath, $image->encode('jpg', 90));
        
        return $filePath;
    }

    private function addTextToImage($image, $course)
    {
        $locale = app()->getLocale();
        
        // إعدادات النص
        $titleSize = 32;
        $priceSize = 28;
        $descSize = 18;
        
        // ألوان النص
        $titleColor = '#FFFFFF';
        $priceColor = '#FFD700';
        $descColor = '#F0F0F0';
        
        // إضافة عنوان الكورس
        $image->text($course->title, $image->width() / 2, 100, function($font) use ($titleSize, $titleColor) {
            $font->file(public_path('fonts/arial.ttf'));
            $font->size($titleSize);
            $font->color($titleColor);
            $font->align('center');
            $font->valign('top');
        });
        
        // إضافة السعر
        $priceText = $locale === 'ar' ? 
            "💰 {$course->price} جنيه" : 
            "💰 {$course->price} EGP";
            
        $image->text($priceText, $image->width() / 2, 160, function($font) use ($priceSize, $priceColor) {
            $font->file(public_path('fonts/arial.ttf'));
            $font->size($priceSize);
            $font->color($priceColor);
            $font->align('center');
            $font->valign('top');
        });
        
        // إضافة جزء من الوصف
        $description = strlen($course->description) > 100 ? 
            substr($course->description, 0, 97) . '...' : 
            $course->description;
            
        $image->text($description, $image->width() / 2, 220, function($font) use ($descSize, $descColor) {
            $font->file(public_path('fonts/arial.ttf'));
            $font->size($descSize);
            $font->color($descColor);
            $font->align('center');
            $font->valign('top');
        });
        
        // إضافة شعار أو علامة مائية
        $watermark = $locale === 'ar' ? 
            '🌹 أكاديمية الورد للتعلم' : 
            '🌹 Rose Academy Learning';
            
        $image->text($watermark, $image->width() - 20, $image->height() - 30, function($font) use ($descColor) {
            $font->file(public_path('fonts/arial.ttf'));
            $font->size(14);
            $font->color($descColor);
            $font->align('right');
            $font->valign('bottom');
        });
    }

    private function createDefaultImage($course)
    {
        // إنشاء صورة افتراضية بخلفية متدرجة
        $image = Image::canvas(800, 400, '#667eea');
        
        // إضافة خلفية متدرجة
        for ($i = 0; $i < 400; $i++) {
            $color = sprintf('#%02x%02x%02x', 
                102 + ($i * 0.3), 
                126 + ($i * 0.2), 
                234 - ($i * 0.1)
            );
            $image->line(0, $i, 800, $i, $color);
        }
        
        $this->addTextToImage($image, $course);
        
        $fileName = 'course_' . $course->id . '_default_' . time() . '.jpg';
        $filePath = 'courses/auto-generated/' . $fileName;
        
        Storage::disk('public')->put($filePath, $image->encode('jpg', 90));
        
        return $filePath;
    }
}
