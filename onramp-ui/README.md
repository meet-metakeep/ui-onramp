# Onramp UI

A modern cryptocurrency on-ramp interface built with Next.js 14 and shadcn/ui components. This application provides users with a seamless way to purchase cryptocurrency using traditional payment methods.

## User Requirements & Features

### Core User Experience Requirements
- **Natural Input Behavior**: Amount input should behave like a calculator with natural typing flow
- **Cursor Positioning**: When typing numbers like "22", cursor stays after the numbers, before decimal point
- **Decimal Input**: Pressing decimal point should edit the first decimal place, then second decimal place
- **No Error Badges on Amount**: Amount input should restrict typing above 99,999.99 without showing error messages
- **Validation Simplification**: Only show "Address invalid" error badge for destination input when email/address is invalid
- **Manual Placeholder Control**: Placeholders should change based on dropdown selection, not auto-detection
- **Token Amount Display**: Summary should show "You will receive ~X [token] on [network]" with proper formatting
- **1:1 Quote Ratio**: Use 1:1 quote until actual API integration
- **Proper Number Formatting**: All amounts should use commas and exactly 2 decimal places
- **Badge Positioning**: Error badge should appear on the right side of dropdown, not between label and dropdown

### Implemented Features
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Dynamic Amount Input**: Smart formatting with comma separators and decimal precision
- **Multi-Destination Support**: Support for email addresses, Ethereum addresses, and Solana addresses
- **Real-time Validation**: Instant feedback for invalid addresses and amounts
- **Currency Selection**: Support for multiple fiat currencies (USD active, others coming soon)
- **Token & Network Selection**: Choose from various cryptocurrencies and blockchain networks
- **Payment Methods**: Debit card support with additional methods coming soon
- **Quote Display**: Real-time token amount calculation with 1:1 quote ratio

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Form Handling**: React hooks with real-time validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
onramp-ui/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── onramp/            # Onramp-specific components
│   │   ├── amount-input.tsx      # Amount input with formatting
│   │   ├── currency-select.tsx   # Token/network selection
│   │   ├── onramp-form.tsx      # Main form component
│   │   ├── payment-method.tsx   # Payment method selection
│   │   └── wallet-input.tsx     # Destination address input
│   └── ui/                # Reusable UI components (shadcn/ui)
├── lib/
│   └── utils.ts           # Utility functions
├── types/
│   └── index.ts           # TypeScript type definitions
└── README.md
```

## Component Overview

### AmountInput
- Handles fiat currency input with automatic formatting
- Restricts input to maximum $99,999.99
- Shows raw value while typing, formatted value when blurred
- Supports multiple currencies (USD active, others coming soon)

### WalletInput  
- Supports email addresses, Ethereum addresses, and Solana addresses
- Dynamic placeholders based on selected destination type
- Real-time validation with error badges for invalid inputs
- Manual type selection (no auto-detection)
- Error badge positioned on right side of dropdown selector

### OnrampForm
- Main form orchestrator handling all user input
- URL parameter initialization for pre-filled forms
- Token filtering based on destination address type
- 1:1 quote calculation for token amount display
- Summary text shows estimated token amount received

### PaymentMethod
- Country and payment method selection
- Coming soon indicators for unavailable options
- Currently supports US with debit card payments

## User Input Requirements Implementation

### Amount Input Behavior
- **Natural Typing**: Input behaves like a calculator - typing "2" then "2" results in "22" with cursor after the numbers
- **Decimal Handling**: Pressing decimal point allows editing first decimal place, then second decimal place  
- **No Formatting Interference**: Shows raw value while typing, formatted value only when field loses focus
- **Maximum Restriction**: Silently restricts input to 99,999.99 without error messages
- **Display Formatting**: Uses comma separators and exactly 2 decimal places when not focused

### Destination Input Behavior
- **Manual Selection**: Placeholders change only when user manually selects destination type from dropdown
- **No Auto-Detection**: Input value does not automatically change the selected destination type
- **Validation Feedback**: Shows "Address invalid" destructive outline badge only for invalid inputs
- **Badge Positioning**: Error badge appears to the right of the destination type dropdown

### Summary Display Requirements
- **Token Amount**: Shows "You will receive ~X [token] on [network]" format
- **Quote Calculation**: Uses 1:1 ratio (1 USD = 1 token) until real API integration
- **Number Formatting**: Token amounts use comma separators and exactly 2 decimal places
- **Real-time Updates**: Summary updates as user changes amount or token selection

## Validation Rules

- **Amount**: Maximum $99,999.99, up to 2 decimal places, input restriction only (no error messages)
- **Email**: Standard email format validation with error badge
- **Ethereum Address**: 42-character hexadecimal validation with error badge
- **Solana Address**: Base58 format validation (32-58 characters) with error badge

## URL Parameters

The application supports URL parameters for pre-filling the form:

- `amount`: Pre-fill amount value
- `wallet`: Pre-fill destination (email or address)

Example: `/?amount=500&wallet=user@example.com`

## Development

### Code Style
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui component patterns
- React hooks for state management

### Testing
The application has been tested with Playwright for comprehensive UX validation across desktop and mobile view-ports.

### UX Issues Identified and Resolved
1. **Amount Input Formatting**: Fixed natural typing behavior and cursor positioning
2. **Placeholder Auto-Detection**: Removed auto-detection in favor of manual dropdown selection
3. **Validation Simplification**: Removed error badges from amount input, kept only for destination validation
4. **Badge Positioning**: Moved error badge to right side of dropdown instead of between label and dropdown
5. **Summary Text**: Updated to show token amount received instead of input amount
6. **Number Formatting**: Ensured consistent comma formatting and 2 decimal places throughout

## License

Private repository - All rights reserved.