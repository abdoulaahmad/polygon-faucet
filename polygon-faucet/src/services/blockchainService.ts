import { ethers } from 'ethers';
import { config } from '../utils/config';

export class BlockchainService {
    private provider: ethers.JsonRpcProvider;
    private wallet: ethers.Wallet | null = null;

    constructor() {
        this.provider = new ethers.JsonRpcProvider(config.rpcUrl);
        
        // Only create wallet if private key is provided and valid
        if (config.privateKey && config.privateKey.length > 0 && config.privateKey !== 'your_private_key_here') {
            try {
                this.wallet = new ethers.Wallet(config.privateKey, this.provider);
            } catch (error) {
                console.error('Invalid private key provided. Wallet functionality will be disabled.');
                console.error('Please check your PRIVATE_KEY in the .env file');
            }
        } else {
            console.warn('No private key provided. Wallet functionality will be disabled.');
            console.warn('Please set PRIVATE_KEY in your .env file to enable token transfers.');
        }
    }

    async sendTokens(to: string, amount: number): Promise<string> {
        if (!this.wallet) {
            throw new Error('Wallet not initialized. Please provide a valid private key in your .env file.');
        }

        const transaction = {
            to: to,
            value: ethers.parseEther(amount.toString()),
        };

        const txResponse = await this.wallet.sendTransaction(transaction);
        await txResponse.wait();
        return txResponse.hash;
    }

    async checkTransactionStatus(txHash: string): Promise<ethers.TransactionReceipt | null> {
        const txReceipt = await this.provider.getTransactionReceipt(txHash);
        return txReceipt;
    }

    isWalletReady(): boolean {
        return this.wallet !== null;
    }
}