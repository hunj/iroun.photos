import Script from 'next/script'
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
  const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID

  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
        </Script>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>  )
}
