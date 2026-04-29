import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
  title: 'LIVO Dashboard',
  description: 'Admin dashboard for LIVO Club website',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
