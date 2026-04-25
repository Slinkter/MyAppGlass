import type { Metadata, Viewport } from 'next'
import { Lora } from 'next/font/google'
import '../App.css'
import { Providers } from './providers';
import { Box } from "@chakra-ui/react";
import { AuraNavbar as Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";
import { FloatingWhatsAppWrapper as FloatingWhatsApp } from "@/layout/FloatingActions";
import { getCompanyJsonLd } from '@/shared/utils/seo-utils';

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
  const jsonLd = getCompanyJsonLd();

  return (
    <html lang="es" suppressHydrationWarning className={lora.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
            <Box minH="100dvh" position="relative">
                {/* Skip Link for Accessibility */}
                <Box
                    as="a"
                    {...({ href: "#main-content" } as Record<string, unknown>)}
                    position="absolute"
                    top="-1000px"
                    left="-1000px"
                    w="1px"
                    h="1px"
                    overflow="hidden"
                    _focus={{
                        position: "fixed",
                        top: "phi_md",
                        left: "phi_md",
                        width: "auto",
                        height: "auto",
                        display: "inline-block",
                        p: "phi_sm",
                        m: "phi_sm",
                        border: "2px solid",
                        borderColor: "text.accent",
                        borderRadius: "md",
                        bg: "bg.panel",
                        color: "text.heading",
                        zIndex: "9999",
                    }}
                >
                    Saltar al contenido principal
                </Box>

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