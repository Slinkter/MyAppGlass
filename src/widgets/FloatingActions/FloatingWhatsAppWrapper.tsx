"use client";

import dynamic from 'next/dynamic';

const FloatingWhatsApp = dynamic(() => import("./floating-whatsapp"), {
  ssr: false
});

export default function FloatingWhatsAppWrapper() {
  return <FloatingWhatsApp />;
}
