"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Text,

  SimpleGrid,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Smartphone, QrCode, Camera, Video } from "lucide-react";

import { ThreeCanvas, AluminumFinish, GlassTint } from "./ThreeCanvas";
import { WebARLiveCameraModal } from "./WebARLiveCameraModal";
import { companyData } from "@/shared/config/company-data";

const ALUMINUM_OPTIONS: AluminumFinish[] = [
  { id: "blanco", name: "Blanco Electropintado", hex: "#f8fafc", metalness: 0.25, roughness: 0.35 },
  { id: "negro", name: "Negro Mate", hex: "#1e293b", metalness: 0.85, roughness: 0.3 },
  { id: "natural", name: "Natural Anodizado", hex: "#cbd5e1", metalness: 0.95, roughness: 0.2 },
  { id: "champagne", name: "Champagne / Bronce", hex: "#b45309", metalness: 0.9, roughness: 0.25 },
];

const GLASS_OPTIONS: GlassTint[] = [
  { id: "incoloro", name: "Incoloro Transparente", color: 0xebf4ff, transmission: 0.95, opacity: 0.3, roughness: 0.02 },
  { id: "bronce", name: "Bronce Cálido", color: 0xd97706, transmission: 0.75, opacity: 0.55, roughness: 0.05 },
  { id: "gris", name: "Gris Humo / Antelio", color: 0x475569, transmission: 0.7, opacity: 0.65, roughness: 0.05 },
  { id: "satinado", name: "Satinado / Arenado", color: 0xe2e8f0, transmission: 0.4, opacity: 0.85, roughness: 0.15 },
];

const VARIANT_OPTIONS = [
  { id: "corrediza", label: "Corredizo" },
  { id: "fija", label: "Fijo" },
  { id: "proyectante", label: "Proyectante" },
  { id: "pivotante", label: "Pivotante" },
  { id: "piso-techo-pivot", label: "Piso a Techo" },
  { id: "celosias", label: "Celosía" },
];

import { GalleryItem3DConfig } from "@/shared/types/gallery";

interface AuraARViewerProps {
  title?: string;
  category?: string;
  glbModelUrl?: string;
  usdzModelUrl?: string;
  posterUrl?: string;
  initialConfig3D?: GalleryItem3DConfig;
}

