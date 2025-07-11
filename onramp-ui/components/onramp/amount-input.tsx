import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import React from 'react'

interface AmountInputProps {
  value: string
  onValueChange: (amount: string) => void
}

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

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€', disabled: true },
  { code: 'GBP', name: 'British Pound', symbol: '£', disabled: true },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', disabled: true },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', disabled: true },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', disabled: true },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', disabled: true },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', disabled: true },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', disabled: true },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'MX$', disabled: true },
]

export function AmountInput({ value, onValueChange }: AmountInputProps) {
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [isFocused, setIsFocused] = useState(false)

  const formatForDisplay = (rawValue: string) => {
    if (!rawValue) return ''
    if (isFocused) return rawValue // Show raw value while typing
    
    const number = parseFloat(rawValue)
    if (isNaN(number)) return rawValue
    
    // Format with commas and always show 2 decimal places when blurred
    return number.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    
    // Only allow positive numbers and decimals (with up to 2 decimal places)
    // Restrict to maximum 99999.99
    if (inputValue === '' || /^\d{0,5}\.?\d{0,2}$/.test(inputValue)) {
      const number = parseFloat(inputValue)
      if (inputValue === '' || isNaN(number) || number <= 99999.99) {
        onValueChange(inputValue)
      }
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const formatNumberWithCommas = (num: string) => {
    if (!num) return ''
    const number = parseFloat(num)
    if (isNaN(number)) return num
    return number.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Label htmlFor="amount" className="text-sm font-medium">Amount in</Label>
        <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
          <SelectTrigger className="h-auto border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full px-2.5 py-0.5 text-xs font-semibold inline-flex w-auto transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency.code} value={currency.code} disabled={currency.disabled}>
                <div className="flex items-center gap-2">
                  <span>{currency.code}</span>
                  {currency.disabled && <span className="text-xs text-muted-foreground">(Coming soon)</span>}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-center p-4 rounded-lg border bg-card">
        <Input
          id="amount"
          type="text"
          inputMode="numeric"
          value={formatForDisplay(value)}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="text-center text-4xl font-light h-auto border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-full placeholder:text-muted-foreground p-0"
          placeholder="100.00"
        />
      </div>
    </div>
  )
}

export function CountrySelector({ selectedCountry, onCountryChange }: { selectedCountry: { code: string; name: string; flag: string; currency: string }, onCountryChange: (countryCode: string) => void }) {
  return (
    <Select value={selectedCountry.code} onValueChange={onCountryChange}>
      <SelectTrigger className="w-14 h-12 text-lg p-0 justify-center">
        <span>{selectedCountry.flag}</span>
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.code} disabled={country.disabled}>
            <div className="flex items-center gap-3">
              <span className="text-base">{country.flag}</span>
              <span className="text-sm">{country.name}</span>
              {country.disabled && <span className="text-xs text-muted-foreground">(Coming soon)</span>}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}