import sendEmail from '../../utils/sendEmail';


async function sendOTPEmail(to: string, otp: string): Promise<void> {
    const subject = "Verification Code for Your Account";
    const text = `
        You recently requested a one-time code to verify your identity.

        Your verification code is: ${otp}

        This code will expire in 10 minutes.
        For your security, do not share this code with anyone.

        If you didn't request this, ignore this email.

        Thank you for using CGX-ProfileX.

        Sincerely,
        Support Team,
        CGX-ProfileX (https://trailerror.tech)
    `.trim();

    const html = `
        <div style="max-width:600px;margin:30px auto;padding:40px;background-color:#ffffff;border-radius:8px;font-family:Segoe UI, Roboto, sans-serif;color:#333333;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
            <h2 style="color:#40a9ff;margin-top:0;">Verify Your Identity</h2>

            <p style="font-size:14px;line-height:1.5;">
                You recently requested a one-time code to verify your identity.
            </p>

            <div style="font-size:24px;font-weight:bold;background-color:#f0f0f5;color:#1a1a1a;padding:15px;text-align:center;letter-spacing:4px;border-radius:6px;margin:20px 0;">
                ${otp}
            </div>

            <p style="font-size:14px;line-height:1.5;">
                This code will expire in <strong>10 minutes</strong>.
            </p>

            <p style="font-size:14px;line-height:1.5;">
                For your security, do not share this code with anyone.
            </p>

            <p style="font-size:14px;line-height:1.5">
                If you didn't request this, you can safely ignore this email.
            </p>

            <p style="font-size:14px;margin-top:30px;">
                Thank you for using CGX-ProfileX.
            </p>

            <p style="font-size:14px;line-height:1.5;margin-bottom:0;">
                Sincerely,<br>
                Support Team,<br>
                <a href="https://trailerror.tech" style="color:#40a9ff;text-decoration:none;" target="_blank">CGX-ProfileX</a>
            </p>

            <div style="font-size:12px;color:#999999;margin-top:40px;text-align:center;">
                © 2025 CGX-ProfileX. All rights reserved.
            </div>
        </div>
    `;

    await sendEmail({
        to,
        subject,
        text,
        html
    });
}

export {
    sendOTPEmail
};
