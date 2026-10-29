"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  SimpleGrid,
  Spinner,
  IconButton,
  Input,
  Badge,
  Image,
} from "@chakra-ui/react";
import {
  UploadCloud,
  Trash2,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Plus,
  AlertCircle,
  GripVertical,
} from "lucide-react";
import { uploadFile, type StorageEntity } from "@/shared/api/firebase/storageService";

export interface GalleryPhotoItem {
  id: string;
  url: string;
  caption?: string; // Para proyectos
  alt?: string;     // Para servicios
}

export interface AlbumGalleryUploaderProps {
  items: GalleryPhotoItem[];
  onChange: (items: GalleryPhotoItem[]) => void;
  entity: StorageEntity;
  entityId: string;
  label?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  captionFieldLabel?: "Leyenda" | "Texto alternativo (Alt)";
  disabled?: boolean;
}

export const AlbumGalleryUploader: React.FC<AlbumGalleryUploaderProps> = ({
  items,
  onChange,
  entity,
  entityId,
  label = "Galería del álbum",
  maxFiles = 20,
  maxSizeMB = 5,
  captionFieldLabel = "Leyenda",
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState({ current: 0, total: 0 });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesUpload = async (files: FileList | File[]) => {
    setErrorMessage(null);
    const fileArray = Array.from(files);

    if (items.length + fileArray.length > maxFiles) {
      setErrorMessage(`El álbum no puede superar un máximo de ${maxFiles} fotos`);
      return;
    }

    const invalidType = fileArray.some((f) => !f.type.startsWith("image/"));
    if (invalidType) {
      setErrorMessage("Todos los archivos deben ser imágenes válidas (JPG, PNG, WebP)");
      return;
    }

    const invalidSize = fileArray.some((f) => f.size > maxSizeMB * 1024 * 1024);
    if (invalidSize) {
      setErrorMessage(`Cada imagen debe ser inferior a ${maxSizeMB} MB`);
      return;
    }

    try {
      setUploading(true);
      setUploadCount({ current: 0, total: fileArray.length });

      const uploadedItems: GalleryPhotoItem[] = [];
      const targetEntityId = entityId || "temp_" + Date.now();

      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        setUploadCount({ current: i + 1, total: fileArray.length });

        const fileName = `gallery_${Date.now()}_${i}_${file.name}`;
        const res = await uploadFile({
          entity,
          entityId: targetEntityId,
          file,
          fileName,
          contentType: file.type,
        });

        uploadedItems.push({
          id: `photo_${Date.now()}_${i}`,
          url: res.url,
          caption: "",
          alt: "",
        });
      }

      onChange([...items, ...uploadedItems]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al subir imágenes a la galería";
      setErrorMessage(msg);
    } finally {
      setUploading(false);
      setUploadCount({ current: 0, total: 0 });
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
      await handleFilesUpload(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleFilesUpload(e.target.files);
      e.target.value = "";
    }
  };

  const handleRemovePhoto = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleMoveLeft = (index: number) => {
    if (index === 0) return;
    const updated = [...items];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    onChange(updated);
  };

  const handleMoveRight = (index: number) => {
    if (index === items.length - 1) return;
    const updated = [...items];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    onChange(updated);
  };

  const handleCaptionChange = (index: number, text: string) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      caption: text,
      alt: text,
    };
    onChange(updated);
  };

  return (
    <VStack align="stretch" gap="3" w="full">
      <HStack justify="space-between" wrap="wrap">
        <HStack gap="2">
          <Text fontSize="sm" fontWeight="semibold" color="text.primary">
            {label}
          </Text>
          <Badge size="sm" variant="subtle" colorPalette="blue">
            {items.length} / {maxFiles} fotos
          </Badge>
        </HStack>

        <Button
          size="xs"
          variant="outline"
          borderColor="border.default"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || uploading || items.length >= maxFiles}
        >
          <Plus size={14} style={{ flexShrink: 0 }} />
          Añadir fotos
        </Button>
      </HStack>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif"
        multiple
        style={{ display: "none" }}
        onChange={handleFileInputChange}
        disabled={disabled || uploading || items.length >= maxFiles}
      />

      {/* Zona de Drop para agregar imágenes al álbum */}
      <Box
        p="5"
        borderRadius="xl"
        border="2px dashed"
        borderColor={isDragging ? "brand.primary" : "border.subtle"}
        bg={isDragging ? "rgba(56, 189, 248, 0.08)" : "bg.subtle"}
        cursor={disabled || uploading ? "not-allowed" : "pointer"}
        textAlign="center"
        transition="all 0.2s ease"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploading ? (
          <VStack gap="2" py="3">
            <Spinner size="md" color="brand.primary" />
            <Text fontSize="sm" color="brand.primary" fontWeight="medium">
              Subiendo fotos ({uploadCount.current} de {uploadCount.total})...
            </Text>
          </VStack>
        ) : (
          <HStack justify="center" gap="3">
            <Box
              p="2"
              borderRadius="full"
              bg="surface.card"
              color="text.muted"
            >
              <UploadCloud size={20} style={{ flexShrink: 0 }} />
            </Box>
            <VStack align="start" gap="0">
              <Text fontSize="xs" fontWeight="medium" color="text.primary">
                Arrastra múltiples fotos para el álbum o haz clic aquí
              </Text>
              <Text fontSize="2xs" color="text.muted">
                Hasta {maxFiles} imágenes (PNG, JPG, WebP de máx {maxSizeMB}MB c/u)
              </Text>
            </VStack>
          </HStack>
        )}
      </Box>

      {errorMessage && (
        <HStack gap="1.5" color="red.500" fontSize="xs">
          <AlertCircle size={14} style={{ flexShrink: 0 }} />
          <Text>{errorMessage}</Text>
        </HStack>
      )}

      {/* Grid de thumbnails del álbum */}
      {items.length > 0 && (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="3" mt="2">
          {items.map((item, index) => (
            <Box
              key={item.id || index}
              borderRadius="xl"
              border="1px solid"
              borderColor="border.default"
              bg="surface.card"
              overflow="hidden"
              boxShadow="0 4px 12px rgba(0, 0, 0, 0.04)"
              transition="all 0.2s ease"
              _hover={{ borderColor: "brand.primary", boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)" }}
            >
              {/* Thumbnail Container */}
              <Box position="relative" w="full" h="130px" bg="bg.subtle" overflow="hidden">
                <Image
                  src={item.url}
                  alt={item.caption || item.alt || `Foto ${index + 1}`}
                  w="full"
                  h="full"
                  objectFit="cover"
                />

                {/* Badge de orden */}
                <Badge
                  position="absolute"
                  top="2"
                  left="2"
                  size="sm"
                  colorPalette="gray"
                  variant="solid"
                  borderRadius="full"
                  px="2"
                  fontSize="2xs"
                >
                  #{index + 1}
                </Badge>

                {/* Acciones flotantes */}
                <HStack
                  position="absolute"
                  top="2"
                  right="2"
                  gap="1"
                  bg="rgba(0, 0, 0, 0.6)"
                  p="1"
                  borderRadius="md"
                  backdropFilter="blur(4px)"
                >
                  <IconButton
                    aria-label="Ver imagen completa"
                    size="2xs"
                    variant="ghost"
                    color="white"
                    _hover={{ bg: "whiteAlpha.300" }}
                    onClick={() => window.open(item.url, "_blank")}
                  >
                    <ExternalLink size={12} style={{ flexShrink: 0 }} />
                  </IconButton>
                  <IconButton
                    aria-label="Eliminar foto"
                    size="2xs"
                    variant="ghost"
                    color="red.300"
                    _hover={{ bg: "red.500", color: "white" }}
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <Trash2 size={12} style={{ flexShrink: 0 }} />
                  </IconButton>
                </HStack>
              </Box>

              {/* Controles de ordenación y caption */}
              <VStack p="2.5" align="stretch" gap="2">
                <Input
                  size="xs"
                  placeholder={`${captionFieldLabel}...`}
                  value={item.caption || item.alt || ""}
                  onChange={(e) => handleCaptionChange(index, e.target.value)}
                  borderRadius="md"
                  borderColor="border.subtle"
                  fontSize="xs"
                />

                <HStack justify="space-between">
                  <HStack gap="1">
                    <Button
                      size="2xs"
                      variant="outline"
                      borderColor="border.subtle"
                      onClick={() => handleMoveLeft(index)}
                      disabled={index === 0}
                      title="Mover a la izquierda"
                    >
                      <ArrowLeft size={12} style={{ flexShrink: 0 }} />
                    </Button>
                    <Button
                      size="2xs"
                      variant="outline"
                      borderColor="border.subtle"
                      onClick={() => handleMoveRight(index)}
                      disabled={index === items.length - 1}
                      title="Mover a la derecha"
                    >
                      <ArrowRight size={12} style={{ flexShrink: 0 }} />
                    </Button>
                  </HStack>

                  <HStack gap="1" color="text.muted" fontSize="2xs">
                    <GripVertical size={12} style={{ flexShrink: 0 }} />
                    <Text>Posición {index + 1}</Text>
                  </HStack>
                </HStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};
