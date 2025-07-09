import { Request, Response } from 'express';
import axios from 'axios';
import { config } from '../utils/config';

export class VerificationController {
    public async verifyCaptcha(req: Request, res: Response): Promise<void> {
        const { captchaResponse } = req.body;

        if (!captchaResponse) {
            res.status(400).json({ success: false, message: 'CAPTCHA response is required.' });
            return;
        }

        try {
            // Verify CAPTCHA with Google reCAPTCHA
            const verificationUrl = `https://www.google.com/recaptcha/api/siteverify`;
            const response = await axios.post(verificationUrl, null, {
                params: {
                    secret: config.captchaSecretKey,
                    response: captchaResponse,
                    remoteip: req.ip
                }
            });

            if (response.data.success) {
                res.status(200).json({ success: true, message: 'CAPTCHA verified successfully.' });
            } else {
                res.status(400).json({ success: false, message: 'CAPTCHA verification failed. Please try again.' });
            }
        } catch (error) {
            console.error('CAPTCHA verification error:', error);
            res.status(500).json({ success: false, message: 'An error occurred during verification.' });
        }
    }
}