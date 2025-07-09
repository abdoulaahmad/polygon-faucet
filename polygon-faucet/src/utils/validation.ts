export function isValidWalletAddress(address: string): boolean {
    const walletAddressPattern = /^0x[a-fA-F0-9]{40}$/;
    return walletAddressPattern.test(address);
}

export function isNotEmpty(value: string): boolean {
    return value.trim().length > 0;
}