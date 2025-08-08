<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Rose Academy API',
        'version' => '2.0',
        'status' => 'active'
    ]);
});

// إضافة route للـ login لحل مشكلة الخطأ
Route::get('/login', function () {
    return response()->json([
        'message' => 'Please login via API',
        'login_endpoint' => '/api/login'
    ], 401);
})->name('login');