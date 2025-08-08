
<?php

return [
    'app_name' => env('APP_NAME', 'Rose Academy'),
    'version' => '2.0',
    'api_version' => 'v1',
    
    'subscription' => [
        'duration_days' => 30,
        'auto_approve' => false,
    ],
    
    'course' => [
        'max_upload_size' => '10MB',
        'allowed_formats' => ['jpg', 'jpeg', 'png', 'gif'],
    ],
    
    'security' => [
        'max_login_attempts' => 5,
        'lockout_duration' => 900, // 15 minutes
    ],
];
