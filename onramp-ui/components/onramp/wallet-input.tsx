import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { isEthereumAddress, isSolanaAddress } from '@/lib/utils'

interface WalletInputProps {
  value: string
  onValueChange: (value: string) => void
}

export function WalletInput({ value, onValueChange }: WalletInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value)
  }

  const getPlaceholder = () => {
    return "your@email.com or wallet address"
  }

  const getHelpText = () => {
    if (!value) return ""
    
    if (value.includes('@')) {
      return "Email address"
    } else if (isEthereumAddress(value)) {
      return "Ethereum address"
    } else if (isSolanaAddress(value)) {
      return "Solana address"
    } else if (value.length > 10) {
      return "Invalid address"
    }
    
    return ""
  }

  const getStatusVariant = (): "default" | "secondary" | "destructive" | "outline" => {
    if (!value) return "secondary"
    
    if (value.includes('@')) {
      return "secondary"
    } else if (isEthereumAddress(value) || isSolanaAddress(value)) {
      return "secondary"
    } else if (value.length > 10) {
      return "destructive"
    }
    
    return "outline"
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor="wallet" className="text-sm font-medium">Destination</Label>
        {getHelpText() && (
          <Badge variant={getStatusVariant()} className="text-xs">
            {getHelpText()}
          </Badge>
        )}
      </div>
      <Input
        id="wallet"
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Email or wallet address"
        className="h-12 text-base"
      />
    </div>
  )
}