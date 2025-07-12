/**
 * @title MetaKeep API Utilities
 * @notice Handles MetaKeep API integration for email-to-wallet conversion/creation
 * @dev Provides functions to get or create wallet addresses from email using MetaKeep SDK
 * @dev Uses server-side API route to securely handle MetaKeep API calls
 */

export interface MetaKeepWallet {
  ethAddress: string;
  solAddress: string;
  eosAddress: string;
}

export interface MetaKeepResponse {
  status: string;
  wallet: MetaKeepWallet;
}

/**
 * @notice Gets or creates wallet addresses for a given email using MetaKeep API
 * @dev Makes API call to our server-side route which handles MetaKeep integration
 * @dev If wallet doesn't exist for email, MetaKeep will create a new one
 * @param email The email address to get/create wallet addresses for
 * @returns Promise<MetaKeepWallet | null> The wallet addresses or null if failed
 */
export async function getWalletFromEmail(email: string): Promise<MetaKeepWallet | null> {
  try {
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email address');
    }

    // Call our server-side API route instead of MetaKeep directly
    const response = await fetch('/api/metakeep', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `API error: ${response.status}`);
    }

    const data: MetaKeepResponse = await response.json();
    
    if (data.status !== 'success') {
      throw new Error(`API returned status: ${data.status}`);
    }

    return data.wallet;
  } catch (error) {
    return null;
  }
}

/**
 * @notice Gets the appropriate wallet address for a given network type
 * @dev Maps network types to the correct address from MetaKeep response
 * @param wallet The MetaKeep wallet object
 * @param network The blockchain network identifier
 * @returns string The wallet address for the specified network
 */
export function getAddressForNetwork(wallet: MetaKeepWallet, network: string): string {
  // Normalize network name
  const normalizedNetwork = network.toLowerCase();
  
  // Map networks to address types
  switch (normalizedNetwork) {
    case 'solana':
      return wallet.solAddress;
    
    // All EVM-compatible networks use ethAddress
    case 'ethereum':
    case 'base':
    case 'optimism':
    case 'arbitrum':
    case 'polygon':
    case 'avalanche-c-chain':
    case 'binance-smart-chain':
    case 'bnb-chain':
    case 'fantom':
    case 'cronos':
    case 'gnosis':
    case 'celo':
    case 'moonbeam':
    case 'harmony':
    case 'unichain':
      return wallet.ethAddress;
    
    default:
      // Default to ETH address for unknown EVM-compatible networks
      return wallet.ethAddress;
  }
} 