"use client";

import React from "react";
import { Box, Button, HStack, IconButton, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { Field } from "@/shared/ui/field";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { ServiceFaq } from "@/shared/api/firebase/types";

export interface FaqsEditorProps {
  faqs: ServiceFaq[];
  onChange: (faqs: ServiceFaq[]) => void;
}

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function moveFaq(list: ServiceFaq[], from: number, to: number): ServiceFaq[] {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

/** Editor de preguntas frecuentes ({ question, answer }) con contador de palabras. */
export const FaqsEditor: React.FC<FaqsEditorProps> = ({ faqs, onChange }) => {
  const handleAdd = () => {
    onChange([...faqs, { question: "", answer: "" }]);
  };

  const handleUpdate = (index: number, patch: Partial<ServiceFaq>) => {
    onChange(faqs.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const handleRemove = (index: number) => {
    onChange(faqs.filter((_, i) => i !== index));
  };

  return (
    <VStack align="stretch" gap="3">
      {faqs.length === 0 ? (
        <Box
          p="3"
          borderRadius="xl"
          border="1px dashed"
          borderColor="border.default"
          bg="bg.subtle"
        >
          <Text fontSize="xs" color="text.muted">
            Sin preguntas frecuentes registradas.
          </Text>
        </Box>
      ) : (
        <VStack align="stretch" gap="3">
          {faqs.map((faq, idx) => {
            const words = countWords(faq.answer);
            return (
              <Box
                key={idx}
                p="3"
                borderRadius="xl"
                border="1px solid"
                borderColor="border.default"
                bg="surface.card"
                transition="border-color 0.2s ease, background-color 0.2s ease"
              >
                <VStack align="stretch" gap="2.5">
                  <HStack justify="space-between" wrap="wrap" gap="2">
                    <Text fontSize="xs" fontWeight="semibold" color="text.heading">
                      Pregunta #{idx + 1}
                    </Text>
                    <HStack gap="1">
                      <IconButton
                        type="button"
                        aria-label={`Subir pregunta ${idx + 1}`}
                        size="sm"
                        minW="11"
                        minH="11"
                        variant="outline"
                        borderColor="border.subtle"
                        onClick={() => onChange(moveFaq(faqs, idx, idx - 1))}
                        disabled={idx === 0}
                      >
                        <ArrowUp size={14} style={{ flexShrink: 0 }} />
                      </IconButton>
                      <IconButton
                        type="button"
                        aria-label={`Bajar pregunta ${idx + 1}`}
                        size="sm"
                        minW="11"
                        minH="11"
                        variant="outline"
                        borderColor="border.subtle"
                        onClick={() => onChange(moveFaq(faqs, idx, idx + 1))}
                        disabled={idx === faqs.length - 1}
                      >
                        <ArrowDown size={14} style={{ flexShrink: 0 }} />
                      </IconButton>
                      <IconButton
                        type="button"
                        aria-label={`Eliminar pregunta ${idx + 1}`}
                        size="sm"
                        minW="11"
                        minH="11"
                        variant="ghost"
                        color="status.dangerText"
                        onClick={() => handleRemove(idx)}
                      >
                        <Trash2 size={14} style={{ flexShrink: 0 }} />
                      </IconButton>
                    </HStack>
                  </HStack>

                  <Field label="Pregunta">
                    <Input
                      size="sm"
                      placeholder="Ej. ¿Cuánto tiempo demora la instalación?"
                      value={faq.question}
                      onChange={(e) => handleUpdate(idx, { question: e.target.value })}
                    />
                  </Field>

                  <Field
                    label="Respuesta"
                    helperText={`${words} ${words === 1 ? "palabra" : "palabras"}`}
                  >
                    <Textarea
                      size="sm"
                      rows={3}
                      placeholder="Escribe una respuesta clara y directa para el cliente..."
                      value={faq.answer}
                      onChange={(e) => handleUpdate(idx, { answer: e.target.value })}
                    />
                  </Field>
                </VStack>
              </Box>
            );
          })}
        </VStack>
      )}

      <Box>
        <Button
          type="button"
          size="sm"
          minH="11"
          variant="outline"
          borderColor="border.default"
          onClick={handleAdd}
        >
          <Plus size={16} style={{ flexShrink: 0 }} />
          Agregar pregunta frecuente
        </Button>
      </Box>
    </VStack>
  );
};
