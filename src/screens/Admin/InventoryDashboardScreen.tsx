"use client";

import React, { useState, useMemo } from "react";
import { Box, VStack, HStack, Heading, Text, Button } from "@chakra-ui/react";
import { Plus, FileSpreadsheet } from "lucide-react";
import { useRealtimeProducts } from "@/features/products/hooks/useRealtimeProducts";
import { productService } from "@/features/products/services/productService";
import { Product } from "@/shared/schemas/ecommerce-schemas";
import { exportInventoryToExcel } from "@/shared/utils/excel-export";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";
import { MetricsSummary } from "./inventory/MetricsSummary";
import { SearchFilters } from "./inventory/SearchFilters";
import { ProductTable } from "./inventory/ProductTable";
import { ReplenishStockModal } from "./inventory/ReplenishStockModal";
import { CreateProductModal } from "./inventory/CreateProductModal";
import { EMPTY_PRODUCT_FORM, type InventoryStatusMessage, type ProductFormData } from "./inventory/productForm";

export const InventoryDashboardScreen: React.FC = () => {
  const { products, loading } = useRealtimeProducts();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  // Estados de modales
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isReplenishModalOpen, setIsReplenishModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [replenishQty, setReplenishQty] = useState<number>(10);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<InventoryStatusMessage>(null);

  // Formulario de Producto (Nuevo / Editar)
  const [formData, setFormData] = useState<ProductFormData>(EMPTY_PRODUCT_FORM);

  // Filtrado de productos
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchesCat = selectedCategory === "todos" || p.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, selectedCategory]);

  const openCreateModal = (productToEdit?: Product) => {
    if (productToEdit) {
      setSelectedProduct(productToEdit);
      setFormData({
        id: productToEdit.id,
        sku: productToEdit.sku,
        name: productToEdit.name,
        description: productToEdit.description || "",
        category: productToEdit.category,
        unit: productToEdit.unit,
        stock: productToEdit.stock,
        minStockAlert: productToEdit.minStockAlert,
        unitPrice: productToEdit.unitPrice,
        costPrice: productToEdit.costPrice || 0,
        imageUrl: productToEdit.imageUrl || "",
      });
    } else {
      setSelectedProduct(null);
      setFormData({
        sku: `GYA-${Math.floor(100 + Math.random() * 900)}`,
        name: "",
        description: "",
        category: "vidrio",
        unit: "m2",
        stock: 10,
        minStockAlert: 5,
        unitPrice: 120,
        costPrice: 75,
        imageUrl: "",
      });
    }
    setIsCreateModalOpen(true);
    setStatusMessage(null);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setStatusMessage(null);

    try {
      if (selectedProduct && selectedProduct.id) {
        await productService.updateProduct(selectedProduct.id, {
          sku: formData.sku,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          unit: formData.unit,
          stock: Number(formData.stock),
          minStockAlert: Number(formData.minStockAlert),
          unitPrice: Number(formData.unitPrice),
          costPrice: Number(formData.costPrice),
          imageUrl: formData.imageUrl,
        });
        setStatusMessage({ type: "success", text: "Producto actualizado correctamente." });
      } else {
        await productService.createProduct({
          sku: formData.sku,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          unit: formData.unit,
          stock: Number(formData.stock),
          minStockAlert: Number(formData.minStockAlert),
          unitPrice: Number(formData.unitPrice),
          costPrice: Number(formData.costPrice),
          imageUrl: formData.imageUrl,
          isActive: true,
        });
        setStatusMessage({ type: "success", text: "Nuevo producto registrado con éxito." });
      }
      setTimeout(() => setIsCreateModalOpen(false), 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al guardar el producto";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setActionLoading(false);
    }
  };

  const openReplenishModal = (product: Product) => {
    setSelectedProduct(product);
    setReplenishQty(10);
    setIsReplenishModalOpen(true);
    setStatusMessage(null);
  };

  const handleReplenishStock = async () => {
    if (!selectedProduct?.id || replenishQty <= 0) return;
    setActionLoading(true);
    setStatusMessage(null);

    try {
      await productService.replenishStock(selectedProduct.id, Number(replenishQty));
      setStatusMessage({
        type: "success",
        text: `Se añadieron +${replenishQty} ${selectedProduct.unit} a "${selectedProduct.name}" exitosamente.`,
      });
      setTimeout(() => setIsReplenishModalOpen(false), 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al ingresar stock";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`¿Está seguro de eliminar "${name}" del catálogo?`)) return;
    try {
      await productService.deleteProduct(id);
    } catch (err: unknown) {
      alert("Error al eliminar producto: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <Box maxW="1350px" mx="auto" py="8" px={{ base: "4", md: "6" }}>
      <AdminNav />

      {/* Encabezado Principal */}
      <HStack justify="space-between" align="center" wrap="wrap" gap="4" mb="8">
        <VStack align="start" gap="1">
          <Heading size="2xl" color="text.heading" letterSpacing="-0.02em">
            Gestión y Control de Inventario
          </Heading>
          <Text color="text.muted" fontSize="sm">
            Catálogo en tiempo real de vidrios templados, perfiles de aluminio y accesorios con mutaciones atómicas.
          </Text>
        </VStack>

        <HStack gap="3">
          <Button
            variant="outline"
            onClick={() => exportInventoryToExcel(products)}
            size="md"
            borderRadius="xl"
          >
            <FileSpreadsheet size={16} style={{ marginRight: 6 }} />
            Exportar Excel
          </Button>
          <Button
            colorPalette="cyan"
            onClick={() => openCreateModal()}
            size="md"
            borderRadius="xl"
          >
            <Plus size={16} style={{ marginRight: 6 }} />
            Nuevo Producto
          </Button>
        </HStack>
      </HStack>

      <MetricsSummary products={products} />

      <SearchFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <ProductTable
        products={filteredProducts}
        loading={loading}
        onEdit={openCreateModal}
        onReplenish={openReplenishModal}
        onDelete={handleDeleteProduct}
      />

      {isReplenishModalOpen && selectedProduct && (
        <ReplenishStockModal
          product={selectedProduct}
          qty={replenishQty}
          onQtyChange={setReplenishQty}
          onConfirm={handleReplenishStock}
          onClose={() => setIsReplenishModalOpen(false)}
          actionLoading={actionLoading}
          statusMessage={statusMessage}
        />
      )}

      {isCreateModalOpen && (
        <CreateProductModal
          formData={formData}
          onChange={setFormData}
          isEditing={Boolean(selectedProduct)}
          onSubmit={handleSaveProduct}
          onClose={() => setIsCreateModalOpen(false)}
          actionLoading={actionLoading}
          statusMessage={statusMessage}
        />
      )}
    </Box>
  );
};
