import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface DestinationTabsProps {
  type: 'email' | 'address'
  value: string
  onValueChange: (type: 'email' | 'address', value: string) => void
}

export function DestinationTabs({ type, value, onValueChange }: DestinationTabsProps) {
  const handleTabChange = (newType: string) => {
    onValueChange(newType as 'email' | 'address', value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(type, e.target.value)
  }

  return (
    <div className="space-y-2">
      <Label className="text-xs">Send to</Label>
      <Tabs value={type} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 h-8">
          <TabsTrigger value="email" className="text-xs">Email</TabsTrigger>
          <TabsTrigger value="address" className="text-xs">Address</TabsTrigger>
        </TabsList>
        <TabsContent value="email" className="space-y-1">
          <Input
            type="email"
            value={type === 'email' ? value : ''}
            onChange={handleInputChange}
            placeholder="your@email.com"
            className="h-9"
          />
          <p className="text-xs text-muted-foreground">
            We'll create a secure wallet for you
          </p>
        </TabsContent>
        <TabsContent value="address" className="space-y-1">
          <Input
            type="text"
            value={type === 'address' ? value : ''}
            onChange={handleInputChange}
            placeholder="Enter wallet address"
            className="font-mono text-sm h-9"
          />
          <p className="text-xs text-muted-foreground">
            Supports Ethereum and Solana addresses
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}