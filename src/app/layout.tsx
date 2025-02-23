// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Your Blog Name',
    default: 'Your Blog Name',
  },
  description: 'A modern blog built with Next.js and Tailwind CSS',
  openGraph: {
    title: 'Your Blog Name',
    description: 'A modern blog built with Next.js and Tailwind CSS',
    url: 'https://yourdomain.com',
    siteName: 'Your Blog Name',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b border-gray-100">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold">Your Blog</a>
              <div className="space-x-6">
                <a href="/blog" className="hover:text-gray-600">Blog</a>
                <a href="/about" className="hover:text-gray-600">About</a>
              </div>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-100">
          <div className="container mx-auto px-4 py-6 text-center text-gray-600">
            © {new Date().getFullYear()} Your Blog. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}