import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Rajdhani } from 'next/font/google'
import './globals.scss'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LIVO Club | Esports & Sports Community',
  description: 'Official esports and sports club of the College of Computer Engineering Informatics.',
  icons: { icon: '/logo.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${rajdhani.variable}`}>
      <head>
        {/* Preload LCP image — discovered early before JS hydration */}
        <link
          rel="preload"
          as="image"
          href="/images/games-opt/Counter-Strike 2.jpg"
          fetchPriority="high"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
