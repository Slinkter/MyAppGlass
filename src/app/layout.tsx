import type { Metadata, Viewport } from 'next'
import { Lora } from 'next/font/google'
import '../App.css'
import { Providers } from './providers';
import { Box } from "@chakra-ui/react";
import { AuraNavbar as Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { FloatingWhatsApp } from "@/layout/FloatingActions";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

export const metadata: Metadata = {
  title: 'GYA Glass & Aluminum | Innovación en Cerramientos de Vidrio',
  description: 'Líderes en diseño e instalación de soluciones premium en vidrio y aluminio.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning className={lora.variable}>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            html, body {
              margin: 0;
              padding: 0;
              min-height: 100%;
              font-family: var(--font-lora), serif;
            }
          `
        }} />
      </head>
      <body>
        <Providers>
            <Box minH="100dvh" position="relative">
                <Box
                    position="relative"
                    maxW="1440px"
                    mx="auto"
                    px={{ base: "phi_md", md: "phi_xl" }}
                    pb="phi_md"
                    zIndex={1}
                >
                    <Navbar />
                    <Box as="main" id="main-content">
                        <ComponentErrorBoundary>
                            {children}
                        </ComponentErrorBoundary>
                    </Box>
                    <Footer />
                </Box>
                <FloatingWhatsApp />
            </Box>
        </Providers>
      </body>
    </html>
  )
}