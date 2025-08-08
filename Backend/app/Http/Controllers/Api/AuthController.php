<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ResponseHelper;
use App\Models\User;
use App\Models\EmailVerification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use App\Mail\SendPinMail;
use App\Mail\SendVerificationLinkMail;
use Carbon\Carbon;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'gender' => 'required|in:male,female'
        ]);

        if ($validator->fails()) {
            return ResponseHelper::validationError($validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'gender' => $request->gender,
            'role' => 'student'
        ]);

        // إنشاء رابط التحقق
        $verification = EmailVerification::create([
            'user_id' => $user->id,
            'token' => Str::random(64),
            'type' => 'email_verification',
            'expires_at' => now()->addHours(24)
        ]);

        // إرسال رابط التحقق
        Mail::to($user->email)->send(new SendVerificationLinkMail($user, $verification->token));

        $message = __('messages.auth.registered_successfully') . ' 📧 ' . __('messages.auth.verification_link_sent');

        return ResponseHelper::success($message, [
            'user' => $user,
            'verification_required' => true
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return ResponseHelper::validationError($validator->errors());
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return ResponseHelper::error(__('messages.auth.invalid_credentials'), null, 401);
        }

        if (!$user->email_verified_at) {
            return ResponseHelper::error(__('messages.auth.email_not_verified'), null, 403);
        }

        // فحص تسجيل الدخول على جهاز آخر
        if ($user->session_token && $user->session_token !== session()->getId()) {
            return ResponseHelper::error(__('messages.auth.already_logged_in_another_device'), null, 409);
        }

        $user->update(['session_token' => session()->getId()]);
        $token = $user->createToken('auth_token')->plainTextToken;

        $message = __('messages.auth.login_done') . ' 🚀';

        return ResponseHelper::success($message, [
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        $request->user()->update(['session_token' => null]);

        return ResponseHelper::success(__('messages.auth.logged_out_successfully') . ' 👋');
    }

    public function profile(Request $request)
    {
        return ResponseHelper::success('👤 ' . __('messages.general.profile_data'), $request->user());
    }

    public function verifyEmail($token)
    {
        $verification = EmailVerification::where('token', $token)
            ->where('type', 'email_verification')
            ->where('expires_at', '>', now())
            ->first();

        if (!$verification) {
            return redirect(env('FRONTEND_URL', 'http://localhost:3000') . '/verify-email?status=error&message=' . urlencode(__('messages.auth.invalid_or_expired_token')));
        }

        $user = User::find($verification->user_id);
        if (!$user) {
            return redirect(env('FRONTEND_URL', 'http://localhost:3000') . '/verify-email?status=error&message=' . urlencode(__('messages.general.user_not_found')));
        }

        if ($user->email_verified_at) {
            return redirect(env('FRONTEND_URL', 'http://localhost:3000') . '/verify-email?status=info&message=' . urlencode(__('messages.auth.email_already_verified')));
        }

        $user->update(['email_verified_at' => now()]);
        $verification->delete();

        return redirect(env('FRONTEND_URL', 'http://localhost:3000') . '/verify-email?status=success&message=' . urlencode(__('messages.auth.email_verified_successfully')));
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email'
        ]);

        if ($validator->fails()) {
            return ResponseHelper::validationError($validator->errors());
        }

        $user = User::where('email', $request->email)->first();
        $pin = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        EmailVerification::where('user_id', $user->id)
            ->where('type', 'password_reset')
            ->delete();

        EmailVerification::create([
            'user_id' => $user->id,
            'pin' => $pin,
            'type' => 'password_reset',
            'expires_at' => now()->addMinutes(15)
        ]);

        Mail::to($user->email)->send(new SendPinMail($user, $pin));

        return ResponseHelper::success(__('messages.auth.verification_pin_sent') . ' 📧');
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'pin' => 'required|string|size:6',
            'password' => 'required|string|min:8|confirmed'
        ]);

        if ($validator->fails()) {
            return ResponseHelper::validationError($validator->errors());
        }

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return ResponseHelper::error(__('messages.general.user_not_found'), null, 404);
        }

        $verification = EmailVerification::where('user_id', $user->id)
            ->where('pin', $request->pin)
            ->where('type', 'password_reset')
            ->where('expires_at', '>', now())
            ->first();

        if (!$verification) {
            return ResponseHelper::error(__('messages.auth.invalid_or_expired_pin'), null, 400);
        }

        $user->update(['password' => Hash::make($request->password)]);
        $verification->delete();

        return ResponseHelper::success(__('messages.auth.password_reset_successfully') . ' 🔑');
    }

    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $request->user()->id,
            'gender' => 'sometimes|in:male,female'
        ]);

        if ($validator->fails()) {
            return ResponseHelper::validationError($validator->errors());
        }

        $request->user()->update($request->only(['name', 'email', 'gender']));

        return ResponseHelper::success(__('messages.auth.profile_updated_successfully') . ' ✨', $request->user());
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed'
        ]);

        if ($validator->fails()) {
            return ResponseHelper::validationError($validator->errors());
        }

        if (!Hash::check($request->current_password, $request->user()->password)) {
            return ResponseHelper::error(__('messages.auth.current_password_incorrect'), null, 400);
        }

        $request->user()->update(['password' => Hash::make($request->password)]);

        return ResponseHelper::success(__('messages.auth.password_changed_successfully') . ' 🔐');
    }
}