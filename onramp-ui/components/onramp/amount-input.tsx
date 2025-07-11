import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    // Only allow positive numbers and decimals
    if (newValue === '' || /^\d*\.?\d*$/.test(newValue)) {
      onValueChange(newValue)
    }
  }

  return (
    <div className="space-y-3">
      <Label htmlFor="amount" className="text-sm font-medium">Amount</Label>
      <div className="flex items-center justify-center gap-3 p-4 rounded-lg border bg-card">
        <Input
          id="amount"
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleInputChange}
          className="text-center text-4xl font-light h-auto border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-24 placeholder:text-muted-foreground p-0"
          placeholder="100"
        />
        <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
          <SelectTrigger className="w-auto h-auto border-0 bg-transparent focus:ring-0 text-xl font-light text-muted-foreground p-0">
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