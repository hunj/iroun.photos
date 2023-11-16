import Navigation from "./components/navigation"
import Footer from "./components/footer"
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '[ iroun.photos ]',
  description: 'Event/cosplay/portrait photographer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>  )
}
