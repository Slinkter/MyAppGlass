import type { Metadata, Viewport } from 'next'
import { Lora } from 'next/font/google'
import '../styles/global.css'
import { Providers } from './providers';
import { Box } from "@chakra-ui/react";
import { AuraNavbar as Navbar } from "@/widgets/Navbar";
import { Footer } from "@/widgets/Footer";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";
import { FloatingWhatsAppWrapper as FloatingWhatsApp } from "@/widgets/FloatingActions";
import SkipLink from "@/shared/components/navigation/SkipLink";
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
  metadataBase: new URL("https://www.gyacompany.com"),
  title: {
    default: "Vidriería en La Molina | Glass & Aluminum Company S.A.C.",
    template: "%s | Glass & Aluminum Company S.A.C.",
  },
  description: "Especialistas en vidriería, instalación de ventanas antirruido, mamparas de vidrio templado y aluminio en La Molina, Surco y Lima. ¡Cotiza a domicilio!",
  keywords: ["vidriería la molina", "vidrio y aluminio", "ventanas antirruido lima", "mamparas para baño", "vidrio templado precio"],
  authors: [{ name: "Glass & Aluminum Company S.A.C." }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logovcr.png", sizes: "96x96", type: "image/png" }
    ],
    shortcut: { url: "/favicon.svg", type: "image/svg+xml" },
    apple: { url: "/logovcr.png", sizes: "180x180", type: "image/png" }
  },
  openGraph: {
    title: "Vidriería en La Molina | Glass & Aluminum Company S.A.C.",
    description: "Especialistas en vidriería, instalación de ventanas antirruido, mamparas de vidrio templado y aluminio en La Molina, Surco y Lima. ¡Cotiza a domicilio!",
    url: "https://www.gyacompany.com",
    siteName: "Glass & Aluminum Company S.A.C.",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/logovcr.png",
        width: 512,
        height: 512,
        alt: "Glass & Aluminum Company Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidriería en La Molina | Glass & Aluminum Company S.A.C.",
    description: "Especialistas en vidriería, instalación de ventanas antirruido, mamparas de vidrio templado y aluminio en La Molina, Surco y Lima. ¡Cotiza a domicilio!",
    images: ["/logovcr.png"]
  }
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
                <SkipLink />

                <Box
                    position="relative"
                    maxW="1440px"
                    mx="auto"
                    px={{ base: "6", md: "14" }}
                    pb="6"
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