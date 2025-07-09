import { Request, Response } from 'express';
import { WalletService } from '../services/walletService';
import { BlockchainService } from '../services/blockchainService';
import { FAUCET_AMOUNT } from '../utils/config';

class FaucetController {
    private walletService: WalletService;
    private blockchainService: BlockchainService;

    constructor() {
        this.walletService = new WalletService();
        this.blockchainService = new BlockchainService();
    }

    public async claimTokens(req: Request, res: Response): Promise<void> {
        const { walletAddress } = req.body;

        if (!this.walletService.validateWalletAddress(walletAddress)) {
            res.status(400).json({ 
                success: false,
                message: 'Invalid wallet address.' 
            });
            return;
        }

        // Check if wallet is ready
        if (!this.blockchainService.isWalletReady()) {
            res.status(500).json({
                success: false,
                message: 'Faucet is not configured properly. Please contact administrator.'
            });
            return;
        }

        try {
            const transaction = await this.blockchainService.sendTokens(walletAddress, FAUCET_AMOUNT);
            res.status(200).json({ 
                success: true,
                message: 'Tokens claimed successfully!', 
                transactionId: transaction,
                amount: FAUCET_AMOUNT
            });
        } catch (error) {
            console.error('Error claiming tokens:', error);
            res.status(500).json({ 
                success: false,
                message: 'Error claiming tokens. Please try again later.' 
            });
        }
    }

    public async getClaimStatus(req: Request, res: Response): Promise<void> {
        const { walletAddress } = req.params;

        // Logic to check claim status can be implemented here
        res.status(200).json({ message: 'Claim status retrieved successfully.' });
    }
}

export default FaucetController;