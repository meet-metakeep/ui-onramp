export interface Token {
  symbol: string
  name: string
  networks: string[]
}

export interface Network {
  id: string
  name: string
  displayName: string
}

export interface OnrampFormData {
  token: Token
  network: Network
  amount: string
  destinationType: 'email' | 'address'
  destination: string
  paymentMethod: 'debitCard'
}

export interface OnrampSearchParams {
  amount?: string
  currency?: string
  wallet?: string
  country?: string
}

export const SUPPORTED_TOKENS: Token[] = [
  { symbol: 'USDC', name: 'USD Coin', networks: ['ethereum', 'solana', 'polygon', 'base', 'arbitrum'] },
  { symbol: 'ETH', name: 'Ethereum', networks: ['ethereum', 'arbitrum', 'base'] },
  { symbol: 'SOL', name: 'Solana', networks: ['solana'] },
  { symbol: 'MATIC', name: 'Polygon', networks: ['polygon'] },
  { symbol: 'USDT', name: 'Tether', networks: ['ethereum', 'solana'] },
]

export const SUPPORTED_NETWORKS: Network[] = [
  { id: 'ethereum', name: 'Ethereum', displayName: 'Ethereum' },
  { id: 'solana', name: 'Solana', displayName: 'Solana' },
  { id: 'polygon', name: 'Polygon', displayName: 'Polygon' },
  { id: 'base', name: 'Base', displayName: 'Base' },
  { id: 'arbitrum', name: 'Arbitrum', displayName: 'Arbitrum' },
]

export const DEFAULT_TOKEN = SUPPORTED_TOKENS[0] // USDC
export const DEFAULT_NETWORK = SUPPORTED_NETWORKS[1] // Solana

export const AMOUNT_PRESETS = [50, 100, 500, 1000]