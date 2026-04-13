'use client';

import { Box } from '@chakra-ui/react';
import { AuraNavbar as Navbar } from '@/layout/Navbar';
import { Footer } from '@/layout/Footer';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box minH='100dvh' position='relative'>
      <Box
        position='relative'
        maxW='1440px'
        mx='auto'
        px={{ base: '4', md: '12' }}
        pb='8'
        zIndex={1}
      >
        <Navbar />
        <main id='main-content'>{children}</main>
        <Footer />
      </Box>
    </Box>
  );
}
