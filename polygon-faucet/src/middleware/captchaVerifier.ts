import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { config } from '../utils/config';

export const captchaVerifier = async (req: Request, res: Response, next: NextFunction) => {
    const captchaResponse = req.body.captcha;

    if (!captchaResponse) {
        return res.status(400).json({ message: "CAPTCHA response is required." });
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
            next();
        } else {
            return res.status(403).json({ message: "CAPTCHA verification failed." });
        }
    } catch (error) {
        console.error('CAPTCHA verification error:', error);
        return res.status(500).json({ message: "Internal server error during CAPTCHA verification." });
    }
};