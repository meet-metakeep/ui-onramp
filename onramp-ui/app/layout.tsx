import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Add Funds - MetaKeep',
  description: 'Top up your wallet with zero fees',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}