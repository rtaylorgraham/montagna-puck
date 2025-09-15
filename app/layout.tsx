import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Montagna Travel - Premium Cycling Experiences',
  description: 'Experience the world\'s most iconic mountain passes with Montagna Travel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}