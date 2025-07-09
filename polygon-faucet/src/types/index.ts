export interface ClaimRequest {
    walletAddress: string;
    captchaToken: string;
}

export interface ClaimResponse {
    success: boolean;
    message: string;
    transactionId?: string;
}

export interface VerificationRequest {
    captchaToken: string;
}

export interface VerificationResponse {
    success: boolean;
    message: string;
}