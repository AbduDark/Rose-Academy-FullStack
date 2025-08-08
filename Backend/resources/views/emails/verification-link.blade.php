
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تأكيد البريد الإلكتروني</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 20px;
            direction: rtl;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .content {
            padding: 30px;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 25px;
            margin: 20px 0;
            font-weight: bold;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>أهلاً وسهلاً بك في Rose Academy!</h1>
        </div>
        <div class="content">
            <h2>مرحباً بك!</h2>
            <p>شكراً لتسجيلك في منصة Rose Academy التعليمية.</p>
            <p>للمتابعة واستخدام حسابك، يرجى تأكيد بريدك الإلكتروني من خلال الضغط على الزر أدناه:</p>
            
            <div style="text-align: center;">
                <a href="{{ $verificationLink }}" class="button">تأكيد البريد الإلكتروني</a>
            </div>
            
            <p style="color: #666; font-size: 14px;">
                إذا لم تتمكن من الضغط على الزر، يمكنك نسخ ولصق الرابط التالي في متصفحك:
            </p>
            <p style="word-break: break-all; color: #007bff;">{{ $verificationLink }}</p>
            
            <p style="color: #e74c3c; font-size: 12px;">
                هذا الرابط صالح لمدة 30 دقيقة فقط.
            </p>
        </div>
        <div class="footer">
            <p>هذه رسالة آلية، يرجى عدم الرد عليها</p>
            <p>&copy; 2024 Rose Academy. جميع الحقوق محفوظة.</p>
        </div>
    </div>
</body>
</html>
