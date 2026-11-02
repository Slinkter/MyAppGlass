"use client";

import React from "react";
import { HStack } from "@chakra-ui/react";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface AdminRowActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

/**
 * Acciones de fila de las tablas de admin: Editar y Eliminar con las variantes del tema.
 * Eliminar solo usa el color de estado `red.500` sobre `outline` (sin `colorPalette`).
 */
const AdminRowActions: React.FC<AdminRowActionsProps> = ({ onEdit, onDelete }) => (
  <HStack justify="flex-end" gap="1.5">
    <Button size="xs" variant="outline" onClick={onEdit}>
      <Edit2 size={12} style={{ flexShrink: 0 }} />
      Editar
    </Button>
    <Button color="red.500" size="xs" variant="outline" onClick={onDelete}>
      <Trash2 size={12} style={{ flexShrink: 0 }} />
    </Button>
  </HStack>
);

export default AdminRowActions;
