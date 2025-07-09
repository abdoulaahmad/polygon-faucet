import { Router, Application } from 'express';
import { setFaucetRoutes } from './faucet';

const router = Router();

export function setRoutes(app: Application) {
    setFaucetRoutes(router);
    app.use('/api', router);
}