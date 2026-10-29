"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Spinner,
  Badge,
  Image,
} from "@chakra-ui/react";
import {
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { uploadFile, type StorageEntity } from "@/shared/api/firebase/storageService";

export interface ImageUploadZoneProps {
  value?: string;
  onChange: (url: string) => void;
  entity: StorageEntity;
  entityId: string;
  label?: string;
  helperText?: string;
  aspectRatio?: string | number;
  maxSizeMB?: number;
  disabled?: boolean;
}

export const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({
  value,
  onChange,
  entity,
  entityId,
  label = "Imagen de portada",
  helperText = "Arrastra un archivo aquí o haz clic para seleccionar (PNG, JPG, WebP hasta 5MB)",
  aspectRatio = "16/9",
  maxSizeMB = 5,
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = async (file: File) => {
    setErrorMessage(null);

    // Validación de tipo
    if (!file.type.startsWith("image/")) {
      setErrorMessage("El archivo debe ser una imagen válida (JPG, PNG, WebP)");
      return;
    }

    // Validación de tamaño
    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrorMessage(`El archivo no debe exceder los ${maxSizeMB} MB`);
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(20);

      const targetEntityId = entityId || "temp_" + Date.now();
      const sanitizedName = `cover_${Date.now()}_${file.name}`;

      const res = await uploadFile({
        entity,
        entityId: targetEntityId,
        file,
        fileName: sanitizedName,
        contentType: file.type,
      });

      setUploadProgress(100);
      onChange(res.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al subir la imagen";
      setErrorMessage(msg);
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled || uploading) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled || uploading) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      await handleFileProcess(file);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await handleFileProcess(file);
      e.target.value = "";
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  const handleZoneClick = () => {
    if (disabled || uploading) return;
    fileInputRef.current?.click();
  };

  return (
    <VStack align="stretch" gap="2" w="full">
      {label && (
        <HStack justify="space-between">
          <Text fontSize="sm" fontWeight="semibold" color="text.primary">
            {label}
          </Text>
          {value && (
            <Badge size="sm" colorPalette="green" variant="subtle">
              <CheckCircle2 size={12} style={{ flexShrink: 0, marginRight: 4 }} />
              Imagen cargada
            </Badge>
          )}
        </HStack>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif"
        style={{ display: "none" }}
        onChange={handleFileChange}
        disabled={disabled || uploading}
      />

      <Box
        position="relative"
        w="full"
        borderRadius="xl"
        border="2px dashed"
        borderColor={
          errorMessage
            ? "red.500"
            : isDragging
            ? "brand.primary"
            : value
            ? "border.default"
            : "border.subtle"
        }
        bg={
          isDragging
            ? "rgba(56, 189, 248, 0.08)"
            : value
            ? "bg.subtle"
            : "surface.card"
        }
        p="4"
        cursor={disabled || uploading ? "not-allowed" : "pointer"}
        transition="all 0.2s ease"
        onClick={handleZoneClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        overflow="hidden"
        style={{ aspectRatio }}
      >
        {value ? (
          // Vista previa de imagen
          <Box position="relative" w="full" h="full" borderRadius="lg" overflow="hidden">
            {/* Imagen de fondo / preview */}
            <Box
              w="full"
              h="full"
              position="relative"
            >
              <img
                src={value}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Overlay al hacer hover o siempre en mobile */}
            <Box
              position="absolute"
              inset="0"
              bg="rgba(0, 0, 0, 0.45)"
              opacity="0"
              _hover={{ opacity: 1 }}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap="3"
              transition="opacity 0.2s ease"
              backdropFilter="blur(3px)"
            >
              <Text fontSize="xs" color="white" fontWeight="medium">
                Haz clic para cambiar la imagen
              </Text>

              <HStack gap="2">
                <Button
                  size="xs"
                  variant="subtle"
                  colorPalette="gray"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(value, "_blank");
                  }}
                >
                  <ExternalLink size={14} style={{ flexShrink: 0 }} />
                  Ver original
                </Button>
                <Button
                  size="xs"
                  colorPalette="red"
                  variant="solid"
                  onClick={handleRemove}
                >
                  <Trash2 size={14} style={{ flexShrink: 0 }} />
                  Eliminar
                </Button>
              </HStack>
            </Box>
          </Box>
        ) : (
          // Zona vacía lista para subir
          <VStack
            w="full"
            h="full"
            justify="center"
            align="center"
            gap="2.5"
            p="4"
            textAlign="center"
          >
            {uploading ? (
              <VStack gap="2">
                <Spinner size="lg" color="brand.primary" />
                <Text fontSize="sm" fontWeight="medium" color="brand.primary">
                  Subiendo a Firebase Storage... {uploadProgress ? `${uploadProgress}%` : ""}
                </Text>
              </VStack>
            ) : (
              <>
                <Box
                  p="3"
                  borderRadius="full"
                  bg="bg.subtle"
                  color={isDragging ? "brand.primary" : "text.muted"}
                  transition="all 0.2s ease"
                >
                  {isDragging ? (
                    <ImageIcon size={28} style={{ flexShrink: 0 }} />
                  ) : (
                    <UploadCloud size={28} style={{ flexShrink: 0 }} />
                  )}
                </Box>
                <VStack gap="0.5">
                  <Text fontSize="sm" fontWeight="medium" color="text.primary">
                    {isDragging ? "Suelta la imagen aquí" : "Arrastra o selecciona una foto"}
                  </Text>
                  <Text fontSize="xs" color="text.muted" maxW="320px">
                    {helperText}
                  </Text>
                </VStack>
                <Button
                  size="xs"
                  variant="outline"
                  borderColor="border.default"
                  color="text.primary"
                  mt="1"
                >
                  Explorar archivo
                </Button>
              </>
            )}
          </VStack>
        )}
      </Box>

      {errorMessage && (
        <HStack gap="1.5" color="red.500" fontSize="xs">
          <AlertCircle size={14} style={{ flexShrink: 0 }} />
          <Text>{errorMessage}</Text>
        </HStack>
      )}
    </VStack>
  );
};
