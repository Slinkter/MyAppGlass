"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import { ImageUploadZone } from "../ImageUploadZone";
import { AlbumGalleryUploader, type GalleryPhotoItem } from "../AlbumGalleryUploader";

interface MediaFieldsProps {
  entity: "services" | "projects";
  entityId: string;
  coverImage: string;
  onCoverChange: (url: string) => void;
  coverLabel: string;
  galleryItems: GalleryPhotoItem[];
  onGalleryChange: (items: GalleryPhotoItem[]) => void;
  albumLabel: string;
  captionFieldLabel: "Leyenda" | "Texto alternativo (Alt)";
  maxFiles: number;
}

/** Portada + álbum de fotos compartidos por los modales de servicio y proyecto. */
export const MediaFields: React.FC<MediaFieldsProps> = ({
  entity,
  entityId,
  coverImage,
  onCoverChange,
  coverLabel,
  galleryItems,
  onGalleryChange,
  albumLabel,
  captionFieldLabel,
  maxFiles,
}) => (
  <>
    <Box pt="2">
      <ImageUploadZone
        value={coverImage}
        onChange={onCoverChange}
        entity={entity}
        entityId={entityId}
        label={coverLabel}
        aspectRatio="16/9"
      />
    </Box>

    <Box pt="2">
      <AlbumGalleryUploader
        items={galleryItems}
        onChange={onGalleryChange}
        entity={entity}
        entityId={entityId}
        label={albumLabel}
        captionFieldLabel={captionFieldLabel}
        maxFiles={maxFiles}
      />
    </Box>
  </>
);