export const AuraARViewer: React.FC<AuraARViewerProps> = ({
  title = "Mampara Corrediza Serie 25 (Vidrio Templado)",
  category = "Mamparas & Terrazas",
  glbModelUrl = "/models/mampara/default.glb",
  usdzModelUrl = "/models/mampara/default.glb",
  posterUrl: _posterUrl,
  initialConfig3D,
}) => {
  const [showLiveWebAR, setShowLiveWebAR] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "desktop">("desktop");

  const [selectedVariant, setSelectedVariant] = useState<
    "corrediza" | "fija" | "proyectante" | "pivotante" | "piso-techo-pivot" | "celosias"
  >(initialConfig3D?.systemVariant || "corrediza");
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [numSashes, setNumSashes] = useState<2 | 4>(initialConfig3D?.numSashes || 2);
  const [customWidth, setCustomWidth] = useState<number>(2.0);
  const [customHeight, setCustomHeight] = useState<number>(1.4);
  const [selectedAluminum, setSelectedAluminum] = useState<AluminumFinish>(
    ALUMINUM_OPTIONS.find((a) => a.id === initialConfig3D?.aluminumId) || ALUMINUM_OPTIONS[0]
  );
  const [selectedGlass, setSelectedGlass] = useState<GlassTint>(
    GLASS_OPTIONS.find((g) => g.id === initialConfig3D?.glassId) || GLASS_OPTIONS[0]
  );

  useEffect(() => {
    if (initialConfig3D) {
      if (initialConfig3D.systemVariant) setSelectedVariant(initialConfig3D.systemVariant);
      if (initialConfig3D.numSashes) setNumSashes(initialConfig3D.numSashes);
      if (initialConfig3D.aluminumId) {
        const found = ALUMINUM_OPTIONS.find((a) => a.id === initialConfig3D.aluminumId);
        if (found) setSelectedAluminum(found);
      }
      if (initialConfig3D.glassId) {
        const found = GLASS_OPTIONS.find((g) => g.id === initialConfig3D.glassId);
        if (found) setSelectedGlass(found);
      }
    }
  }, [initialConfig3D]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
      const ua = navigator.userAgent;
      if (/iPhone|iPad|iPod/i.test(ua)) setDeviceType("ios");
      else if (/Android/i.test(ua)) setDeviceType("android");
      else setDeviceType("desktop");
    }
  }, []);

  const getSystemType = (): string => {
    const t = `${title} ${category}`.toLowerCase();
    if (t.includes("ventana")) return "ventana";
    if (t.includes("ducha")) return "ducha";
    if (t.includes("techo") || t.includes("cobertura") || t.includes("policarbonato")) return "techo";
    if (t.includes("parapeto")) return "parapeto";
    if (t.includes("baranda") || t.includes("escalera")) return "baranda";
    if (t.includes("balcon")) return "balcones";
    if (t.includes("puerta de vidrio") || t.includes("pvidrio") || t.includes("pivotante")) return "pvidrio";
    if (t.includes("puerta de aluminio") || t.includes("pserie") || t.includes("puerta serie")) return "pserie";
    if (t.includes("celosia") || t.includes("ventilacion")) return "celosias";
    return "mampara";
  };

  const currentSystem = getSystemType();
  const showVariant = currentSystem === "ventana";

  const handleLaunchAR = () => {
    if (typeof window === "undefined") return;

    if (deviceType === "ios") {
      const absoluteUsdz = usdzModelUrl.startsWith("http")
        ? usdzModelUrl
        : `${window.location.origin}${usdzModelUrl}`;
      const anchor = document.createElement("a");
      anchor.setAttribute("rel", "ar");
      anchor.appendChild(document.createElement("img"));
      anchor.setAttribute("href", absoluteUsdz);
      anchor.click();
    } else if (deviceType === "android") {
      const absoluteGlb = glbModelUrl.startsWith("http")
        ? glbModelUrl
        : `${window.location.origin}${glbModelUrl}`;
      const sceneViewerUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(
        absoluteGlb
      )}&mode=ar_preferred&title=${encodeURIComponent(
        title
      )}&resizable=true#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;end;`;
      window.location.href = sceneViewerUrl;
    } else {
      setShowQR(!showQR);
    }
  };

  const qrImageUrl = currentUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&data=${encodeURIComponent(currentUrl)}`
    : "";

  return (
    <Box
      w="full"
      bg="surface.card"
      borderRadius="2xl"
      p={{ base: "5", md: "8" }}
      border="1px solid"
      borderColor="border.glass"
      backdropFilter="blur(16px)"
      boxShadow="0 20px 40px rgba(0,0,0,0.2)"
    >
      <SimpleGrid columns={{ base: 1, lg: 12 }} gap="6" alignItems="stretch">
        {/* PANEL IZQUIERDO: Configuración */}
        <Box
          gridColumn={{ base: "span 1", lg: "span 5" }}
          display="flex"
          flexDirection="column"
          p="5"
          bg="rgba(255, 255, 255, 0.03)"
          backdropFilter="blur(16px)"
          borderRadius="2xl"
          border="1px solid"
          borderColor="border.glass"
          boxShadow="0 10px 30px rgba(0,0,0,0.15)"
          gap="4"
          overflowY="auto"
        >
          {/* Tipo de Apertura (solo ventana) */}
          {showVariant && (
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
                Tipo de Apertura
              </Text>
              <SimpleGrid columns={3} gap="1.5">
                {VARIANT_OPTIONS.map((v) => {
                  const isSelected = selectedVariant === v.id;
                  return (
                    <Button
                      key={v.id}
                      size="xs"
                      variant={isSelected ? "aura" : "outline"}
                      borderRadius="lg"
                      h="8"
                      w="full"
                      fontSize="2xs"
                      fontWeight={isSelected ? "bold" : "medium"}
                      justifyContent="center"
                      px="1"
                      onClick={() => {
                        setSelectedVariant(v.id as typeof selectedVariant);
                        if (v.id === "piso-techo-pivot") { setCustomWidth(1.15); setCustomHeight(2.45); }
                        else if (v.id === "fija") { setCustomWidth(1.80); setCustomHeight(1.40); }
                        else if (v.id === "proyectante") { setCustomWidth(1.40); setCustomHeight(1.20); }
                        else if (v.id === "pivotante") { setCustomWidth(1.50); setCustomHeight(1.50); }
                        else if (v.id === "corrediza") { setCustomWidth(2.00); setCustomHeight(1.40); }
                      }}
                    >
                      <Text truncate>{v.label}</Text>
                    </Button>
                  );
                })}
              </SimpleGrid>
            </Box>
          )}

          {/* Hojas (solo corrediza + ventana) */}
          {showVariant && selectedVariant === "corrediza" && (
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
                Hojas Corredizas
              </Text>
              <SimpleGrid columns={2} gap="1.5">
                <Button
                  size="xs"
                  variant={numSashes === 2 ? "aura" : "outline"}
                  borderRadius="lg"
                  h="8"
                  onClick={() => setNumSashes(2)}
                >
                  2 Hojas (OX)
                </Button>
                <Button
                  size="xs"
                  variant={numSashes === 4 ? "aura" : "outline"}
                  borderRadius="lg"
                  h="8"
                  onClick={() => setNumSashes(4)}
                >
                  4 Hojas (OXXO)
                </Button>
              </SimpleGrid>
            </Box>
          )}

          {/* Aluminio */}
          <Box>
            <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
              Color de Aluminio
            </Text>
            <SimpleGrid columns={4} gap="1.5">
              {ALUMINUM_OPTIONS.map((al) => {
                const isSelected = selectedAluminum.id === al.id;
                return (
                  <Flex
                    key={al.id}
                    as="button"
                    onClick={() => setSelectedAluminum(al)}
                    direction="column"
                    align="center"
                    justify="center"
                    gap="1"
                    p="1.5"
                    borderRadius="lg"
                    borderWidth={isSelected ? "2px" : "1px"}
                    borderColor={isSelected ? "primary.500" : "border.default"}
                    bg={isSelected ? "bg.subtle" : "transparent"}
                    cursor="pointer"
                    transition="all 0.2s ease"
                    _hover={{ borderColor: "primary.500" }}
                  >
                    <Box w="5" h="5" borderRadius="full" bg={al.hex} border="1px solid rgba(0,0,0,0.2)" boxShadow="sm" />
                    <Text fontSize="2xs" fontWeight={isSelected ? "bold" : "medium"} color="text.heading" truncate w="full" textAlign="center">
                      {al.name.split(" ")[0]}
                    </Text>
                  </Flex>
                );
              })}
            </SimpleGrid>
          </Box>

          {/* Vidrio */}
          <Box>
            <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
              Color de Vidrio
            </Text>
            <SimpleGrid columns={4} gap="1.5">
              {GLASS_OPTIONS.map((gl) => {
                const isSelected = selectedGlass.id === gl.id;
                return (
                  <Flex
                    key={gl.id}
                    as="button"
                    onClick={() => setSelectedGlass(gl)}
                    direction="column"
                    align="center"
                    justify="center"
                    gap="1"
                    p="1.5"
                    borderRadius="lg"
                    borderWidth={isSelected ? "2px" : "1px"}
                    borderColor={isSelected ? "primary.500" : "border.default"}
                    bg={isSelected ? "bg.subtle" : "transparent"}
                    cursor="pointer"
                    transition="all 0.2s ease"
                    _hover={{ borderColor: "primary.500" }}
                  >
                    <Box w="5" h="5" borderRadius="full" bg={gl.color === 0xebf4ff ? "#E8F4F8" : gl.color === 0xd97706 ? "#D97706" : gl.color === 0x475569 ? "#475569" : "#E2E8F0"} border="1px solid" borderColor="border.default" />
                    <Text fontSize="2xs" fontWeight={isSelected ? "bold" : "medium"} color="text.heading" truncate w="full" textAlign="center">
                      {gl.name.split(" ")[0]}
                    </Text>
                  </Flex>
                );
              })}
            </SimpleGrid>
          </Box>

          {/* Dimensiones */}
          <Box>
            <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
              Dimensiones
            </Text>
            <SimpleGrid columns={4} gap="1" mb="2">
              {[
                { w: 1.20, h: 1.00, label: "1.2×1.0" },
                { w: 1.50, h: 1.20, label: "1.5×1.2" },
                { w: 2.00, h: 1.40, label: "2.0×1.4" },
                { w: 2.40, h: 2.20, label: "2.4×2.2" },
              ].map((pre) => {
                const isSelected = Math.abs(customWidth - pre.w) < 0.01 && Math.abs(customHeight - pre.h) < 0.01;
                return (
                  <Button
                    key={pre.label}
                    size="2xs"
                    variant={isSelected ? "aura" : "outline"}
                    borderRadius="md"
                    h="6"
                    fontSize="9px"
                    onClick={() => { setCustomWidth(pre.w); setCustomHeight(pre.h); }}
                  >
                    {pre.label}
                  </Button>
                );
              })}
            </SimpleGrid>
            <SimpleGrid columns={2} gap="2">
              <Box>
                <Flex justify="space-between" align="center" mb="0.5">
                  <Text fontSize="9px" color="text.muted">Ancho</Text>
                  <Text fontSize="8px" color="text.muted">{customWidth.toFixed(2)}m</Text>
                </Flex>
                <input
                  type="range"
                  min="0.80"
                  max="3.50"
                  step="0.05"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(parseFloat(e.target.value))}
                  style={{ width: "100%", accentColor: "#3b82f6", cursor: "pointer" }}
                />
              </Box>
              <Box>
                <Flex justify="space-between" align="center" mb="0.5">
                  <Text fontSize="9px" color="text.muted">Alto</Text>
                  <Text fontSize="8px" color="text.muted">{customHeight.toFixed(2)}m</Text>
                </Flex>
                <input
                  type="range"
                  min="0.60"
                  max="2.60"
                  step="0.05"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(parseFloat(e.target.value))}
                  style={{ width: "100%", accentColor: "#3b82f6", cursor: "pointer" }}
                />
              </Box>
            </SimpleGrid>
          </Box>
        </Box>

        {/* PANEL DERECHO: Render 3D + Descripción */}
        <Box
          gridColumn={{ base: "span 1", lg: "span 7" }}
          display="flex"
          flexDirection="column"
          gap="4"
        >
          {/* VISOR 3D */}
          <Box
            position="relative"
            h={{ base: "340px", sm: "380px", md: "460px" }}
            bg="bg.page"
            borderRadius="2xl"
            border="1px solid"
            borderColor="border.subtle"
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThreeCanvas
              systemType={currentSystem}
              systemVariant={selectedVariant}
              autoRotate={isAutoRotating}
              rotationSpeed={0.002}
              customWidth={customWidth}
              customHeight={customHeight}
              height="100%"
              numSashes={numSashes}
              aluminumFinish={selectedAluminum}
              glassTint={selectedGlass}
            />

            <Flex
              position="absolute"
              top="3"
              right="3"
              direction="column"
              gap="1.5"
              zIndex="10"
            >
              <IconButton
                aria-label={isAutoRotating ? "Pausar giro" : "Activar giro"}
                title={isAutoRotating ? "Pausar Giro 360°" : "Activar Giro 360°"}
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                bg={isAutoRotating ? "primary.500" : "surface.card"}
                borderRadius="lg"
                boxShadow="sm"
                color={isAutoRotating ? "white" : "text.body"}
                size="xs"
                h="7"
                w="7"
                borderWidth="1px"
                borderColor={isAutoRotating ? "primary.500" : "border.default"}
                _hover={{ bg: isAutoRotating ? "primary.600" : "bg.subtle" }}
              >
                <Video size={13} />
              </IconButton>
            </Flex>
          </Box>

          {/* Descripción de la configuración */}
          <Box
            p="5"
            bg="rgba(255, 255, 255, 0.03)"
            backdropFilter="blur(16px)"
            borderRadius="2xl"
            border="1px solid"
            borderColor="border.glass"
          >
            <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="3">
              Configuración Actual
            </Text>
            <Text fontSize="sm" color="text.body" lineHeight="tall">
              {title} — Dimensiones: <strong>{customWidth.toFixed(2)}m × {customHeight.toFixed(2)}m</strong> ({(customWidth * customHeight).toFixed(2)} m²),
              perfil de aluminio <strong>{selectedAluminum.name.split(" ")[0]}</strong> y cristal <strong>{selectedGlass.name.split(" ")[0]}</strong>.
            </Text>
          </Box>

          {/* CTA */}
          <SimpleGrid columns={{ base: 1, sm: 2 }} gap="2">
            <Button
              colorPalette="blue"
              size="sm"
              w="full"
              onClick={() => setShowLiveWebAR(true)}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="2"
              fontWeight="bold"
            >
              <Camera size={14} /> Proyectar en tu Pared (WebAR)
            </Button>
            <a
              href={`https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
                `Hola GYA Company, configuré esta estructura en su simulador 3D:\n• ${title}\n• Medidas: ${customWidth.toFixed(2)}m × ${customHeight.toFixed(2)}m (${(customWidth * customHeight).toFixed(2)} m²)\n• Aluminio: ${selectedAluminum.name}\n• Cristal: ${selectedGlass.name}\n¿Podrían brindarme una cotización a medida?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%", textDecoration: "none" }}
            >
              <Button
                variant="solid"
                bg="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                color="white"
                size="sm"
                w="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="2"
                fontWeight="bold"
              >
                Cotizar por WhatsApp
              </Button>
            </a>
          </SimpleGrid>

          {/* QR / AR按钮 */}
          <Button
            variant="ghost"
            size="xs"
            w="full"
            onClick={handleLaunchAR}
            color="text.muted"
            _hover={{ color: "text.heading" }}
          >
            {deviceType === "desktop" ? (
              <>
                <QrCode size={14} style={{ marginRight: 6 }} /> Abrir Código QR para Escaneo Móvil
              </>
            ) : (
              <>
                <Smartphone size={14} style={{ marginRight: 6 }} />
                {deviceType === "android"
                  ? "Abrir Google Scene Viewer (ARCore)"
                  : "Abrir Apple Quick Look (USDZ)"}
              </>
            )}
          </Button>

          {showQR && qrImageUrl && (
            <Box p="4" bg="surface.card" borderRadius="xl" border="1px solid" borderColor="border.glass" textAlign="center">
              <Text fontSize="xs" fontWeight="bold" color="text.heading" mb="2">
                Escanea con la cámara de tu iPhone o Android:
              </Text>
              <Box display="inline-block" p="3" bg="white" borderRadius="xl" boxShadow="md">
                <img src={qrImageUrl} alt={`Código QR AR para ${title}`} width={180} height={180} style={{ borderRadius: "8px", display: "block" }} />
              </Box>
              <Text fontSize="2xs" color="text.muted" mt="2">
                Abre la cámara de tu teléfono para apuntar al código y activar la vista AR en tu sala.
              </Text>
            </Box>
          )}
        </Box>
      </SimpleGrid>

      <WebARLiveCameraModal
        isOpen={showLiveWebAR}
        onClose={() => setShowLiveWebAR(false)}
        title={title}
        category={category}
        glbModelUrl={glbModelUrl}
        usdzModelUrl={usdzModelUrl}
        initialSystemType={getSystemType()}
      />
    </Box>
  );
};
