"use client";

import React, { useMemo } from "react";
import NextLink from "next/link";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "@/components/ui/drawer";
import { TOUCH_MIN } from "@/shared/constants/layout";
import type { Product } from "@/shared/schemas/ecommerce-schemas";
import { getCrossSells } from "@/features/tienda/cart-engine";
import { useCartStore } from "@/features/tienda/useCartStore";

const money = (n: number) => `S/ ${n.toFixed(2)}`;

export function CartDrawer({ catalog }: { catalog: Product[] }) {
  const cart = useCartStore();
  const suggestions = useMemo(() => getCrossSells(cart.lines, catalog), [cart.lines, catalog]);

  return (
    <DrawerRoot
      open={cart.isOpen}
      onOpenChange={(e) => (e.open ? cart.open() : cart.close())}
      placement="end"
      size="md"
    >
      <DrawerContent>
        <DrawerCloseTrigger />
        <DrawerHeader>
          <DrawerTitle>Tu carrito ({cart.totals.units})</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          {cart.lines.length === 0 ? (
            <Text fontSize="sm" color="text.muted">
              Aún no agregaste productos.
            </Text>
          ) : (
            <VStack align="stretch" gap="3">
              {cart.lines.map((l) => (
                <Box key={l.productId} p="3" borderWidth="1px" borderRadius="xl">
                  <Text fontSize="sm" fontWeight="semibold">
                    {l.name}
                  </Text>
                  <Text fontSize="xs" color="text.muted">
                    {money(l.unitPrice)} / {l.unit} · stock {l.maxStock}
                  </Text>
                  <HStack mt="2" justify="space-between">
                    <HStack>
                      <Button
                        aria-label="Disminuir cantidad"
                        variant="outline"
                        minW={TOUCH_MIN}
                        minH={TOUCH_MIN}
                        onClick={() => cart.setQuantity(l.productId, l.quantity - 1)}
                      >
                        <Minus size={16} style={{ flexShrink: 0 }} />
                      </Button>
                      <Text minW="6" textAlign="center" fontWeight="semibold">
                        {l.quantity}
                      </Text>
                      <Button
                        aria-label="Aumentar cantidad"
                        variant="outline"
                        minW={TOUCH_MIN}
                        minH={TOUCH_MIN}
                        disabled={l.quantity >= l.maxStock}
                        onClick={() => cart.setQuantity(l.productId, l.quantity + 1)}
                      >
                        <Plus size={16} style={{ flexShrink: 0 }} />
                      </Button>
                    </HStack>
                    <HStack>
                      <Text fontSize="sm" fontWeight="bold">
                        {money(l.unitPrice * l.quantity)}
                      </Text>
                      <Button
                        aria-label="Quitar"
                        variant="ghost"
                        minW={TOUCH_MIN}
                        minH={TOUCH_MIN}
                        onClick={() => cart.remove(l.productId)}
                      >
                        <Trash2 size={16} style={{ flexShrink: 0 }} />
                      </Button>
                    </HStack>
                  </HStack>
                </Box>
              ))}

              {suggestions.length > 0 && (
                <Box pt="2">
                  <Text fontSize="sm" fontWeight="bold" mb="2">
                    Complementa tu compra
                  </Text>
                  <VStack align="stretch" gap="2">
                    {suggestions.map((p) => (
                      <HStack key={p.id ?? p.sku} justify="space-between" gap="2">
                        <Box minW="0">
                          <Text fontSize="xs" fontWeight="semibold">
                            {p.name}
                          </Text>
                          <Text fontSize="xs" color="text.muted">
                            {money(p.unitPrice)}
                          </Text>
                        </Box>
                        <Button variant="outline" minH={TOUCH_MIN} flexShrink={0} onClick={() => cart.add(p, 1)}>
                          Agregar
                        </Button>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          )}
        </DrawerBody>
        <DrawerFooter>
          <VStack align="stretch" w="full" gap="2">
            <HStack justify="space-between">
              <Text fontSize="sm" color="text.muted">
                Subtotal + IGV (18%)
              </Text>
              <Text fontWeight="bold">{money(cart.totals.total)}</Text>
            </HStack>
            <Button
              as={NextLink}
              href="/tienda/checkout"
              variant="aura"
              minH={TOUCH_MIN}
              disabled={cart.lines.length === 0}
              onClick={() => cart.close()}
            >
              Ir al checkout
            </Button>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
}
