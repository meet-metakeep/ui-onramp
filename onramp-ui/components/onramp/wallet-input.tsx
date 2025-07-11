import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { isEthereumAddress, isSolanaAddress } from '@/lib/utils'
import { useState } from 'react'

interface WalletInputProps {
  value: string
  onValueChange: (value: string) => void
}

const destinationTypes = [
  { value: 'email', label: 'Email address' },
  { value: 'solana', label: 'Solana address' },
  { value: 'ethereum', label: 'Ethereum address' }
]

export function WalletInput({ value, onValueChange }: WalletInputProps) {
  const [selectedType, setSelectedType] = useState<string>('email')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value)
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    // Clear input when manually changing type
    onValueChange('')
  }

  const getPlaceholder = () => {
    switch (selectedType) {
      case 'email':
        return 'user@example.com'
      case 'ethereum':
        return '0x1234...abcd'
      case 'solana':
        return 'DjVE...jwcR'
      default:
        return 'user@example.com'
    }
  }

  const getSelectedLabel = () => {
    return destinationTypes.find(t => t.value === selectedType)?.label || 'Email address'
  }

  const isValidInput = () => {
    if (!value) return true // Empty is valid (no error)
    
    switch (selectedType) {
      case 'email':
        // Basic email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      case 'ethereum':
        return isEthereumAddress(value)
      case 'solana':
        return isSolanaAddress(value)
      default:
        return true
    }
  }

  const showError = value && !isValidInput()

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor="wallet" className="text-sm font-medium">Your</Label>
        <Select value={selectedType} onValueChange={handleTypeChange}>
          <SelectTrigger className="h-auto border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full px-2.5 py-0.5 text-xs font-semibold inline-flex w-auto transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {destinationTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showError && (
          <Badge variant="outline" className="h-auto px-1.5 py-0.5 text-xs border-destructive text-destructive">
            Address invalid
          </Badge>
        )}
      </div>
      <Input
        id="wallet"
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={getPlaceholder()}
        className="h-12 text-base"
      />
    </div>
  )
}