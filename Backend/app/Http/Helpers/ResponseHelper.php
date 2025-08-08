
<?php

namespace App\Http\Helpers;

use Illuminate\Support\Facades\App;

class ResponseHelper
{
    /**
     * Success response with emoji and styling
     */
    public static function success($message = null, $data = null, $statusCode = 200)
    {
        $locale = App::getLocale();
        
        $defaultMessages = [
            'ar' => '✅ تم بنجاح!',
            'en' => '✅ Success!'
        ];

        $emoji = '🎉';
        $finalMessage = $message ?: $defaultMessages[$locale];

        return response()->json([
            'success' => true,
            'message' => $emoji . ' ' . $finalMessage,
            'data' => $data,
            'locale' => $locale,
            'timestamp' => now()->toISOString()
        ], $statusCode);
    }

    /**
     * Error response with emoji and styling
     */
    public static function error($message = null, $data = null, $statusCode = 400)
    {
        $locale = App::getLocale();
        
        $defaultMessages = [
            'ar' => '❌ حدث خطأ!',
            'en' => '❌ Error occurred!'
        ];

        $emoji = '⚠️';
        $finalMessage = $message ?: $defaultMessages[$locale];

        return response()->json([
            'success' => false,
            'message' => $emoji . ' ' . $finalMessage,
            'data' => $data,
            'locale' => $locale,
            'timestamp' => now()->toISOString()
        ], $statusCode);
    }

    /**
     * Validation error response
     */
    public static function validationError($errors, $message = null)
    {
        $locale = App::getLocale();
        
        $defaultMessages = [
            'ar' => '📝 يرجى مراجعة البيانات المدخلة',
            'en' => '📝 Please check your input data'
        ];

        $finalMessage = $message ?: $defaultMessages[$locale];

        return response()->json([
            'success' => false,
            'message' => '❌ ' . $finalMessage,
            'errors' => $errors,
            'locale' => $locale,
            'timestamp' => now()->toISOString()
        ], 422);
    }

    /**
     * Not found response
     */
    public static function notFound($message = null)
    {
        $locale = App::getLocale();
        
        $defaultMessages = [
            'ar' => '🔍 العنصر المطلوب غير موجود',
            'en' => '🔍 Item not found'
        ];

        $finalMessage = $message ?: $defaultMessages[$locale];

        return response()->json([
            'success' => false,
            'message' => $finalMessage,
            'locale' => $locale,
            'timestamp' => now()->toISOString()
        ], 404);
    }

    /**
     * Unauthorized response
     */
    public static function unauthorized($message = null)
    {
        $locale = App::getLocale();
        
        $defaultMessages = [
            'ar' => '🔒 غير مصرح لك بالوصول',
            'en' => '🔒 Unauthorized access'
        ];

        $finalMessage = $message ?: $defaultMessages[$locale];

        return response()->json([
            'success' => false,
            'message' => $finalMessage,
            'locale' => $locale,
            'timestamp' => now()->toISOString()
        ], 401);
    }
}
