"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    Box,
    Flex,
    IconButton,
    Text,
    SimpleGrid,
    Input,
    HStack,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Video } from "lucide-react";
import { companyData } from "@/shared/config/company-data";
import { SERVICE_AR_MODELS_MAP } from "../data/serviceArModels";
import { buildServiceModel } from "./configurador3d/serviceGeometries";

// ── Config data per service ───────────────────────────────────────────────────

const ALUMINUM_FINISHES = [
    { id: "negro", label: "Negro", color: "#1A1A1A" },
    { id: "natural", label: "Natural", color: "#B0B4B8" },
    { id: "blanco", label: "Blanco", color: "#F8F9FA" },
    { id: "champagne", label: "Champagne", color: "#C4A265" },
    { id: "madera", label: "Madera", color: "#8A5A36" },
];

const GLASS_COLORS = [
    { id: "incoloro", label: "Incoloro", hex: "#E8F4F8" },
    { id: "bronce", label: "Bronce", hex: "#8A5A36" },
    { id: "gris", label: "Gris", hex: "#4B5563" },
    { id: "satinado", label: "Satinado", hex: "#D1D5DB" },
];

const WOOD_FINISHES = [
    { id: "teca", label: "Teca", color: "#8A4A21" },
    { id: "nogal", label: "Nogal", color: "#3D2314" },
    { id: "roble", label: "Roble", color: "#C68B59" },
    { id: "negro", label: "Negro", color: "#1A1A1A" },
];

const POLYCARBONATE_TYPES = [
    { id: "bronce", label: "Bronce", color: "#8A5229" },
    { id: "opalino", label: "Opalino", color: "#F0F4F8" },
    { id: "transparente", label: "Transparente", color: "#E2F1FF" },
    { id: "humo", label: "Humo", color: "#2A2E33" },
];

interface ServiceConfigurator3DCardProps {
    serviceSlug: string;
    title?: string;
}

