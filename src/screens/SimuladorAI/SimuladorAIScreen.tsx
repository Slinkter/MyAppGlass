"use client";

import React, { useState } from "react";
import { Box, Heading, Text, VStack, HStack, SimpleGrid, Badge } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster-instance";
import { AI_SIMULATOR_PRODUCTS, AISimulatorProduct } from "@/features/ai-simulator/data/aiProducts";
import { Sparkles } from "lucide-react";
import { ProductSelector } from "./simulador/ProductSelector";
import { PhotoSimulationCard } from "./simulador/PhotoSimulationCard";
import { QuotePrompt } from "./simulador/QuotePrompt";
import { ChatAssistant, type ChatMessage } from "./simulador/ChatAssistant";

export const SimuladorAIScreen: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<AISimulatorProduct>(
    AI_SIMULATOR_PRODUCTS[0]
  );
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [simulatedReady, setSimulatedReady] = useState<boolean>(false);

  // Parámetros interactivos del objeto superpuesto sobre la foto del cliente
  const [overlayPos, setOverlayPos] = useState({ x: 50, y: 50 }); // porcentajes
  const [overlayScale, setOverlayScale] = useState(65); // porcentaje
  const [overlayOpacity] = useState(90);

  // Estado del chat con la IA Asesora
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: "ai",
      text: "¡Hola! Soy tu Asesor Virtual de Glass & Aluminum Company. Sube una foto de tu sala o balcón, selecciona una de nuestras mamparas o ventanas y la colocaremos en tu propio espacio.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
        setSimulatedReady(false);
        toaster.create({
          title: "Foto de tu espacio cargada",
          description: "Ahora haz clic en 'Generar Simulación con IA' para fusionar el producto sobre tu pared.",
          type: "success",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateSimulation = () => {
    if (!userImage) {
      toaster.create({
        title: "Sube una foto de tu espacio",
        description: "Por favor carga una foto de tu sala o pared para fusionar el producto.",
        type: "warning",
      });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setSimulatedReady(true);
      toaster.create({
        title: "¡Simulación Completada con Éxito!",
        description: `Se ha insertado "${selectedProduct.name}" sobre tu espacio real. Puedes ajustar su posición y tamaño.`,
        type: "success",
      });

      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `¡Listo! Hemos renderizado ${selectedProduct.name} sobre tu foto. Puedes moverla y redimensionarla con los controles interactivos para ver cómo encaja en tu vano de obra.`,
        },
      ]);
    }, 1800);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");

    setTimeout(() => {
      let reply = "Para este espacio te recomendamos cristal templado de 8mm o 10mm para garantizar la máxima seguridad e iluminación.";
      if (userText.toLowerCase().includes("precio") || userText.toLowerCase().includes("costo") || userText.toLowerCase().includes("cotizar")) {
        reply = `Puedes cotizar este sistema de inmediato en la sección Presupuesto con hoja membretada PDF o escribirnos al WhatsApp oficial 974 278 303.`;
      } else if (userText.toLowerCase().includes("color") || userText.toLowerCase().includes("aluminio")) {
        reply = `Disponemos de aluminio en Negro Mate Anodizado, Natural Mate, Blanco Esmaltado y Champagne Titanio.`;
      }

      setChatMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 800);
  };

  return (
    <Box py="10" maxW="1280px" mx="auto" px={{ base: "4", md: "6" }}>
      {/* CABECERA */}
      <VStack gap="2" align="start" mb="8">
        <HStack gap="2">
          <Badge colorPalette="purple" variant="subtle" px="3" py="1" borderRadius="full">
            <Sparkles size={14} style={{ marginRight: 4 }} /> Generador de Espacios con IA (Inpainting)
          </Badge>
          <Badge colorPalette="blue" variant="subtle" px="3" py="1" borderRadius="full">
            Composición Interactiva
          </Badge>
        </HStack>
        <Heading size="2xl" color="brand.primary">
          Simulador Visual con Inteligencia Artificial
        </Heading>
        <Text color="text.muted" maxW="800px">
          Sube la foto de tu sala, balcón o pared, selecciona una mampara o ventana de nuestro catálogo y la IA la proyectará directamente sobre tu foto real.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, lg: 12 }} gap="8">
        {/* COLUMNA IZQUIERDA: CONFIGURACIÓN Y SUBIDA DE FOTO (7 cols) */}
        <Box gridColumn={{ base: "span 1", lg: "span 7" }}>
          <VStack gap="6" align="stretch">
            <ProductSelector selectedProduct={selectedProduct} onSelect={setSelectedProduct} />
            <PhotoSimulationCard
              selectedProduct={selectedProduct}
              userImage={userImage}
              setUserImage={setUserImage}
              isGenerating={isGenerating}
              simulatedReady={simulatedReady}
              setSimulatedReady={setSimulatedReady}
              overlayPos={overlayPos}
              setOverlayPos={setOverlayPos}
              overlayScale={overlayScale}
              setOverlayScale={setOverlayScale}
              overlayOpacity={overlayOpacity}
              handleImageUpload={handleImageUpload}
              handleGenerateSimulation={handleGenerateSimulation}
            />
            {simulatedReady && <QuotePrompt selectedProduct={selectedProduct} />}
          </VStack>
        </Box>

        <Box gridColumn={{ base: "span 1", lg: "span 5" }}>
          <ChatAssistant
            chatMessages={chatMessages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            handleSendChat={handleSendChat}
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};
