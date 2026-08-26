"use client";

/**
 * ServiceConfigurator3DCard
 *
 * Visor 3D interactivo genérico para los 10 servicios de GYA Company.
 * Sigue EXACTAMENTE la misma estructura visual y de código que VentanaConfigurador3DCard:
 *   - Box exterior con p={{ base:"5", md:"8" }} + mismos estilos de card
 *   - SimpleGrid 12 columnas: span 5 (config) | span 7 (visor 3D)
 *   - Descripción de configuración actual (sin botón WhatsApp dentro)
 *   - Infraestructura Three.js → hook `use3DViewer`
 *   - Geometría procedural → `buildServiceModel()` de serviceGeometries.ts
 */

import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    Flex,
    IconButton,
    Text,
    SimpleGrid,
    Input,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import * as THREE from "three";
import { RotateCcw, DoorOpen } from "lucide-react";
import { companyData } from "@/shared/config/company-data";
import { use3DViewer } from "./configurador3d/use3DViewer";
import { buildServiceModel } from "./configurador3d/serviceGeometries";

// ── Paletas (mismas que VentanaConfigurador3DCard) ───────────────────────────

const ALUMINUM_FINISHES = [
    { id: "negro",     label: "Negro",     color: "#1A1A1A" },
    { id: "natural",   label: "Natural",   color: "#B0B4B8" },
    { id: "blanco",    label: "Blanco",    color: "#F8F9FA" },
    { id: "champagne", label: "Champagne", color: "#C4A265" },
    { id: "madera",    label: "Madera",    color: "#8A5A36" },
];

const GLASS_COLORS = [
    { id: "incoloro", label: "Incoloro", hex: "#E8F4F8" },
    { id: "bronce",   label: "Bronce",   hex: "#8A5A36" },
    { id: "gris",     label: "Gris",     hex: "#4B5563" },
    { id: "satinado", label: "Satinado", hex: "#D1D5DB" },
];

const WOOD_FINISHES = [
    { id: "teca",  label: "Teca",  color: "#8A4A21" },
    { id: "nogal", label: "Nogal", color: "#3D2314" },
    { id: "roble", label: "Roble", color: "#C68B59" },
    { id: "negro", label: "Negro", color: "#1A1A1A" },
];

const POLYCARBONATE_TYPES = [
    { id: "bronce",       label: "Bronce",       color: "#8A5229" },
    { id: "opalino",      label: "Opalino",      color: "#F0F4F8" },
    { id: "transparente", label: "Transparente", color: "#E2F1FF" },
    { id: "humo",         label: "Humo",         color: "#2A2E33" },
];

// ── Props ─────────────────────────────────────────────────────────────────────

interface ServiceConfigurator3DCardProps {
    serviceSlug: string;
    title?: string;
}

// ── Configuración de cámara por tipo de servicio ──────────────────────────────
function getCameraOpts(slug: string) {
    if (slug === "techo")
        return { cameraRadius: 7, cameraPolarDeg: 45, cameraAzimuthDeg: 35, minDistance: 2, maxDistance: 14 };
    if (["baranda", "balcones", "parapeto"].includes(slug))
        return { cameraRadius: 5, cameraPolarDeg: 60, cameraAzimuthDeg: 35, minDistance: 1.5, maxDistance: 10 };
    return { cameraRadius: 4.5, cameraPolarDeg: 55, cameraAzimuthDeg: 35, minDistance: 1.5, maxDistance: 9 };
}

// ── Componente ────────────────────────────────────────────────────────────────

