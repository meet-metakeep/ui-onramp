import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { type Token, type Network, SUPPORTED_NETWORKS } from '@/types'

interface TokenNetworkSelectProps {
  token: Token
  network: Network
  onTokenChange: (token: Token) => void
  onNetworkChange: (network: Network) => void
  tokens: Token[]
}

export function TokenNetworkSelect({ token, network, onTokenChange, onNetworkChange, tokens }: TokenNetworkSelectProps) {
  const handleTokenChange = (tokenSymbol: string) => {
    const selectedToken = tokens.find(t => t.symbol === tokenSymbol)
    if (selectedToken) {
      onTokenChange(selectedToken)
      // Auto-select first available network for this token
      const firstAvailableNetwork = SUPPORTED_NETWORKS.find(n => selectedToken.networks.includes(n.id))
      if (firstAvailableNetwork) {
        onNetworkChange(firstAvailableNetwork)
      }
    }
  }

  const handleNetworkChange = (networkId: string) => {
    const selectedNetwork = SUPPORTED_NETWORKS.find(n => n.id === networkId)
    if (selectedNetwork) {
      onNetworkChange(selectedNetwork)
    }
  }

  const availableNetworks = SUPPORTED_NETWORKS.filter(n => token.networks.includes(n.id))

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1">
        <Label htmlFor="token" className="text-xs">Token</Label>
        <Select value={token.symbol} onValueChange={handleTokenChange}>
          <SelectTrigger id="token" className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tokens.map((t) => (
              <SelectItem key={t.symbol} value={t.symbol}>
                {t.symbol}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="network" className="text-xs">Network</Label>
        <Select value={network.id} onValueChange={handleNetworkChange}>
          <SelectTrigger id="network" className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableNetworks.map((n) => (
              <SelectItem key={n.id} value={n.id}>
                {n.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}