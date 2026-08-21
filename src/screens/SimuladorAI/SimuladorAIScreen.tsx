"use client";

import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster-instance";
import {
  AI_SIMULATOR_PRODUCTS,
  AISimulatorProduct,
} from "@/features/ai-simulator/data/aiProducts";
import {
  Sparkles,
  UploadCloud,
  Image as ImageIcon,
  CheckCircle2,
  Send,
  ArrowRight,
  RefreshCw,
  Eye,
  Bot,
  Layers,
} from "lucide-react";
import Link from "next/link";

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
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "ai" | "user"; text: string }>>([
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
            {/* 1. SELECCIONAR PRODUCTO */}
            <Box
              bg="surface.card"
              p="6"
              borderRadius="2xl"
              border="1px solid"
              borderColor="border.glass"
              backdropFilter="blur(16px)"
            >
              <Heading size="md" mb="4" display="flex" alignItems="center" gap="2">
                <CheckCircle2 size={20} color="#38bdf8" /> 1. Selecciona el Producto a Proyectar
              </Heading>

              <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3">
                {AI_SIMULATOR_PRODUCTS.map((prod) => {
                  const isSelected = selectedProduct.id === prod.id;
                  return (
                    <Box
                      key={prod.id}
                      p="4"
                      borderRadius="xl"
                      border="2px solid"
                      borderColor={isSelected ? "blue.400" : "whiteAlpha.100"}
                      bg={isSelected ? "blue.500/10" : "surface.card"}
                      cursor="pointer"
                      onClick={() => {
                        setSelectedProduct(prod);
                      }}
                      transition="all 0.2s ease"
                      _hover={{ borderColor: "blue.300", transform: "translateY(-2px)" }}
                    >
                      <Text fontWeight="bold" fontSize="sm" color={isSelected ? "blue.300" : "white"}>
                        {prod.name}
                      </Text>
                      <Text fontSize="xs" color="text.muted" mt="1">
                        {prod.recommendedSpace}
                      </Text>
                    </Box>
                  );
                })}
              </SimpleGrid>
            </Box>

            {/* 2. SUBIR FOTO DEL ESPACIO REAL */}
            <Box
              bg="surface.card"
              p="6"
              borderRadius="2xl"
              border="1px solid"
              borderColor="border.glass"
              backdropFilter="blur(16px)"
            >
              <Heading size="md" mb="4" display="flex" alignItems="center" gap="2">
                <UploadCloud size={20} color="#38bdf8" /> 2. Sube la Foto de tu Espacio Real
              </Heading>

              {!userImage ? (
                <Box
                  border="2px dashed"
                  borderColor="whiteAlpha.300"
                  borderRadius="xl"
                  p="8"
                  textAlign="center"
                  position="relative"
                  cursor="pointer"
                  _hover={{ borderColor: "blue.400", bg: "whiteAlpha.50" }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0,
                      cursor: "pointer",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <Box display="inline-flex" p="4" bg="blue.500/10" color="blue.400" borderRadius="full" mb="3">
                    <ImageIcon size={32} />
                  </Box>
                  <Text fontWeight="bold" fontSize="md">
                    Haz clic aquí o arrastra la foto de tu sala/pared
                  </Text>
                  <Text fontSize="xs" color="text.muted" mt="1">
                    Formatos soportados: JPG, PNG, WEBP (Directo desde tu celular o galería)
                  </Text>
                </Box>
              ) : (
                <VStack align="stretch" gap="3">
                  {/* CANVAS COMPUESTO: FOTO DEL CLIENTE + PRODUCTO FUSIONADO */}
                  <Box
                    position="relative"
                    borderRadius="xl"
                    overflow="hidden"
                    border="2px solid"
                    borderColor={simulatedReady ? "purple.400" : "whiteAlpha.200"}
                    h="360px"
                    bg="#0f172a"
                  >
                    {/* 1. Fondo: Foto real del cliente */}
                    <img
                      src={userImage}
                      alt="Tu espacio real"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />

                    {/* 2. Capa IA: Producto renderizado superpuesto sobre la foto */}
                    {simulatedReady && (
                      <Box
                        position="absolute"
                        top={`${overlayPos.y}%`}
                        left={`${overlayPos.x}%`}
                        transform="translate(-50%, -50%)"
                        w={`${overlayScale}%`}
                        pointerEvents="none"
                        transition="all 0.1s ease"
                        style={{ opacity: overlayOpacity / 100 }}
                      >
                        <img
                          src={selectedProduct.previewImage}
                          alt={selectedProduct.name}
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "8px",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.5))",
                          }}
                        />
                        <Badge
                          position="absolute"
                          top="-10px"
                          right="-10px"
                          colorPalette="purple"
                          size="xs"
                        >
                          {selectedProduct.name}
                        </Badge>
                      </Box>
                    )}

                    {/* Botón flotante para cambiar foto */}
                    <HStack position="absolute" top="3" right="3" gap="2">
                      <Button
                        size="xs"
                        variant="subtle"
                        colorPalette="gray"
                        onClick={() => {
                          setUserImage(null);
                          setSimulatedReady(false);
                        }}
                      >
                        <RefreshCw size={12} style={{ marginRight: 4 }} /> Cambiar Foto
                      </Button>
                    </HStack>
                  </Box>

                  {/* CONTROLES DE AJUSTE SI LA SIMULACIÓN ESTÁ LISTA */}
                  {simulatedReady && (
                    <Box bg="surface.card" p="4" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100">
                      <Text fontSize="xs" fontWeight="bold" color="purple.300" mb="3" display="flex" alignItems="center" gap="1">
                        <Layers size={14} /> Controles de Calibración sobre tu Foto:
                      </Text>
                      <SimpleGrid columns={{ base: 1, sm: 3 }} gap="4" fontSize="xs">
                        <Box>
                          <Text color="text.muted" mb="1">Tamaño: {overlayScale}%</Text>
                          <input
                            type="range"
                            min="30"
                            max="100"
                            value={overlayScale}
                            onChange={(e) => setOverlayScale(Number(e.target.value))}
                            style={{ width: "100%" }}
                          />
                        </Box>
                        <Box>
                          <Text color="text.muted" mb="1">Posición Horizontal: {overlayPos.x}%</Text>
                          <input
                            type="range"
                            min="20"
                            max="80"
                            value={overlayPos.x}
                            onChange={(e) => setOverlayPos({ ...overlayPos, x: Number(e.target.value) })}
                            style={{ width: "100%" }}
                          />
                        </Box>
                        <Box>
                          <Text color="text.muted" mb="1">Posición Vertical: {overlayPos.y}%</Text>
                          <input
                            type="range"
                            min="20"
                            max="80"
                            value={overlayPos.y}
                            onChange={(e) => setOverlayPos({ ...overlayPos, y: Number(e.target.value) })}
                            style={{ width: "100%" }}
                          />
                        </Box>
                      </SimpleGrid>
                    </Box>
                  )}
                </VStack>
              )}

              <Button
                colorPalette="purple"
                size="lg"
                w="full"
                mt="5"
                onClick={handleGenerateSimulation}
                loading={isGenerating}
                display="flex"
                alignItems="center"
                gap="2"
              >
                <Sparkles size={20} /> Generar Simulación de Espacio con IA
              </Button>
            </Box>

            {/* BOTÓN COTIZAR TRAS LA SIMULACIÓN */}
            {simulatedReady && (
              <Box
                bg="surface.card"
                p="6"
                borderRadius="2xl"
                border="2px solid"
                borderColor="purple.400"
                boxShadow="0 10px 30px rgba(168, 85, 247, 0.2)"
              >
                <HStack justify="space-between" mb="3">
                  <Heading size="md" color="purple.300" display="flex" alignItems="center" gap="2">
                    <Eye size={20} /> Simulación Compuesta Lista
                  </Heading>
                  <Badge colorPalette="green">Listo para Cotizar</Badge>
                </HStack>
                <Text fontSize="sm" color="text.muted" mb="4">
                  ¿Te gusta cómo encaja {selectedProduct.name} en tu habitación? Puedes generar la cotización oficial ahora mismo.
                </Text>
                <Button asChild colorPalette="blue" w="full" size="lg">
                  <Link href="/presupuesto">
                    Cotizar este Sistema Exacto en PDF <ArrowRight size={18} />
                  </Link>
                </Button>
              </Box>
            )}
          </VStack>
        </Box>

        {/* COLUMNA DERECHA: ASISTENTE TÉCNICO VIRTUAL CON IA (5 cols) */}
        <Box gridColumn={{ base: "span 1", lg: "span 5" }}>
          <Box
            bg="surface.card"
            p="6"
            borderRadius="2xl"
            border="1px solid"
            borderColor="border.glass"
            backdropFilter="blur(16px)"
            h="full"
            display="flex"
            flexDirection="column"
          >
            <HStack gap="3" mb="4" pb="4" borderBottom="1px solid" borderColor="whiteAlpha.100">
              <Box p="2.5" bg="purple.500/20" color="purple.300" borderRadius="xl">
                <Bot size={24} />
              </Box>
              <Box>
                <Heading size="sm">Asistente de Diseño & Vidriería IA</Heading>
                <Text fontSize="xs" color="green.400">● En línea para responder dudas técnicas</Text>
              </Box>
            </HStack>

            {/* MENSAJES */}
            <VStack flex="1" gap="3" align="stretch" overflowY="auto" maxH="440px" pr="1" mb="4">
              {chatMessages.map((msg, idx) => (
                <Box
                  key={idx}
                  alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
                  bg={msg.sender === "user" ? "blue.600" : "whiteAlpha.100"}
                  color="white"
                  p="3.5"
                  borderRadius="2xl"
                  borderTopRightRadius={msg.sender === "user" ? "none" : "2xl"}
                  borderTopLeftRadius={msg.sender === "ai" ? "none" : "2xl"}
                  maxW="85%"
                  fontSize="sm"
                  lineHeight="relaxed"
                >
                  {msg.text}
                </Box>
              ))}
            </VStack>

            {/* INPUT DE CHAT */}
            <form onSubmit={handleSendChat}>
              <HStack gap="2">
                <input
                  type="text"
                  placeholder="Pregúntale a la IA sobre cristales, colores o precios..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    color: "white",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
                <Button type="submit" colorPalette="purple" size="md">
                  <Send size={16} />
                </Button>
              </HStack>
            </form>
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