export const ServiceConfigurator3DCard: React.FC<ServiceConfigurator3DCardProps> = ({
    serviceSlug,
    title,
}) => {
    // ── Estado de configuración ───────────────────────────────────────────────
    const [aluminum,   setAluminum]   = useState("negro");
    const [glassColor, setGlassColor] = useState("incoloro");
    const [wood,       setWood]       = useState("teca");
    const [poly,       setPoly]       = useState("bronce");
    const [widthM,     setWidthM]     = useState(2.0);
    const [heightM,    setHeightM]    = useState(2.2);
    const [autoRotate, setAutoRotate] = useState(true);

    // ── Derivados del slug ────────────────────────────────────────────────────
    const isTecho  = serviceSlug === "techo";
    const hasGlass = ["mampara","ducha","baranda","balcones","parapeto","pvidrio"].includes(serviceSlug);

    // Etiquetas para la descripción de configuración actual
    const currentAluLabel  = ALUMINUM_FINISHES.find((a) => a.id === aluminum)?.label  ?? "Negro";
    const currentGlassLabel = GLASS_COLORS.find((g) => g.id === glassColor)?.label    ?? "Incoloro";
    const currentWoodLabel  = WOOD_FINISHES.find((w) => w.id === wood)?.label          ?? "Teca";
    const currentPolyLabel  = POLYCARBONATE_TYPES.find((p) => p.id === poly)?.label   ?? "Bronce";

    // ── Hook de infraestructura Three.js ──────────────────────────────────────
    const {
        canvasRef,
        sceneRef,
        modelGroupRef,
        autoRotateRef,
        initScene,
        cleanup,
        resetCamera: resetCameraBase,
    } = use3DViewer();

    // Sincronizar autoRotate (ref ← state) sin re-inicializar la escena
    useEffect(() => { autoRotateRef.current = autoRotate; }, [autoRotate, autoRotateRef]);

    // ── buildModel — limpia y reconstruye la geometría procedural ─────────────
    const buildModel = useCallback(() => {
        if (!modelGroupRef.current || !sceneRef.current) return;

        // Limpiar geometrías anteriores
        while (modelGroupRef.current.children.length > 0) {
            const child = modelGroupRef.current.children[0];
            modelGroupRef.current.remove(child);
            child.traverse((obj) => {
                if (obj instanceof THREE.Mesh) {
                    obj.geometry?.dispose();
                    if (Array.isArray(obj.material)) {
                        obj.material.forEach((m) => m.dispose());
                    } else {
                        obj.material?.dispose();
                    }
                }
            });
        }

        // Construir geometría procedural (sin archivos .glb)
        const model = buildServiceModel({ serviceSlug, widthM, heightM, aluminum, glassColor, wood, poly });

        model.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
                obj.castShadow    = true;
                obj.receiveShadow = true;
            }
        });

        // Centrar en X/Z, apoyar base en Y = 0
        const box3   = new THREE.Box3().setFromObject(model);
        const center = box3.getCenter(new THREE.Vector3());
        model.position.set(-center.x, -box3.min.y, -center.z);

        modelGroupRef.current.add(model);
    }, [serviceSlug, widthM, heightM, aluminum, glassColor, wood, poly, modelGroupRef, sceneRef]);

    // ── Ciclo de vida — idéntico a VentanaConfigurador3DCard ─────────────────
    useEffect(() => {
        const opts = getCameraOpts(serviceSlug);
        const timer = setTimeout(() => {
            initScene(opts);
            buildModel();
        }, 60);
        return () => { clearTimeout(timer); cleanup(); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceSlug]);

    // Rebuild al cambiar configuración (escena ya inicializada)
    useEffect(() => { buildModel(); }, [buildModel]);

    // ── Reset cámara ──────────────────────────────────────────────────────────
    const resetCamera = useCallback(() => {
        const { cameraRadius, cameraPolarDeg, cameraAzimuthDeg } = getCameraOpts(serviceSlug);
        resetCameraBase({ cameraRadius, polarDeg: cameraPolarDeg, azimuthDeg: cameraAzimuthDeg });
    }, [serviceSlug, resetCameraBase]);

    // ── JSX — estructura idéntica a VentanaConfigurador3DCard ─────────────────
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

                {/* ══ PANEL IZQUIERDO: Configuración (span 5) ══ */}
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
                    {/* Techo: Acabado de estructura */}
                    {isTecho && (
                        <Box>
                            <Label>Acabado de Estructura</Label>
                            <SimpleGrid columns={2} gap="1.5">
                                {WOOD_FINISHES.map((w) => (
                                    <SwatchBtn
                                        key={w.id}
                                        label={w.label}
                                        color={w.color}
                                        selected={wood === w.id}
                                        onClick={() => setWood(w.id)}
                                    />
                                ))}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* Techo: Cubierta de policarbonato */}
                    {isTecho && (
                        <Box>
                            <Label>Cubierta de Policarbonato</Label>
                            <SimpleGrid columns={2} gap="1.5">
                                {POLYCARBONATE_TYPES.map((p) => (
                                    <SwatchBtn
                                        key={p.id}
                                        label={p.label}
                                        color={p.color}
                                        selected={poly === p.id}
                                        onClick={() => setPoly(p.id)}
                                    />
                                ))}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* No-techo: Color de aluminio */}
                    {!isTecho && (
                        <Box>
                            <Label>Color de Aluminio</Label>
                            <SimpleGrid columns={5} gap="1.5">
                                {ALUMINUM_FINISHES.map((a) => (
                                    <SwatchBtn
                                        key={a.id}
                                        label={a.label}
                                        color={a.color}
                                        selected={aluminum === a.id}
                                        onClick={() => setAluminum(a.id)}
                                    />
                                ))}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* Color de vidrio (servicios con vidrio) */}
                    {hasGlass && (
                        <Box>
                            <Label>Color de Vidrio</Label>
                            <SimpleGrid columns={5} gap="1.5">
                                {GLASS_COLORS.map((g) => (
                                    <SwatchBtn
                                        key={g.id}
                                        label={g.label}
                                        color={g.hex}
                                        selected={glassColor === g.id}
                                        onClick={() => setGlassColor(g.id)}
                                    />
                                ))}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* Dimensiones */}
                    <Box>
                        <Label>Dimensiones (m)</Label>
                        <SimpleGrid columns={2} gap="2">
                            <Box>
                                <Text fontSize="9px" color="text.muted" mb="0.5">Ancho</Text>
                                <Input
                                    type="number"
                                    value={widthM}
                                    min={0.5} max={8} step={0.1}
                                    onChange={(e) => {
                                        const v = parseFloat(e.target.value);
                                        if (!isNaN(v) && v >= 0.5 && v <= 8) setWidthM(v);
                                    }}
                                    size="xs" h="7" borderRadius="lg"
                                />
                            </Box>
                            <Box>
                                <Text fontSize="9px" color="text.muted" mb="0.5">
                                    {isTecho ? "Largo (Proyección)" : "Alto"}
                                </Text>
                                <Input
                                    type="number"
                                    value={heightM}
                                    min={0.5} max={6} step={0.1}
                                    onChange={(e) => {
                                        const v = parseFloat(e.target.value);
                                        if (!isNaN(v) && v >= 0.5 && v <= 6) setHeightM(v);
                                    }}
                                    size="xs" h="7" borderRadius="lg"
                                />
                            </Box>
                        </SimpleGrid>
                    </Box>

                    {/* CTA WhatsApp — mismo lugar que en Ventana (dentro del panel izq) */}
                    <Box mt="auto" pt="2">
                        <Button
                            variant="solid"
                            bg="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                            color="white"
                            size="sm"
                            w="full"
                            fontWeight="bold"
                            onClick={() => {
                                const desc = isTecho
                                    ? `${title ?? serviceSlug} — Estructura ${currentWoodLabel}, policarbonato ${currentPolyLabel}, ${widthM.toFixed(1)}m × ${heightM.toFixed(1)}m`
                                    : `${title ?? serviceSlug} — Aluminio ${currentAluLabel}, cristal ${currentGlassLabel}, ${widthM.toFixed(1)}m × ${heightM.toFixed(1)}m`;
                                window.open(
                                    `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(`Hola GYA Company, estoy interesado en:\n${desc}\n¿Podrían brindarme una cotización?`)}`,
                                    "_blank",
                                );
                            }}
                        >
                            Cotizar por WhatsApp
                        </Button>
                    </Box>
                </Box>

                {/* ══ PANEL DERECHO: Render 3D + Descripción (span 7) ══ */}
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
                        {/* Canvas Three.js */}
                        <Box
                            ref={canvasRef}
                            w="full" h="full"
                            cursor="grab"
                            _active={{ cursor: "grabbing" }}
                        />

                        {/* Botones flotantes (top-right) — igual que Ventana */}
                        <Flex position="absolute" top="3" right="3" direction="column" gap="1.5" zIndex="10">
                            <IconButton
                                aria-label="Centrar Cámara"
                                title="Centrar Cámara"
                                onClick={resetCamera}
                                bg="surface.card" borderRadius="lg" boxShadow="sm"
                                color="text.body" size="xs" h="7" w="7"
                                borderWidth="1px" borderColor="border.default"
                                _hover={{ bg: "bg.subtle", color: "primary.500" }}
                            >
                                <RotateCcw size={13} style={{ flexShrink: 0 }} />
                            </IconButton>
                            <IconButton
                                aria-label={autoRotate ? "Pausar giro 360°" : "Activar giro 360°"}
                                title={autoRotate ? "Pausar Giro 360°" : "Activar Giro 360°"}
                                onClick={() => setAutoRotate((v) => !v)}
                                bg={autoRotate ? "primary.500" : "surface.card"}
                                borderRadius="lg" boxShadow="sm"
                                color={autoRotate ? "white" : "text.body"}
                                size="xs" h="7" w="7"
                                borderWidth="1px"
                                borderColor={autoRotate ? "primary.500" : "border.default"}
                                _hover={{ bg: autoRotate ? "primary.600" : "bg.subtle" }}
                            >
                                <DoorOpen size={13} style={{ flexShrink: 0 }} />
                            </IconButton>
                        </Flex>
                    </Box>

                    {/* Descripción de la configuración — igual que Ventana */}
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
                            {isTecho ? (
                                <>
                                    Estructura con acabado <strong>{currentWoodLabel}</strong> y
                                    cubierta de policarbonato <strong>{currentPolyLabel}</strong>.
                                    Dimensiones: <strong>{widthM.toFixed(2)} m × {heightM.toFixed(2)} m</strong>{" "}
                                    ({(widthM * heightM).toFixed(2)} m²).
                                </>
                            ) : (
                                <>
                                    Perfil de aluminio en color <strong>{currentAluLabel}</strong>
                                    {hasGlass && <> y vidrio tono <strong>{currentGlassLabel}</strong></>}.
                                    Dimensiones: <strong>{widthM.toFixed(2)} m × {heightM.toFixed(2)} m</strong>{" "}
                                    ({(widthM * heightM).toFixed(2)} m²).
                                </>
                            )}
                        </Text>
                    </Box>
                </Box>
            </SimpleGrid>
        </Box>
    );
};

// ── Sub-componentes internos ───────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
    return (
        <Text
            fontSize="xs" fontWeight="bold" color="text.muted"
            textTransform="uppercase" letterSpacing="wider" mb="1.5"
        >
            {children}
        </Text>
    );
}

function SwatchBtn({
    label, color, selected, onClick,
}: { label: string; color: string; selected: boolean; onClick: () => void }) {
    return (
        <Flex
            as="button" onClick={onClick}
            direction="column" align="center" justify="center"
            gap="1" p="1.5" borderRadius="lg"
            borderWidth={selected ? "2px" : "1px"}
            borderColor={selected ? "primary.500" : "border.default"}
            bg={selected ? "bg.subtle" : "transparent"}
            cursor="pointer" transition="all 0.2s ease"
            _hover={{ borderColor: "primary.500" }}
        >
            <Box w="5" h="5" borderRadius="full" bg={color} border="1px solid rgba(0,0,0,0.2)" boxShadow="sm" />
            <Text fontSize="2xs" fontWeight={selected ? "bold" : "medium"} color="text.heading" truncate w="full" textAlign="center">
                {label}
            </Text>
        </Flex>
    );
}
