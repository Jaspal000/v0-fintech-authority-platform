import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FinanceCalc Pro | Free Financial Calculators',
  description: 'Precision-engineered financial calculators for mortgage, investing, retirement, and budgeting. Region-specific tools for the US, UK, Canada, and Australia.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
