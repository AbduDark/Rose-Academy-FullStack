
<?php

namespace App\Http\Services;

use Intervention\Image\ImageManagerStatic as Image;

class CourseImageService
{
    public static function generateCourseImage($courseData)
    {
        // قوالب الصور
        $templates = [
            public_path('images/templates/template1.jpg'),
            public_path('images/templates/template2.jpg'),
            public_path('images/templates/template3.jpg')
        ];
        
        // اختر قالب عشوائي
        $templatePath = $templates[array_rand($templates)];
        
        // إنشاء صورة افتراضية إذا لم توجد القوالب
        if (!file_exists($templatePath)) {
            return self::createDefaultImage($courseData);
        }
        
        // تحميل القالب
        $image = Image::make($templatePath);
        
        // إضافة النصوص
        $image->text($courseData['title'], 400, 150, function($font) {
            $font->file(public_path('fonts/NotoSansArabic-Bold.ttf'));
            $font->size(48);
            $font->color('#ffffff');
            $font->align('center');
        });
        
        $image->text($courseData['price'] . ' جنيه', 400, 220, function($font) {
            $font->file(public_path('fonts/NotoSansArabic-Regular.ttf'));
            $font->size(32);
            $font->color('#f39c12');
            $font->align('center');
        });
        
        $image->text($courseData['description'], 400, 280, function($font) {
            $font->file(public_path('fonts/NotoSansArabic-Regular.ttf'));
            $font->size(24);
            $font->color('#ecf0f1');
            $font->align('center');
        });
        
        // حفظ الصورة
        $fileName = 'course_' . time() . '.jpg';
        $path = public_path('images/courses/' . $fileName);
        $image->save($path);
        
        return 'images/courses/' . $fileName;
    }
    
    private static function createDefaultImage($courseData)
    {
        // إنشاء صورة افتراضية
        $image = Image::canvas(800, 400, '#3498db');
        
        $image->text($courseData['title'], 400, 150, function($font) {
            $font->size(40);
            $font->color('#ffffff');
            $font->align('center');
        });
        
        $image->text($courseData['price'] . ' ج.م', 400, 220, function($font) {
            $font->size(28);
            $font->color('#f39c12');
            $font->align('center');
        });
        
        $fileName = 'course_default_' . time() . '.jpg';
        $path = public_path('images/courses/' . $fileName);
        $image->save($path);
        
        return 'images/courses/' . $fileName;
    }
}
