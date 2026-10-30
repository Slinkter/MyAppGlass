"use client";

import React, { useState } from "react";
import { Box, VStack, HStack, Heading, Text, Button, SimpleGrid } from "@chakra-ui/react";
import { RefreshCw } from "lucide-react";
import { useRealtimeProducts } from "@/features/products/hooks/useRealtimeProducts";
import { useOrderDraft } from "@/features/products/context/OrderDraftContext";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Product } from "@/shared/schemas/ecommerce-schemas";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";
import { OrderSuccessBanner } from "./sales/OrderSuccessBanner";
import { ClientDataCard } from "./sales/ClientDataCard";
import { ProductPickerCard } from "./sales/ProductPickerCard";
import { OrderSummaryCard } from "./sales/OrderSummaryCard";
import type { ClientForm } from "./sales/types";
import { logger } from "@/shared/utils/logger";

export const SalesOrderScreen: React.FC = () => {
  const { user } = useAuth();
  const { products, loading: productsLoading } = useRealtimeProducts();
  const {
    client,
    items,
    paymentMethod,
    notes,
    subtotal,
    igv,
    total,
    totalUnits,
    isSubmitting,
    setClient,
    setPaymentMethod,
    setNotes,
    addItem,
    removeItem,
    clearDraft,
    submitOrder,
  } = useOrderDraft();

  const [clientForm, setClientForm] = useState<ClientForm>({
    name: client?.name || "",
    dniRuc: client?.dniRuc || "",
    phone: client?.phone || "",
    address: client?.address || "",
    district: client?.district || "La Molina",
  });

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [productSearch, setProductSearch] = useState<string>("");
  const [selectedCat, setSelectedCat] = useState<string>("todos");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);

  const getQty = (id?: string) => (id ? quantities[id] || 1 : 1);
  const setQty = (id: string, delta: number, maxStock: number) => {
    const current = getQty(id);
    const updated = Math.max(1, Math.min(maxStock, current + delta));
    setQuantities({ ...quantities, [id]: updated });
  };

  const handleUpdateClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...clientForm, [name]: value };
    setClientForm(updated);
    if (updated.name.trim().length > 0) {
      setClient({
        id: updated.dniRuc ? `cli_${updated.dniRuc}` : `cli_${Date.now()}`,
        name: updated.name,
        dniRuc: updated.dniRuc,
        phone: updated.phone,
        address: updated.address,
        district: updated.district,
      });
    }
  };

  const handleAddItem = (prod: Product) => {
    if (!prod.id) return;
    const qty = getQty(prod.id);
    const result = addItem(prod, qty);
    if (!result.success) {
      setErrorMessage(result.message || "Stock insuficiente");
    } else {
      setErrorMessage(null);
      setQuantities({ ...quantities, [prod.id]: 1 });
    }
  };

  const handleSubmit = async () => {
    if (!clientForm.name.trim()) {
      setErrorMessage("Por favor ingrese el nombre del cliente o empresa receptora");
      return;
    }
    if (items.length === 0) {
      setErrorMessage("La orden debe tener al menos un producto agregado");
      return;
    }

    setErrorMessage(null);
    const adminUid = user?.uid || "admin_system";
    const adminName = user?.displayName || user?.email || "Administrador GYA";

    logger.info("[Venta] Enviando orden de despacho...", {
      cliente: clientForm.name,
      dniRuc: clientForm.dniRuc,
      items: items.map((i) => ({ sku: i.sku, cant: i.quantity })),
      total,
      adminUid,
      adminName,
    });

    const res = await submitOrder(adminUid, adminName);
    if (res.success && res.orderId) {
      logger.info("[Venta Exitosa] Orden procesada con ID: " + res.orderId);
      setCompletedOrderId(res.orderId);
      setErrorMessage(null);
    } else {
      logger.error("Falló el despacho de la orden: " + (res.error || "unknown"));
      setErrorMessage(res.error || "Error al procesar el despacho en Firestore");
    }
  };

  const filteredProducts = products.filter((p) => {
    const q = productSearch.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    const matchesCat = selectedCat === "todos" || p.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <Box maxW="1350px" mx="auto" py="8" px={{ base: "4", md: "6" }}>
      <AdminNav />

      {/* Encabezado */}
      <HStack justify="space-between" align="center" wrap="wrap" gap="4" mb="8">
        <VStack align="start" gap="1">
          <Heading size="2xl" color="text.heading" letterSpacing="-0.02em">
            Emisión de Ventas y Despacho de Stock
          </Heading>
          <Text color="text.muted" fontSize="sm">
            Registro transaccional atómico: descuenta existencias en Firestore en un solo lote commit.
          </Text>
        </VStack>

        {items.length > 0 && (
          <Button variant="ghost" colorPalette="red" size="sm" borderRadius="xl" onClick={clearDraft}>
            <RefreshCw size={14} style={{ marginRight: 6 }} />
            Limpiar Borrador ({items.length} partidas)
          </Button>
        )}
      </HStack>

      {completedOrderId && <OrderSuccessBanner orderId={completedOrderId} onNewSale={() => setCompletedOrderId(null)} />}

      <SimpleGrid columns={{ base: 1, lg: 12 }} gap="6">
        <VStack align="stretch" gap="6" gridColumn={{ lg: "span 7" }}>
          <ClientDataCard clientForm={clientForm} onChange={handleUpdateClient} />
          <ProductPickerCard
            products={filteredProducts}
            loading={productsLoading}
            search={productSearch}
            onSearchChange={setProductSearch}
            selectedCategory={selectedCat}
            onCategoryChange={setSelectedCat}
            getQty={getQty}
            onQtyChange={setQty}
            onAddItem={handleAddItem}
          />
        </VStack>

        <VStack align="stretch" gap="6" gridColumn={{ lg: "span 5" }}>
          <OrderSummaryCard
            items={items}
            totalUnits={totalUnits}
            subtotal={subtotal}
            igv={igv}
            total={total}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            notes={notes}
            onNotesChange={setNotes}
            errorMessage={errorMessage}
            isSubmitting={isSubmitting}
            onRemoveItem={removeItem}
            onSubmit={handleSubmit}
          />
        </VStack>
      </SimpleGrid>
    </Box>
  );
};
