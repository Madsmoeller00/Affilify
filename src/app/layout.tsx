import './globals.css'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Affilify - Danske Affiliate Programmer',
  description: 'Find de bedste affiliate programmer i Danmark. Vi samler alle danske affiliate marketing programmer på ét sted.',
  metadataBase: new URL('https://affilify.dk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    locale: 'da_DK',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da" suppressHydrationWarning className="light">
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="text-foreground">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}