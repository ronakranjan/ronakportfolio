import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ronak Ranjan | Full Stack Developer',
  description: 'Full Stack Developer specializing in e-commerce stores, business websites, and web applications. React, Next.js, and modern web technologies.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
