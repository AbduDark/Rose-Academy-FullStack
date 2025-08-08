
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendVerificationLinkMail extends Mailable
{
    use Queueable, SerializesModels;

    public $verificationLink;

    public function __construct($verificationLink)
    {
        $this->verificationLink = $verificationLink;
    }

    public function build()
    {
        return $this->subject('تأكيد البريد الإلكتروني - Rose Academy')
                    ->view('emails.verification-link');
    }
}
