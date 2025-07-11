import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { CountrySelector } from './amount-input'

interface PaymentMethodProps {
  selectedCountry: { code: string; name: string; flag: string; currency: string }
  onCountryChange: (countryCode: string) => void
}

export function PaymentMethod({ selectedCountry, onCountryChange }: PaymentMethodProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Payment method</Label>
      <div className="flex gap-2">
        <CountrySelector selectedCountry={selectedCountry} onCountryChange={onCountryChange} />
        <Select defaultValue="debitCard">
          <SelectTrigger className="h-12 flex-1">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="debitCard">Debit card</SelectItem>
            <SelectItem value="creditCard" disabled>Credit card (Coming soon)</SelectItem>
            <SelectItem value="bankTransfer" disabled>Bank transfer (Coming soon)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}