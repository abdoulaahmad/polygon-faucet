export const FAUCET_AMOUNT = 0.4; // Amount of MATIC to be claimed
export const RATE_LIMIT = {
    windowMs: 12 * 60 * 60 * 1000, // 12 hours
    max: 1 // Limit each IP to 1 request per 12 hours
};

export const config = {
    rpcUrl: process.env.RPC_URL || 'https://rpc-mumbai.maticvigil.com',
    privateKey: process.env.PRIVATE_KEY || '',
    port: process.env.PORT || 3000,
    captchaSecretKey: process.env.CAPTCHA_SECRET_KEY || '',
};