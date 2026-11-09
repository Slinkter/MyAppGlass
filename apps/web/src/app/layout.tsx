import { SITE_URL } from "@/shared/config/company-data";
import type { Metadata, Viewport } from "next";
import { Lora, Inter } from "next/font/google";
import "../styles/global.css";
import { Providers } from "./Providers";
import { Box } from "@chakra-ui/react";
import { AuraNavbar as Navbar } from "@/widgets/Navbar";
import { Footer } from "@/widgets/Footer";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";
import { FloatingWhatsAppWrapper as FloatingWhatsApp, ThemeToggle } from "@/widgets/FloatingActions";
import SkipLink from "@/shared/components/navigation/SkipLink";
import GoogleMetricsProvider from "@/shared/components/Analytics/GoogleMetricsProvider";
import { getCompanyJsonLd, serializeJsonLd } from "@/shared/utils/seo-utils";

import { env } from "@/shared/config/env";

const lora = Lora({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-lora",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-inter",
    display: "swap",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1.0,
    maximumScale: 5.0,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
        { media: "(prefers-color-scheme: dark)", color: "#09090B" },
    ],
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Vidriería en La Molina | Glass & Aluminum Company S.A.C.",
        template: "%s | Glass & Aluminum Company S.A.C.",
    },
    description:
        "Especialistas en vidriería, instalación de ventanas antirruido, mamparas de vidrio templado y aluminio en La Molina, Surco y Lima. ¡Cotiza a domicilio!",
    keywords: [
        "vidriería la molina",
        "vidrio y aluminio",
        "ventanas antirruido lima",
        "mamparas para baño",
        "vidrio templado precio",
    ],
    authors: [{ name: "Glass & Aluminum Company S.A.C." }],
    alternates: {
        canonical: SITE_URL,
    },
    ...(env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
        ? {
              verification: {
                  google: env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
              },
          }
        : {}),
    icons: {
        icon: [
            { url: "/favicon.svg", type: "image/svg+xml" },
            { url: "/logovcr.png", sizes: "96x96", type: "image/png" },
        ],
        shortcut: { url: "/favicon.svg", type: "image/svg+xml" },
        apple: { url: "/logovcr.png", sizes: "180x180", type: "image/png" },
    },
    openGraph: {
        title: "Vidriería en La Molina | Glass & Aluminum Company S.A.C.",
        description:
            "Especialistas en vidriería, instalación de ventanas antirruido, mamparas de vidrio templado y aluminio en La Molina, Surco y Lima. ¡Cotiza a domicilio!",
        url: SITE_URL,
        siteName: "Glass & Aluminum Company S.A.C.",
        locale: "es_PE",
        type: "website",
        images: [
            {
                url: "/logovcr.png",
                width: 906,
                height: 904,
                alt: "Glass & Aluminum Company Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Vidriería en La Molina | Glass & Aluminum Company S.A.C.",
        description:
            "Especialistas en vidriería, instalación de ventanas antirruido, mamparas de vidrio templado y aluminio en La Molina, Surco y Lima. ¡Cotiza a domicilio!",
        images: ["/logovcr.png"],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = getCompanyJsonLd();

    return (
        <html lang="es" suppressHydrationWarning className={`${lora.variable} ${inter.variable}`} data-scroll-behavior="smooth">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
                />
            </head>
            <body>
                <Providers>
                    <GoogleMetricsProvider />
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
                        <ThemeToggle />
                    </Box>
                </Providers>
            </body>
        </html>
    );
}
