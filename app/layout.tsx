import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const _inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const _poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
})

export const metadata: Metadata = {
  title: 'Secure Your Hacks – The Right Approach to Cyber Security',
  description:
    'Secure Your Hacks is a leading cybersecurity company offering VCISO, VAPT, SOC, GRC, and more to protect your business from digital threats.',
  keywords: ['cybersecurity', 'VAPT', 'VCISO', 'SOC', 'GRC', 'penetration testing'],
}

export const viewport: Viewport = {
  themeColor: '#0a0a1a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#0a0a1a]">
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
