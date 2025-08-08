
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Helpers\ResponseHelper;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!$request->user()) {
            return ResponseHelper::unauthorized(__('messages.auth.login_required'));
        }

        if (!in_array($request->user()->role, $roles)) {
            return ResponseHelper::unauthorized(__('messages.auth.insufficient_permissions'));
        }

        return $next($request);
    }
}
