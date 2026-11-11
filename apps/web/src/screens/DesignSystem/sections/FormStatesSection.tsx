"use client";

/**
 * @file FormStatesSection.tsx
 * @description Pestaña "Formularios y botones": botones (incluida la píldora seleccionable), campos con la variante
 * `field` del tema (anillo también en estado inválido), formulario de presupuesto y estados.
 * Datos solo de lo decidido por el dueño (zonas de atención, garantía, WhatsApp).
 */

import React, { useState } from "react";
import { HStack, Input, SimpleGrid, Text, Textarea, VStack } from "@chakra-ui/react";
import { ArrowRight, Check, Inbox, Ruler, ShieldCheck, Store } from "lucide-react";
import { Alert } from "@/shared/ui/alert";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { EmptyState } from "@/shared/ui/empty-state";
import { Field } from "@/shared/ui/field";
import { NativeSelectField, NativeSelectRoot } from "@/shared/ui/native-select";
import { Skeleton } from "@/shared/ui/skeleton";
import { ShowcaseCard, SubsectionLabel } from "../components";
import { DockPill } from "../components/PatternB";

const ZONES = ["La Molina", "Surco", "San Borja", "San Isidro", "Miraflores"] as const;

/** Variantes propias del tema que el tipado de Chakra todavía no conoce. */
const FIELD = "field" as never;

const ButtonsBlock: React.FC = () => {
  const [active, setActive] = useState(0);
  const pills = [
    { icon: Ruler, title: "Visita técnica", text: "Medimos sin costo" },
    { icon: Store, title: "Taller y show room", text: "Vea el producto antes" },
    { icon: ShieldCheck, title: "Garantía de 3 meses", text: "En todo lo instalado" },
  ];
  return (
    <VStack align="stretch" gap="8">
      <VStack align="stretch" gap="3">
        <SubsectionLabel>Botones · píldora de 44 px, una acción principal por zona</SubsectionLabel>
        <HStack gap="3" wrap="wrap">
          <Button variant="primary">Pedir presupuesto <ArrowRight size={16} aria-hidden="true" /></Button>
          <Button variant="outline">Ver obras</Button>
          <Button variant="ghost">Más información</Button>
          <Button variant="whatsapp">Cotiza por WhatsApp</Button>
          <Button variant="primary" disabled>Deshabilitado</Button>
        </HStack>
      </VStack>
      <VStack align="stretch" gap="3">
        <SubsectionLabel>Píldora seleccionable · borde negro cuando está activa (aria-pressed)</SubsectionLabel>
        <HStack gap="1" wrap="wrap" p="1.5" borderWidth="1px" borderColor="border.subtle" borderRadius="card" alignSelf="flex-start">
          {pills.map((p, i) => (
            <DockPill key={p.title} icon={p.icon} title={p.title} text={p.text} pressed={active === i} onClick={() => setActive(i)} />
          ))}
        </HStack>
      </VStack>
      <VStack align="stretch" gap="3">
        <SubsectionLabel>Chips · píldora de 28 px, solo informativos</SubsectionLabel>
        <HStack gap="2" wrap="wrap">
          <Badge variant={"chip" as never}>La Molina</Badge>
          <Badge variant={"chipInk" as never}>Activo</Badge>
          <Badge variant={"chipSuccess" as never}>Entregada</Badge>
          <Badge variant={"chipWarning" as never}>Por confirmar</Badge>
          <Badge variant={"chipDanger" as never}>Sin respuesta</Badge>
          <Badge variant={"chipInfo" as never}>Referencial</Badge>
        </HStack>
      </VStack>
    </VStack>
  );
};

const FormBlock: React.FC = () => (
  <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "8", lg: "10" }}>
    <VStack align="stretch" gap="4">
      <SubsectionLabel>Formulario de presupuesto · campos de 48 px</SubsectionLabel>
      <Field label="Nombre" required>
        <Input variant={FIELD} placeholder="Nombre y apellido" />
      </Field>
      <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
        <Field label="WhatsApp" required helperText="Le respondemos por aquí">
          <Input variant={FIELD} inputMode="tel" placeholder="974 278 303" />
        </Field>
        <Field label="Distrito" required>
          <NativeSelectRoot variant={FIELD}>
            <NativeSelectField defaultValue="">
              <option value="" disabled>Elija su distrito</option>
              {ZONES.map((d) => <option key={d} value={d}>{d}</option>)}
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>
      </SimpleGrid>
      <Field label="¿Qué necesita?" optionalText="Opcional" helperText="Medidas aproximadas o el plano, si lo tiene">
        <Textarea variant={FIELD} rows={4} placeholder="Ejemplo: 4 ventanas corredizas, sala y dormitorios" />
      </Field>
      <Field label="WhatsApp con error" invalid errorText="Escriba un número de 9 dígitos">
        <Input variant={FIELD} defaultValue="97427" />
      </Field>
      <Button variant="primary" alignSelf="flex-start">Enviar solicitud <ArrowRight size={16} aria-hidden="true" /></Button>
    </VStack>
    <VStack align="stretch" gap="4">
      <SubsectionLabel>Estados</SubsectionLabel>
      <Alert variant="success" title="Solicitud enviada" icon={<Check size={18} aria-hidden="true" />}>
        Le responderemos por WhatsApp para coordinar la visita técnica.
      </Alert>
      <Alert variant="danger" title="No pudimos enviar la solicitud">
        Revise su conexión e inténtelo de nuevo, o escríbanos por WhatsApp.
      </Alert>
      <Alert variant="warning" title="Falta un dato">
        Indique su distrito para poder estimar la visita.
      </Alert>
      <VStack align="stretch" gap="2" aria-label="Cargando">
        <Skeleton h="5" w="60%" />
        <Skeleton h="5" w="full" />
        <Skeleton h="5" w="80%" />
      </VStack>
      <EmptyState icon={<Inbox size={28} aria-hidden="true" />} title="Aún no hay fotos de esta obra" description="Las fotos se cargan desde el panel de administración." />
      <Text fontSize="sm" color="text.muted">Los campos con la variante <strong>field</strong> marcan el error con borde y anillo, no solo con color.</Text>
    </VStack>
  </SimpleGrid>
);

export const FormStatesSection: React.FC = () => (
  <VStack align="stretch" gap={{ base: "8", md: "12" }}>
    <ShowcaseCard title="Botones, píldoras y chips" description="Variantes del tema alineadas con DESIGN.md. La píldora seleccionable es la de la barra inferior del patrón B (mapa inmersivo).">
      <ButtonsBlock />
    </ShowcaseCard>
    <ShowcaseCard title="Formulario y estados" description="Campos de 48 px y esquina de 12 px con la variante field; mensajes de estado con texto accesible.">
      <FormBlock />
    </ShowcaseCard>
  </VStack>
);
