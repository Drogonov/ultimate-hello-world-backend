import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { ConfigurationService } from 'src/config/configuration.service';

@Injectable()
export class MailService {
  constructor(
    private config: ConfigurationService
  ) {
    sgMail.setApiKey(config.getEmailAPI());
  }

  async sendOtpEmail(email: string, otp: string) {
    const msg = {
      to: email,
      from: {
        name: 'Ultimate Hello World Team',
        email: 'dump@vlezko.com',
      },
      subject: '🌟 Verify Your Account with Ultimate Hello World!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto; padding: 20px; text-align: center; border: 1px solid #e1e1e1; border-radius: 10px;">
          <h1 style="color: #0047AB;">Welcome to Ultimate Hello World!</h1>
          <p style="font-size: 18px; color: #333;">Thank you for signing up. Your journey to awesomeness starts here.</p>
          <p style="font-size: 20px; font-weight: bold; color: #0047AB;">Your Verification Code:</p>
          <p style="font-size: 24px; font-weight: bold; color: #F05032;">${otp}</p>
          <p style="font-size: 16px; color: #333;">Enter this verification code on our app form to get started.</p>
          <p style="font-size: 14px; color: #555;">If you didn’t request this email, please ignore it or let us know.</p>
          <p style="font-size: 14px; color: #777;">Follow us on <a href="https://github.com/Drogonov/ultimate-hello-world-backend" target="_blank" style="color: #F05032; text-decoration: none;">GitHub</a></p>
          <p style="font-size: 12px; color: #999;">&copy; 2023 Ultimate Hello World. All rights reserved.</p>
        </div>
      `
    };

    try {
      await sgMail.send(msg);
      console.log('OTP email sent successfully');
    } catch (error) {
      console.error('Error sending OTP email:', error);
    }
  }
}