import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
  title: 'LIVO Club | Esports & Sports Community',
  description: 'Official esports and sports club of the College of Computer Engineering Informatics.',
  icons: { icon: '/logo.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
