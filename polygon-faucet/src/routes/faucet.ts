import { Router } from 'express';
import FaucetController from '../controllers/faucetController';
import { captchaVerifier } from '../middleware/captchaVerifier';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const faucetController = new FaucetController();

export function setFaucetRoutes(app: Router) {
    app.use('/faucet', router);
    
    router.post('/claim', rateLimiter, captchaVerifier, (req, res) => {
        faucetController.claimTokens(req, res);
    });

    router.get('/status/:walletAddress', (req, res) => {
        faucetController.getClaimStatus(req, res);
    });
}