export const ServiceConfigurator3DCard: React.FC<ServiceConfigurator3DCardProps> = ({
    serviceSlug,
    title,
}) => {
    // ── State ─────────────────────────────────────────────────────────────────
    const [aluminum, setAluminum] = useState("negro");
    const [glassColor, setGlassColor] = useState("incoloro");
    const [wood, setWood] = useState("teca");
    const [poly, setPoly] = useState("bronce");
    const [widthM, setWidthM] = useState(2.0);
    const [heightM, setHeightM] = useState(2.2);
    const [autoRotate, setAutoRotate] = useState(true);

    const canvasRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const modelGroupRef = useRef<THREE.Group | null>(null);
    const reqRef = useRef<number | null>(null);
    const autoRotateRef = useRef(autoRotate);

    useEffect(() => { autoRotateRef.current = autoRotate; }, [autoRotate]);

    // ── Determine service config ──────────────────────────────────────────────
    const isTecho = serviceSlug === "techo";
    const hasGlass = ["mampara", "ducha", "baranda", "balcones", "parapeto", "pvidrio"].includes(serviceSlug);

    const systems = SERVICE_AR_MODELS_MAP[serviceSlug];
    const firstSystemKey = systems ? Object.keys(systems)[0] : undefined;
    const systemLabel = systems && firstSystemKey ? systems[firstSystemKey].systemLabel : title || serviceSlug;

    // ── 3D Scene Setup ────────────────────────────────────────────────────────
    const cleanup3D = useCallback(() => {
        if (reqRef.current) { cancelAnimationFrame(reqRef.current); reqRef.current = null; }
        if (controlsRef.current) { controlsRef.current.dispose(); controlsRef.current = null; }
        if (rendererRef.current) {
            const c = canvasRef.current;
            if (c && c.contains(rendererRef.current.domElement)) c.removeChild(rendererRef.current.domElement);
            rendererRef.current.dispose();
            rendererRef.current = null;
        }
        sceneRef.current = null;
        cameraRef.current = null;
        modelGroupRef.current = null;
    }, []);

    const init3D = useCallback(() => {
        cleanup3D();
        const container = canvasRef.current;
        if (!container) return;

        const w = container.clientWidth || 600;
        const h = container.clientHeight || 460;

        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8fafc);
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(40, w / h, 0.01, 100);
        camera.position.set(3, 2.5, 4);
        cameraRef.current = camera;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.enablePan = false;
        controls.minDistance = 1.5;
        controls.maxDistance = 10;
        controls.maxPolarAngle = Math.PI / 1.5;
        controls.target.set(0, 1.0, 0);
        controlsRef.current = controls;

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        const key = new THREE.DirectionalLight(0xffffff, 0.9);
        key.position.set(5, 10, 7);
        key.castShadow = true;
        key.shadow.mapSize.set(1024, 1024);
        key.shadow.camera.near = 0.5;
        key.shadow.camera.far = 30;
        key.shadow.camera.left = -6;
        key.shadow.camera.right = 6;
        key.shadow.camera.top = 6;
        key.shadow.camera.bottom = -6;
        scene.add(key);
        const fill = new THREE.DirectionalLight(0xe0f2fe, 0.4);
        fill.position.set(-5, 0, -5);
        scene.add(fill);

        // Ground grid
        const grid = new THREE.GridHelper(8, 16, 0xcbd5e1, 0xe2e8f0);
        grid.position.y = -0.01;
        scene.add(grid);

        // Model group
        const group = new THREE.Group();
        scene.add(group);
        modelGroupRef.current = group;

        // Animation loop
        const animate = () => {
            reqRef.current = requestAnimationFrame(animate);
            if (autoRotateRef.current) {
                controls.autoRotate = true;
                controls.autoRotateSpeed = 1.2;
            } else {
                controls.autoRotate = false;
            }
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // ResizeObserver
        const ro = new ResizeObserver(() => {
            if (!container || !cameraRef.current || !rendererRef.current) return;
            const nw = container.clientWidth;
            const nh = container.clientHeight;
            cameraRef.current.aspect = nw / nh;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(nw, nh);
        });
        ro.observe(container);

        return () => {
            ro.disconnect();
            cleanup3D();
        };
    }, [cleanup3D]);

    useEffect(() => {
        const destroy = init3D();
        return () => { destroy?.(); };
    }, [init3D]);

    // ── Rebuild 3D model when config changes ──────────────────────────────────
    useEffect(() => {
        if (!modelGroupRef.current || !sceneRef.current) return;

        // Remove old model
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

        // Build new procedural model
        const model = buildServiceModel({
            serviceSlug,
            widthM,
            heightM,
            aluminum,
            glassColor,
            wood,
            poly,
        });

        // Enable shadows on all meshes
        model.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
        });

        // Center model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        model.position.y += center.y;

        modelGroupRef.current.add(model);
    }, [serviceSlug, aluminum, glassColor, wood, poly, widthM, heightM]);

    // ── WhatsApp link ─────────────────────────────────────────────────────────
    const waText = encodeURIComponent(
        `Hola GYA Company, estoy interesado en ${systemLabel}.\n¿Podrían brindarme una cotización?`
    );

    // ── Config description ────────────────────────────────────────────────────
    const configDescription = isTecho
        ? `${systemLabel} — Estructura con acabado ${WOOD_FINISHES.find(w => w.id === wood)?.label || "Teca"} y policarbonato ${POLYCARBONATE_TYPES.find(p => p.id === poly)?.label || "Bronce"}. Dimensiones: ${widthM.toFixed(1)}m × ${heightM.toFixed(1)}m.`
        : `${systemLabel} — Aluminio ${ALUMINUM_FINISHES.find(a => a.id === aluminum)?.label || "Negro"} y cristal ${GLASS_COLORS.find(g => g.id === glassColor)?.label || "Incoloro"}. Dimensiones: ${widthM.toFixed(1)}m × ${heightM.toFixed(1)}m.`;

    return (
        <Box
            w="full"
            bg="surface.card"
            borderRadius="2xl"
            border="1px solid"
            borderColor="border.glass"
            backdropFilter="blur(16px)"
            boxShadow="0 20px 40px rgba(0,0,0,0.2)"
        >
            <SimpleGrid columns={{ base: 1, lg: 12 }} gap="6" alignItems="stretch">

                {/* ═══════════════════ PANEL IZQUIERDO: Configuración ═══════════════ */}
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
                    maxH={{ base: "none", lg: "520px" }}
                >
                    {/* ── TECHO: Acabado Madera ── */}
                    {isTecho && (
                        <Box>
                            <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
                                Acabado de Estructura
                            </Text>
                            <SimpleGrid columns={2} gap="1.5">
                                {WOOD_FINISHES.map((w) => {
                                    const sel = wood === w.id;
                                    return (
                                        <Flex
                                            key={w.id}
                                            as="button"
                                            onClick={() => setWood(w.id)}
                                            direction="column"
                                            align="center"
                                            gap="1"
                                            p="2"
                                            borderRadius="lg"
                                            borderWidth={sel ? "2px" : "1px"}
                                            borderColor={sel ? "primary.500" : "border.default"}
                                            bg={sel ? "bg.subtle" : "transparent"}
                                            cursor="pointer"
                                            transition="all 0.2s ease"
                                            _hover={{ borderColor: "primary.500" }}
                                        >
                                            <Box w="5" h="5" borderRadius="full" bg={w.color} border="1px solid rgba(0,0,0,0.2)" />
                                            <Text fontSize="2xs" fontWeight={sel ? "bold" : "medium"} color="text.heading">{w.label}</Text>
                                        </Flex>
                                    );
                                })}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* ── TECHO: Policarbonato ── */}
                    {isTecho && (
                        <Box>
                            <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
                                Tipo de Policarbonato
                            </Text>
                            <SimpleGrid columns={2} gap="1.5">
                                {POLYCARBONATE_TYPES.map((p) => {
                                    const sel = poly === p.id;
                                    return (
                                        <Flex
                                            key={p.id}
                                            as="button"
                                            onClick={() => setPoly(p.id)}
                                            direction="column"
                                            align="center"
                                            gap="1"
                                            p="2"
                                            borderRadius="lg"
                                            borderWidth={sel ? "2px" : "1px"}
                                            borderColor={sel ? "primary.500" : "border.default"}
                                            bg={sel ? "bg.subtle" : "transparent"}
                                            cursor="pointer"
                                            transition="all 0.2s ease"
                                            _hover={{ borderColor: "primary.500" }}
                                        >
                                            <Box w="5" h="5" borderRadius="full" bg={p.color} border="1px solid rgba(0,0,0,0.15)" />
                                            <Text fontSize="2xs" fontWeight={sel ? "bold" : "medium"} color="text.heading">{p.label}</Text>
                                        </Flex>
                                    );
                                })}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* ── NO-TECHO: Color de Aluminio ── */}
                    {!isTecho && (
                        <Box>
                            <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
                                Color de Aluminio
                            </Text>
                            <SimpleGrid columns={5} gap="1.5">
                                {ALUMINUM_FINISHES.map((a) => {
                                    const sel = aluminum === a.id;
                                    return (
                                        <Flex
                                            key={a.id}
                                            as="button"
                                            onClick={() => setAluminum(a.id)}
                                            direction="column"
                                            align="center"
                                            gap="1"
                                            p="1.5"
                                            borderRadius="lg"
                                            borderWidth={sel ? "2px" : "1px"}
                                            borderColor={sel ? "primary.500" : "border.default"}
                                            bg={sel ? "bg.subtle" : "transparent"}
                                            cursor="pointer"
                                            transition="all 0.2s ease"
                                            _hover={{ borderColor: "primary.500" }}
                                        >
                                            <Box w="5" h="5" borderRadius="full" bg={a.color} border="1px solid rgba(0,0,0,0.2)" boxShadow="sm" />
                                            <Text fontSize="2xs" fontWeight={sel ? "bold" : "medium"} color="text.heading" truncate w="full" textAlign="center">
                                                {a.label}
                                            </Text>
                                        </Flex>
                                    );
                                })}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* ── Color de Vidrio ── */}
                    {hasGlass && (
                        <Box>
                            <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
                                Color de Vidrio
                            </Text>
                            <SimpleGrid columns={4} gap="1.5">
                                {GLASS_COLORS.map((g) => {
                                    const sel = glassColor === g.id;
                                    return (
                                        <Flex
                                            key={g.id}
                                            as="button"
                                            onClick={() => setGlassColor(g.id)}
                                            direction="column"
                                            align="center"
                                            gap="1"
                                            p="1.5"
                                            borderRadius="lg"
                                            borderWidth={sel ? "2px" : "1px"}
                                            borderColor={sel ? "primary.500" : "border.default"}
                                            bg={sel ? "bg.subtle" : "transparent"}
                                            cursor="pointer"
                                            transition="all 0.2s ease"
                                            _hover={{ borderColor: "primary.500" }}
                                        >
                                            <Box w="5" h="5" borderRadius="full" bg={g.hex} border="1px solid" borderColor="border.default" />
                                            <Text fontSize="2xs" fontWeight={sel ? "bold" : "medium"} color="text.heading" truncate w="full" textAlign="center">
                                                {g.label}
                                            </Text>
                                        </Flex>
                                    );
                                })}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* ── Dimensiones ── */}
                    <Box>
                        <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
                            Dimensiones (m)
                        </Text>
                        <SimpleGrid columns={2} gap="2">
                            <Box>
                                <Text fontSize="9px" color="text.muted" mb="0.5">Ancho</Text>
                                <Input
                                    type="number"
                                    value={widthM}
                                    min={0.5}
                                    max={8}
                                    step={0.1}
                                    onChange={(e) => {
                                        const v = parseFloat(e.target.value);
                                        if (!isNaN(v) && v >= 0.5 && v <= 8) setWidthM(v);
                                    }}
                                    size="xs"
                                    h="7"
                                    borderRadius="lg"
                                />
                            </Box>
                            <Box>
                                <Text fontSize="9px" color="text.muted" mb="0.5">{isTecho ? "Largo" : "Alto"}</Text>
                                <Input
                                    type="number"
                                    value={heightM}
                                    min={0.5}
                                    max={5}
                                    step={0.1}
                                    onChange={(e) => {
                                        const v = parseFloat(e.target.value);
                                        if (!isNaN(v) && v >= 0.5 && v <= 5) setHeightM(v);
                                    }}
                                    size="xs"
                                    h="7"
                                    borderRadius="lg"
                                />
                            </Box>
                        </SimpleGrid>
                    </Box>
                </Box>

                {/* ═══════════════════ PANEL DERECHO: Visor 3D + Info ══════════════ */}
                <Box
                    gridColumn={{ base: "span 1", lg: "span 7" }}
                    display="flex"
                    flexDirection="column"
                    gap="4"
                >
                    {/* Visor 3D */}
                    <Box
                        position="relative"
                        h={{ base: "340px", sm: "380px", md: "460px" }}
                        bg="bg.page"
                        borderRadius="2xl"
                        border="1px solid"
                        borderColor="border.subtle"
                        overflow="hidden"
                    >
                        <Box
                            ref={canvasRef}
                            w="full"
                            h="full"
                            cursor="grab"
                            _active={{ cursor: "grabbing" }}
                        />
                        <Flex position="absolute" top="3" right="3" direction="column" gap="1.5" zIndex="10">
                            <IconButton
                                aria-label={autoRotate ? "Pausar giro" : "Activar giro"}
                                title={autoRotate ? "Pausar Giro 360°" : "Activar Giro 360°"}
                                onClick={() => setAutoRotate(!autoRotate)}
                                bg={autoRotate ? "primary.500" : "surface.card"}
                                borderRadius="lg"
                                boxShadow="sm"
                                color={autoRotate ? "white" : "text.body"}
                                size="xs"
                                h="7"
                                w="7"
                                borderWidth="1px"
                                borderColor={autoRotate ? "primary.500" : "border.default"}
                                _hover={{ bg: autoRotate ? "primary.600" : "bg.subtle" }}
                            >
                                <Video size={13} />
                            </IconButton>
                        </Flex>
                    </Box>

                    {/* Descripción de configuración */}
                    <Box
                        p="5"
                        bg="rgba(255, 255, 255, 0.03)"
                        backdropFilter="blur(16px)"
                        borderRadius="2xl"
                        border="1px solid"
                        borderColor="border.glass"
                    >
                        <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="2">
                            Configuración Actual
                        </Text>
                        <Text fontSize="sm" color="text.body" lineHeight="tall">
                            {configDescription}
                        </Text>
                    </Box>

                    {/* CTA */}
                    <HStack gap="2">
                        <a
                            href={`https://wa.me/${companyData.whatsappNumber}?text=${waText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ flex: 1, textDecoration: "none" }}
                        >
                            <Button
                                variant="solid"
                                bg="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                                color="white"
                                size="sm"
                                w="full"
                                fontWeight="bold"
                            >
                                Cotizar por WhatsApp
                            </Button>
                        </a>
                    </HStack>
                </Box>
            </SimpleGrid>
        </Box>
    );
};
