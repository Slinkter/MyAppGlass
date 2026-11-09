"use client";

/**
 * @file ScrollPatternsShowcase.tsx
 * @description Catálogo de los patrones de `scroll-craft` convertidos en componentes del Aura Design System
 * (`shared/components/scroll/ScrollPatterns.tsx`). Fotos propias de `public/images`; textos del Brand Kit.
 */

import React from "react";
import { VStack } from "@chakra-ui/react";
import { MessageCircle } from "lucide-react";
import { companyData } from "@/shared/config/company-data";
import {
  CtaBand,
  GlassCaption,
  MomentBand,
  PhotoFrame,
  SectionIntro,
  StepSplit,
} from "@/shared/components/scroll/ScrollPatterns";
import { ShowcaseCard, ShowcaseStack, SubsectionLabel } from "../../components";

const WHATSAPP_URL = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(companyData.whatsappMessage)}`;

export const ScrollPatternsShowcase: React.FC = () => (
  <ShowcaseCard
    title="Patrones de composición (scroll-craft)"
    description="PhotoFrame, GlassCaption, SectionIntro, StepSplit, MomentBand y CtaBand. Solo transform y opacity; con movimiento reducido todo queda quieto y visible."
    badge="v2"
  >
    <ShowcaseStack>
      <SubsectionLabel>SectionIntro</SubsectionLabel>
      <SectionIntro
        eyebrow="Cómo trabajamos"
        title="Medimos, fabricamos e instalamos"
        description="Visita técnica sin costo, ensamblado en taller propio y técnicos capacitados."
      />

      <SubsectionLabel>PhotoFrame + GlassCaption (proporción fija 4:5)</SubsectionLabel>
      <VStack align="stretch" maxW="420px">
        <PhotoFrame src="/images/services-general-init01.webp" alt="Ventana de piso a techo instalada" effect="parallax">
          <GlassCaption title="Ventana instalada">Aluminio y vidrio a la medida.</GlassCaption>
        </PhotoFrame>
      </VStack>

      <SubsectionLabel>StepSplit (texto + foto, con paralaje)</SubsectionLabel>
      <StepSplit
        step="Paso 1"
        title="Medimos"
        text="Visita técnica sin costo: tomamos las medidas en tu casa u obra."
        image={{ src: "/images/home-img_t02.webp", alt: "Equipo de Glass & Aluminum en obra" }}
      />

      <SubsectionLabel>StepSplit invertido (con zoom lento)</SubsectionLabel>
      <StepSplit
        step="Paso 3"
        title="Instalamos"
        text="Técnicos capacitados instalan y entregan con garantía."
        image={{ src: "/images/home-img_t01.webp", alt: "Técnico instalando una puerta corrediza de vidrio" }}
        effect="zoom"
        reverse
      />

      <SubsectionLabel>MomentBand (foto que se revela + leyenda)</SubsectionLabel>
      <MomentBand
        image={{ src: "/images/home-img_t05.webp", alt: "Camión de la empresa descargando vidrios frente a un edificio terminado" }}
        caption="Del vidrio en el camión a la fachada terminada"
      />

      <SubsectionLabel>CtaBand (una acción primaria, una secundaria)</SubsectionLabel>
      <CtaBand
        title="Pide tu visita técnica sin costo"
        primary={{ label: "Cotizar por WhatsApp", href: WHATSAPP_URL, external: true, icon: <MessageCircle size={18} aria-hidden="true" style={{ flexShrink: 0 }} /> }}
        secondary={{ label: "Ver proyectos", href: "/design-system#v2" }}
      />
    </ShowcaseStack>
  </ShowcaseCard>
);

export default ScrollPatternsShowcase;
