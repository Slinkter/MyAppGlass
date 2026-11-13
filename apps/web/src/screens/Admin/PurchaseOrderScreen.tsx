"use client";

import React, { useEffect, useState } from "react";
import { Box, Flex, Grid, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import {
  PurchaseOrderSheet,
  purchaseOrderService,
  purchaseTotal,
  useSupplierProducts,
} from "@/entities/supplier";
import type { PurchaseLine, PurchaseOrder, SupplierProduct } from "@/entities/supplier";
import { SupplierProductPicker } from "@/features/admin/components/purchase/SupplierProductPicker";
import { PurchaseSummaryCard } from "@/features/admin/components/purchase/PurchaseSummaryCard";
import { PurchaseOrdersList } from "@/features/admin/components/purchase/PurchaseOrdersList";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Button } from "@/shared/ui/button";
import { toaster } from "@/shared/ui/toaster-instance";
import { logger } from "@/shared/utils/logger";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";

type Tab = "nuevo" | "guardados";

const VISTA_PREVIA_ID = "vista-previa";

export const PurchaseOrderScreen: React.FC = () => {
  const { user } = useAuth();
  const { products, loading: productsLoading, error: productsError } = useSupplierProducts();

  const [tab, setTab] = useState<Tab>("nuevo");
  const [lines, setLines] = useState<PurchaseLine[]>([]);
  const [nota, setNota] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState<boolean>(true);
  const [preview, setPreview] = useState<PurchaseOrder | null>(null);

  const name = user?.displayName || user?.email || "Administrador";
  const uid = user?.uid || "admin_system";

  useEffect(() => {
    const unsubscribe = purchaseOrderService.listen(
      (data) => {
        setOrders(data);
        setOrdersLoading(false);
      },
      (e) => {
        logger.error("[Pedidos de compra] Error al escuchar pedidos", e);
        setOrdersLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  const addedIds = lines.map((l) => l.productId);

  const onAdd = (product: SupplierProduct) => {
    if (addedIds.includes(product.id)) return;
    const linea: PurchaseLine = {
      productId: product.id,
      proveedor: product.proveedor,
      cod: product.cod,
      descripcion: product.descripcion,
      imagenPath: product.imagenPath ?? null,
      cantidad: 1,
      precio: product.precio,
    };
    setLines((prev) => [...prev, linea]);
  };

  const onChangeQty = (productId: string, cantidad: number) => {
    setLines((prev) =>
      prev.map((l) => (l.productId === productId ? { ...l, cantidad: Math.max(1, cantidad) } : l)),
    );
  };

  const onRemove = (productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  };

  const save = async (estado: "borrador" | "por_aprobar") => {
    if (saving || lines.length === 0) return;
    setSaving(true);
    try {
      const creado = await purchaseOrderService.create({
        lineas: lines,
        nota,
        estado,
        user: { uid, name },
      });
      toaster.create({
        title:
          estado === "borrador"
            ? `Pedido ${creado.number} guardado como borrador.`
            : `Pedido ${creado.number} enviado a aprobación.`,
        type: "success",
      });
      setLines([]);
      setNota("");
    } catch (e) {
      logger.error("[Pedidos de compra] No se pudo guardar el pedido", e);
      toaster.create({
        title: "No se pudo guardar el pedido. Inténtelo otra vez.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const onSaveDraft = () => save("borrador");
  const onSubmit = () => save("por_aprobar");

  const onPreview = () => {
    setPreview({
      id: VISTA_PREVIA_ID,
      number: "Sin número (vista previa)",
      estado: "borrador",
      lineas: lines,
      total: purchaseTotal(lines),
      nota,
      createdByUid: uid,
      createdByName: name,
      approvedByName: null,
    });
  };

  const onApprove = async (order: PurchaseOrder) => {
    try {
      await purchaseOrderService.setStatus(order.id, "aprobado", name);
      toaster.create({ title: `Pedido ${order.number} aprobado.`, type: "success" });
    } catch (e) {
      logger.error("[Pedidos de compra] No se pudo aprobar el pedido", e);
      toaster.create({ title: "No se pudo aprobar el pedido. Inténtelo otra vez.", type: "error" });
    }
  };

  const onReturnToDraft = async (order: PurchaseOrder) => {
    try {
      await purchaseOrderService.setStatus(order.id, "borrador");
    } catch (e) {
      logger.error("[Pedidos de compra] No se pudo devolver el pedido a borrador", e);
      toaster.create({ title: "No se pudo cambiar el estado. Inténtelo otra vez.", type: "error" });
    }
  };

  if (preview) {
    return (
      <Box maxW="84rem" mx="auto" py={{ base: "5", md: "8" }} px={{ base: "4", md: "6" }}>
        <Box className="no-print">
          <AdminNav />
          <Flex justify="space-between" align="center" wrap="wrap" gap="3" mb="6">
            <Button variant="outline" minH="11" onClick={() => setPreview(null)}>
              Volver
            </Button>
            <Button variant="solid" minH="11" onClick={() => window.print()}>
              Imprimir o guardar PDF
            </Button>
          </Flex>
        </Box>
        <PurchaseOrderSheet order={preview} />
      </Box>
    );
  }

  return (
    <Box maxW="84rem" mx="auto" py={{ base: "5", md: "8" }} px={{ base: "4", md: "6" }}>
      <Box className="no-print">
        <AdminNav />

        <VStack align="start" gap="1" mb="6">
          <Heading size="2xl" color="text.heading" letterSpacing="-0.02em">
            Pedido de compra a proveedores
          </Heading>
          <Text color="text.muted" fontSize="sm">
            Arme el pedido con el catálogo de los proveedores. El resumen se separa por proveedor.
          </Text>
        </VStack>

        <HStack gap="2" mb="6" wrap="wrap">
          <Button
            variant={tab === "nuevo" ? "solid" : "outline"}
            minH="11"
            onClick={() => setTab("nuevo")}
          >
            Nuevo pedido
          </Button>
          <Button
            variant={tab === "guardados" ? "solid" : "outline"}
            minH="11"
            onClick={() => setTab("guardados")}
          >
            Pedidos guardados
          </Button>
        </HStack>
      </Box>

      {tab === "nuevo" ? (
        <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) 24rem" }} gap={{ base: "4", md: "6" }} alignItems="start">
          <SupplierProductPicker
            products={products}
            loading={productsLoading}
            error={productsError}
            addedIds={addedIds}
            onAdd={onAdd}
          />
          <Box position={{ base: "static", lg: "sticky" }} top={{ lg: "4" }}>
            <PurchaseSummaryCard
              lines={lines}
              nota={nota}
              saving={saving}
              onChangeQty={onChangeQty}
              onRemove={onRemove}
              onChangeNota={setNota}
              onSaveDraft={onSaveDraft}
              onPreview={onPreview}
              onSubmit={onSubmit}
            />
          </Box>
        </Grid>
      ) : (
        <PurchaseOrdersList
          orders={orders}
          loading={ordersLoading}
          onView={(order) => setPreview(order)}
          onApprove={onApprove}
          onReturnToDraft={onReturnToDraft}
        />
      )}
    </Box>
  );
};
