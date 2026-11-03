"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import { Box, Heading, HStack, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { TOUCH_MIN } from "@/shared/constants/layout";
import { companyData } from "@/shared/config/company-data";
import { buildWhatsAppOrderMessage } from "@/features/tienda/cart-engine";
import { useCartStore } from "@/features/tienda/useCartStore";

const money = (n: number) => `S/ ${n.toFixed(2)}`;

/**
 * Checkout sin escritura en Firestore: la colección `pedidos` solo admite
 * escritura de admin (firestore.rules), por lo que el pedido se envía por
 * WhatsApp corporativo. Persistir pedidos públicos queda BLOQUEADO.
 */
export function CheckoutScreen() {
  const cart = useCartStore();
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const valid = form.name.trim().length >= 3 && form.phone.replace(/\D/g, "").length >= 9 && form.address.trim().length >= 5;

  const href = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
    buildWhatsAppOrderMessage(cart.lines, cart.totals, form),
  )}`;

  return (
    <Box as="main" maxW="3xl" mx="auto" px={{ base: "4", md: "6" }} py={{ base: "8", md: "12" }}>
      <Heading as="h1" size="xl" mb="6">
        Checkout
      </Heading>
      {cart.lines.length === 0 ? (
        <VStack align="flex-start" gap="3">
          <Text color="text.muted">Tu carrito está vacío.</Text>
          <Button as={NextLink} href="/tienda" variant="aura" minH={TOUCH_MIN}>
            Volver a la tienda
          </Button>
        </VStack>
      ) : (
        <VStack align="stretch" gap="6">
          <Box p={{ base: "4", md: "6" }} borderWidth="1px" borderRadius="xl">
            <Text fontWeight="bold" mb="3">
              Resumen
            </Text>
            <VStack align="stretch" gap="2">
              {cart.lines.map((l) => (
                <HStack key={l.productId} justify="space-between" gap="3">
                  <Text fontSize="sm">
                    {l.quantity} x {l.name}
                  </Text>
                  <Text fontSize="sm" flexShrink={0}>
                    {money(l.unitPrice * l.quantity)}
                  </Text>
                </HStack>
              ))}
              <HStack justify="space-between" pt="2" borderTopWidth="1px">
                <Text fontSize="sm">Subtotal</Text>
                <Text fontSize="sm">{money(cart.totals.subtotal)}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm">IGV (18%)</Text>
                <Text fontSize="sm">{money(cart.totals.igv)}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">Total</Text>
                <Text fontWeight="bold">{money(cart.totals.total)}</Text>
              </HStack>
            </VStack>
          </Box>

          <Box p={{ base: "4", md: "6" }} borderWidth="1px" borderRadius="xl">
            <Text fontWeight="bold" mb="3">
              Datos de envío o visita técnica
            </Text>
            <VStack align="stretch" gap="3">
              <Input placeholder="Nombre completo" minH={TOUCH_MIN} value={form.name} onChange={set("name")} />
              <Input placeholder="Teléfono" inputMode="tel" minH={TOUCH_MIN} value={form.phone} onChange={set("phone")} />
              <Input placeholder="Dirección / distrito" minH={TOUCH_MIN} value={form.address} onChange={set("address")} />
              <Textarea placeholder="Notas (opcional)" value={form.notes} onChange={set("notes")} />
            </VStack>
          </Box>

          <Button
            as="a"
            href={valid ? href : undefined}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            minH={TOUCH_MIN}
            disabled={!valid}
          >
            Enviar pedido por WhatsApp
          </Button>
          <Text fontSize="xs" color="text.muted">
            Coordinaremos el pago por transferencia y la entrega o visita técnica.
          </Text>
        </VStack>
      )}
    </Box>
  );
}
