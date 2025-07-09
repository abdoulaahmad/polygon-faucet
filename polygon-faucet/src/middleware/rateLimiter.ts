import { Request, Response, NextFunction } from 'express';

const RATE_LIMIT = 1; // Maximum number of requests
const TIME_FRAME = 12 * 60 * 60 * 1000; // Time frame in milliseconds (12 hours)

const userRequests: { [key: string]: { count: number; lastRequestTime: number } } = {};

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
    const userIp = req.ip || req.connection.remoteAddress || 'unknown';

    const currentTime = Date.now();

    if (!userRequests[userIp]) {
        userRequests[userIp] = { count: 1, lastRequestTime: currentTime };
        next();
    } else {
        const timeSinceLastRequest = currentTime - userRequests[userIp].lastRequestTime;

        if (timeSinceLastRequest > TIME_FRAME) {
            userRequests[userIp] = { count: 1, lastRequestTime: currentTime };
            next();
        } else {
            if (userRequests[userIp].count < RATE_LIMIT) {
                userRequests[userIp].count++;
                next();
            } else {
                res.status(429).json({ 
                    success: false, 
                    message: 'You have already claimed tokens. Please wait 12 hours before claiming again.' 
                });
            }
        }
    }
};