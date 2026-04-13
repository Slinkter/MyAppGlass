import type { Metadata } from 'next';
import { Providers } from './providers';
import { ClientLayout } from './ClientLayout';

export const metadata: Metadata = {
  title: 'GYA Glass & Aluminum | Portafolio Premium',
  description: 'Especialistas en estructuras de vidrio y aluminio de alto rendimiento.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
