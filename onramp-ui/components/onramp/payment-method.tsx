import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface PaymentMethodProps {
  selectedCountry: {
    code: string;
    name: string;
    flag: string;
    currency: string;
  };
  onCountryChange: (countryCode: string) => void;
}

export function PaymentMethod({
  selectedCountry,
  onCountryChange,
}: PaymentMethodProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium">Payment method in</Label>
        <Select value={selectedCountry.code} onValueChange={onCountryChange}>
          <SelectTrigger className="h-auto border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full px-2.5 py-0.5 text-xs font-semibold inline-flex w-auto transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="US">
              <div className="flex items-center gap-2">
                <span>🇺🇸</span>
                <span>United States of America</span>
              </div>
            </SelectItem>
            <SelectItem value="CA" disabled>
              <div className="flex items-center gap-2">
                <span>🇨🇦</span>
                <span>Canada</span>
                <span className="text-xs text-muted-foreground">
                  (Coming soon)
                </span>
              </div>
            </SelectItem>
            <SelectItem value="GB" disabled>
              <div className="flex items-center gap-2">
                <span>🇬🇧</span>
                <span>United Kingdom</span>
                <span className="text-xs text-muted-foreground">
                  (Coming soon)
                </span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Select defaultValue="debitCard">
        <SelectTrigger className="h-12">
          <SelectValue placeholder="Select payment method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="debitCard">Debit card</SelectItem>
          <SelectItem value="creditCard" disabled>
            Credit card (Coming soon)
          </SelectItem>
          <SelectItem value="bankTransfer" disabled>
            Bank transfer (Coming soon)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
