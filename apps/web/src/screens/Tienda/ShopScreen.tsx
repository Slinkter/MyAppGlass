"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { TOUCH_MIN } from "@/shared/constants/layout";
import { useShopProducts } from "@/features/tienda/useShopProducts";
import { useCartStore } from "@/features/tienda/useCartStore";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import { CartDrawer } from "./CartDrawer";

const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "vidrio", label: "Vidrio" },
  { id: "aluminio", label: "Aluminio" },
  { id: "accesorio", label: "Accesorios" },
] as const;

export function ShopScreen() {
  const { products, loading } = useShopProducts();
  const cart = useCartStore();
  const [category, setCategory] = useState<string>("todos");

  const { reconcile } = cart;
  useEffect(() => {
    if (!loading) reconcile(products);
  }, [loading, products, reconcile]);

  const visible = useMemo(
    () => products.filter((p) => category === "todos" || p.category === category),
    [products, category],
  );

  return (
    <Box as="main" maxW="pageDefault" mx="auto" px={{ base: "4", md: "6" }} py={{ base: "8", md: "12" }}>
      <HStack justify="space-between" mb="6" gap="3" flexWrap="wrap">
        <VStack align="flex-start" gap="1">
          <Heading as="h1" size="xl">
            Tienda de vidrio y aluminio
          </Heading>
          <Text fontSize="sm" color="text.muted">
            Vidrios, perfiles y accesorios. Pedido por WhatsApp o transferencia.
          </Text>
        </VStack>
        <Button variant="primary" minH={TOUCH_MIN} onClick={() => cart.open()}>
          <ShoppingCart size={18} style={{ flexShrink: 0 }} />
          Carrito ({cart.totals.units})
        </Button>
      </HStack>

      <HStack gap="2" mb="6" overflowX="auto" pb="1">
        {CATEGORIES.map((c) => (
          <Button
            key={c.id}
            variant={category === c.id ? "primary" : "outline"}
            minH={TOUCH_MIN}
            flexShrink={0}
            whiteSpace="nowrap"
            onClick={() => setCategory(c.id)}
          >
            {c.label}
          </Button>
        ))}
      </HStack>

      <ItemGridLayout
        motion="cine"
        columns={{ base: 1, sm: 2, lg: 3 }}
        gap="4"
        containerProps={{ px: 0, py: 0, maxW: "full" }}
      >
        {visible.map((p, index) => {
          const inCart = cart.lines.find((l) => l.productId === (p.id ?? p.sku))?.quantity ?? 0;
          const soldOut = p.stock <= 0;
          return (
            <ItemGridLayout.Item key={p.id ?? p.sku} index={index}>
              <Box
                p={{ base: "4", md: "6" }}
                borderWidth="1px"
                borderRadius="xl"
                bg="surface.card"
                borderColor="border.default"
                h="full"
                transition="transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
                _hover={{ transform: "translateY(-4px)", boxShadow: "elevatedLg" }}
                _motionReduce={{ transition: "none", transform: "none", _hover: { transform: "none" } }}
              >
                <VStack align="stretch" gap="2" h="full" justify="space-between">
                  <VStack align="stretch" gap="2">
                    <Text fontWeight="bold">{p.name}</Text>
                    <Text fontSize="sm" color="text.muted" lineClamp={3}>
                      {p.description}
                    </Text>
                  </VStack>
                  <VStack align="stretch" gap="2" pt="2">
                    <Text fontSize="lg" fontWeight="bold">
                      S/ {p.unitPrice.toFixed(2)}{" "}
                      <Text as="span" fontSize="xs" fontWeight="normal" color="text.muted">
                        / {p.unit} + IGV
                      </Text>
                    </Text>
                    <Text fontSize="xs" color={soldOut ? "red.600" : "text.muted"}>
                      {soldOut ? "Agotado" : `Stock: ${p.stock}`}
                    </Text>
                    <Button
                      variant="primary"
                      minH={TOUCH_MIN}
                      disabled={soldOut || inCart >= p.stock}
                      onClick={() => {
                        cart.add(p, 1);
                        cart.open();
                      }}
                    >
                      Agregar al carrito
                    </Button>
                  </VStack>
                </VStack>
              </Box>
            </ItemGridLayout.Item>
          );
        })}
      </ItemGridLayout>

      <CartDrawer catalog={products} />
    </Box>
  );
}
