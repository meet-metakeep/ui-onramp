'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { TokenNetworkSelect } from './currency-select'
import { AmountInput } from './amount-input'
import { WalletInput } from './wallet-input'
import { PaymentMethod } from './payment-method'
import { type Token, type Network, type OnrampFormData, type OnrampSearchParams, SUPPORTED_TOKENS, SUPPORTED_NETWORKS, DEFAULT_TOKEN, DEFAULT_NETWORK } from '@/types'
import { isEthereumAddress, isSolanaAddress } from '@/lib/utils'

interface OnrampFormProps {
  searchParams: OnrampSearchParams
}

export function OnrampForm({ searchParams }: OnrampFormProps) {
  const [formData, setFormData] = useState<OnrampFormData>({
    token: DEFAULT_TOKEN,
    network: DEFAULT_NETWORK,
    amount: '100',
    destinationType: 'email',
    destination: '',
    paymentMethod: 'debitCard'
  })

  const [selectedCountry, setSelectedCountry] = useState({ code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD' })
  const [availableTokens, setAvailableTokens] = useState<Token[]>(SUPPORTED_TOKENS)

  const formatAmountForDisplay = (amount: string) => {
    if (!amount) return '0.00'
    const num = parseFloat(amount)
    if (isNaN(num)) return amount
    
    // For very large numbers, truncate with "..."
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`
    }
    
    // For all numbers, use comma formatting with exactly 2 decimal places
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })
  }

  // Initialize form with URL parameters
  useEffect(() => {
    const updates: Partial<OnrampFormData> = {}

    if (searchParams.amount) {
      updates.amount = searchParams.amount
    }

    if (searchParams.wallet) {
      if (searchParams.wallet.includes('@')) {
        updates.destinationType = 'email'
        updates.destination = searchParams.wallet
      } else {
        updates.destinationType = 'address'
        updates.destination = searchParams.wallet
        
        // Filter tokens based on address type
        if (isEthereumAddress(searchParams.wallet)) {
          setAvailableTokens(SUPPORTED_TOKENS.filter(t => t.networks.some(n => n !== 'solana')))
        } else if (isSolanaAddress(searchParams.wallet)) {
          setAvailableTokens(SUPPORTED_TOKENS.filter(t => t.networks.includes('solana')))
        }
      }
    }

    if (Object.keys(updates).length > 0) {
      setFormData(prev => ({ ...prev, ...updates }))
    }
  }, [searchParams])

  const handleTokenChange = (token: Token) => {
    setFormData(prev => ({ ...prev, token }))
  }

  const handleNetworkChange = (network: Network) => {
    setFormData(prev => ({ ...prev, network }))
  }

  const handleAmountChange = (amount: string) => {
    setFormData(prev => ({ ...prev, amount }))
  }

  const handleWalletChange = (destination: string) => {
    let destinationType: 'email' | 'address' = 'email'
    
    if (destination.includes('@')) {
      destinationType = 'email'
    } else if (isEthereumAddress(destination) || isSolanaAddress(destination)) {
      destinationType = 'address'
    }
    
    setFormData(prev => ({ ...prev, destinationType, destination }))
    
    // Filter tokens based on address type
    if (destinationType === 'address' && destination) {
      if (isEthereumAddress(destination)) {
        setAvailableTokens(SUPPORTED_TOKENS.filter(t => t.networks.some(n => n !== 'solana')))
      } else if (isSolanaAddress(destination)) {
        setAvailableTokens(SUPPORTED_TOKENS.filter(t => t.networks.includes('solana')))
      } else {
        setAvailableTokens(SUPPORTED_TOKENS)
      }
    } else {
      setAvailableTokens(SUPPORTED_TOKENS)
    }
  }

  const handleCountryChange = (countryCode: string) => {
    const countries = [
      { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD' },
      { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', disabled: true },
      { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', disabled: true },
      { code: 'EU', name: 'European Union', flag: '🇪🇺', currency: 'EUR', disabled: true },
      { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', disabled: true },
      { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', disabled: true },
      { code: 'KR', name: 'South Korea', flag: '🇰🇷', currency: 'KRW', disabled: true },
      { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', disabled: true },
      { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', disabled: true },
      { code: 'MX', name: 'Mexico', flag: '🇲🇽', currency: 'MXN', disabled: true },
    ]
    const country = countries.find(c => c.code === countryCode)
    if (country) {
      setSelectedCountry(country)
    }
  }

  const handleSubmit = () => {
    const params = new URLSearchParams({
      amount: formData.amount,
      token: formData.token.symbol,
      network: formData.network.id,
      wallet: formData.destination,
      country: 'USD'
    })
    
    // Redirect to payment processor
    window.location.href = `https://google.com?${params.toString()}`
  }

  return (
    <>
      <div className="space-y-6 flex-1 sm:flex-none">
        <AmountInput 
          value={formData.amount} 
          onValueChange={handleAmountChange}
        />
        
        <WalletInput 
          value={formData.destination}
          onValueChange={handleWalletChange}
        />
        
        <PaymentMethod selectedCountry={selectedCountry} onCountryChange={handleCountryChange} />
      </div>
      
      <div className="mt-auto sm:mt-8 space-y-4">
        <div className="pt-4 space-y-3">
          <Button 
            onClick={handleSubmit}
            className="w-full h-11 text-sm font-medium"
            disabled={!formData.destination || !formData.amount}
            size="default"
          >
            {formData.destination && formData.amount ? 
              `Purchase $${formatAmountForDisplay(formData.amount)}` : 
              'Enter amount and destination'
            }
          </Button>
          <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1 flex-wrap">
            <span>You will receive ~{formatAmountForDisplay(formData.amount)}</span>
            <Select value={formData.token.symbol} onValueChange={(value) => {
              const token = availableTokens.find(t => t.symbol === value);
              if (token) handleTokenChange(token);
            }}>
              <SelectTrigger className="h-auto border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full px-2.5 py-0.5 text-xs font-semibold inline-flex w-auto transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableTokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>on</span>
            <Select value={formData.network.id} onValueChange={(value) => {
              const network = SUPPORTED_NETWORKS.find(n => n.id === value);
              if (network) handleNetworkChange(network);
            }}>
              <SelectTrigger className="h-auto border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full px-2.5 py-0.5 text-xs font-semibold inline-flex w-auto transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_NETWORKS.map((network) => (
                  <SelectItem key={network.id} value={network.id}>
                    {network.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </p>
        </div>
        
        <div className="pt-2">
          <p className="text-xs text-muted-foreground text-center">
            powered by <span className="font-semibold">metakeep.</span>
          </p>
        </div>
      </div>
    </>
  )
}