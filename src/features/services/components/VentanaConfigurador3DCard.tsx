"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ventanasCatalogo from "../data/ventanas-catalogo.json";
import servicesConfig from "../data/services-3d-config.json";
import {
    WINDOW_CATALOG,
    FINISHES,
    GLASS_TYPES,
    GLASS_COLORS,
} from "./configurador3d/constants";
import { buildServiceModel } from "./configurador3d/serviceGeometries";
import {
    DoorOpen,
    Video,
} from "lucide-react";

// Paletas para servicios no-ventana
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

// Tipo del JSON de configuración por servicio
type ServiceConfig = typeof servicesConfig[keyof typeof servicesConfig];

export const MIN_VENTANA_WIDTH_M = 0.25;
export const MAX_VENTANA_WIDTH_M = 2.20;
export const MIN_VENTANA_HEIGHT_M = 0.30;
export const MAX_VENTANA_HEIGHT_M = 2.30;

export const VentanaConfigurador3DCard: React.FC<{
    initialSystemId?: string;
    serviceSlug?: string;
}> = ({ initialSystemId = "sistema-nova", serviceSlug = "ventana" }) => {
    // Config del JSON según el slug activo
    const cfg: ServiceConfig = (servicesConfig as Record<string, ServiceConfig>)[serviceSlug]
        ?? (servicesConfig as Record<string, ServiceConfig>)["ventana"];

    const [activeType, setActiveType] = useState<string>(cfg.tipos[0]?.id ?? "corredizo");
    const [widthMeters, setWidthMeters]   = useState(cfg.defaultWidth);
    const [heightMeters, setHeightMeters] = useState(cfg.defaultHeight);
    const [systemId, setSystemId]   = useState(initialSystemId);
    const [finish, setFinish]       = useState("negro");
    const [glass, setGlass]         = useState("templado");
    const [glassColor, setGlassColor] = useState("incoloro");
    const [wood, setWood]   = useState("teca");
    const [poly, setPoly]   = useState("bronce");
    const [hasArenado, setHasArenado]           = useState(false);
    const [hasDisenoCliente, setHasDisenoCliente] = useState(false);
    const [isWindowOpen, setIsWindowOpen]       = useState(false);
    const [rotationAngle, setRotationAngle] = useState<{ azimuth: number; polar: number }>({ azimuth: 27, polar: 81 });

    // Sincronizar cuando cambia la selección externa del sistema en la cabecera
    useEffect(() => {
        if (initialSystemId) {
            setSystemId(initialSystemId);
        }
    }, [initialSystemId]);

    // Reset al navegar entre servicios
    useEffect(() => {
        setActiveType(cfg.tipos[0]?.id ?? "corredizo");
        setWidthMeters(cfg.defaultWidth);
        setHeightMeters(cfg.defaultHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceSlug]);

    const width = Math.round(widthMeters * 1000);
    const height = Math.round(heightMeters * 1000);

    const isWindowOpenRef = useRef(isWindowOpen);
    const activeTypeRef = useRef(activeType);
    const widthRef = useRef(width);
    const heightRef = useRef(height);

    useEffect(() => {
        isWindowOpenRef.current = isWindowOpen;
    }, [isWindowOpen]);

    useEffect(() => {
        activeTypeRef.current = activeType;
    }, [activeType]);

    useEffect(() => {
        widthRef.current = width;
    }, [width]);

    useEffect(() => {
        heightRef.current = height;
    }, [height]);

    const canvasRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const controlsListenerRef = useRef<(() => void) | null>(null);
    const windowGroupRef = useRef<THREE.Group | null>(null);
    const sashGroupRef = useRef<THREE.Group | null>(null);
    const reqRef = useRef<number | null>(null);

    const availableSystems = ventanasCatalogo.sistemas;

    // Helpers 3D
    const cleanup3D = useCallback(() => {
        if (reqRef.current) {
            cancelAnimationFrame(reqRef.current);
            reqRef.current = null;
        }
        if (controlsRef.current) {
            if (controlsListenerRef.current) {
                controlsRef.current.removeEventListener("change", controlsListenerRef.current);
                controlsListenerRef.current = null;
            }
            controlsRef.current.dispose();
            controlsRef.current = null;
        }
        if (rendererRef.current) {
            rendererRef.current.dispose();
            if (canvasRef.current) {
                canvasRef.current.innerHTML = "";
            }
            rendererRef.current = null;
        }
        sceneRef.current = null;
        cameraRef.current = null;
    }, []);

    const init3D = useCallback(() => {
        if (rendererRef.current || !canvasRef.current) return;

        const container = canvasRef.current;
        const w = container.clientWidth || 500;
        const h = container.clientHeight || 450;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8fafc);
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
        const initialRadius = 3.5;
        const initPhi = (81 * Math.PI) / 180;
        const initTheta = (27 * Math.PI) / 180;
        camera.position.set(
            initialRadius * Math.sin(initPhi) * Math.sin(initTheta),
            initialRadius * Math.cos(initPhi),
            initialRadius * Math.sin(initPhi) * Math.cos(initTheta),
        );
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 1;
        controls.maxDistance = 8;
        controls.maxPolarAngle = Math.PI / 1.5;
        controlsRef.current = controls;

        const handleControlsChange = () => {
            const rawAzimuth = (controls.getAzimuthalAngle() * 180) / Math.PI;
            const azimuth = Math.round(((rawAzimuth % 360) + 360) % 360);
            const polar = Math.round((controls.getPolarAngle() * 180) / Math.PI);
            setRotationAngle({ azimuth, polar });
        };
        // react-doctor-disable-next-line react-doctor/effect-needs-cleanup
        controls.addEventListener("change", handleControlsChange);
        controlsListenerRef.current = handleControlsChange;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
        dirLight.position.set(5, 10, 7);
        dirLight.castShadow = true;
        scene.add(dirLight);

        const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.45);
        fillLight.position.set(-5, 0, -5);
        scene.add(fillLight);

        const grid = new THREE.GridHelper(8, 16, 0xcbd5e1, 0xe2e8f0);
        grid.position.y = -1.4;
        scene.add(grid);

        const animate = () => {
            reqRef.current = requestAnimationFrame(animate);
            if (controlsRef.current) controlsRef.current.update();

            const curType = activeTypeRef.current;
            const isOpenState = isWindowOpenRef.current;
            const curW = widthRef.current;

            if (sashGroupRef.current && curType !== "fija") {
                const speed = 0.08;
                const pW = 0.04;
                const inW = curW / 1000 - pW * 2;
                const sW = inW / 2 + 0.02;
                const closedX = 0;
                const openX = -(inW - sW);
                const sash = sashGroupRef.current;

                if (curType === "corredizo") {
                    const targetX = isOpenState ? openX : closedX;
                    sash.position.x += (targetX - sash.position.x) * speed;
                } else if (curType === "proyectante") {
                    const targetRot = isOpenState ? Math.PI / 6 : 0;
                    sash.rotation.x += (targetRot - sash.rotation.x) * speed;
                } else if (curType === "batiente") {
                    const targetRot = isOpenState ? -Math.PI / 3 : 0;
                    sash.rotation.y += (targetRot - sash.rotation.y) * speed;
                }
            } else if (windowGroupRef.current) {
                // Animación para puertas de ducha y mamparas procedurales
                const slidingDoor = windowGroupRef.current.getObjectByName("slidingDoor");
                if (slidingDoor) {
                    const speed = 0.08;
                    const curWidth = curW / 1000;
                    const closedX = curWidth / 4;
                    const openX = -curWidth / 4 + 0.05; // Desliza detrás del panel fijo
                    const targetX = isOpenState ? openX : closedX;
                    slidingDoor.position.x += (targetX - slidingDoor.position.x) * speed;
                }
            }

            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        };
        animate();

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width: newW, height: newH } = entry.contentRect;
                if (newW > 0 && newH > 0 && rendererRef.current && cameraRef.current) {
                    cameraRef.current.aspect = newW / newH;
                    cameraRef.current.updateProjectionMatrix();
                    rendererRef.current.setSize(newW, newH);
                }
            }
        });
        resizeObserver.observe(container);
    }, []);

    const createSash = useCallback(
        (w: number, h: number, p: number, d: number, matA: THREE.Material, matG: THREE.Material) => {
            const group = new THREE.Group();
            const frameH = new THREE.BoxGeometry(w, p, d);
            const frameV = new THREE.BoxGeometry(p, h - p * 2, d);

            const mTop = new THREE.Mesh(frameH, matA);
            mTop.position.y = h / 2 - p / 2;
            const mBot = new THREE.Mesh(frameH, matA);
            mBot.position.y = -h / 2 + p / 2;
            const mLeft = new THREE.Mesh(frameV, matA);
            mLeft.position.x = -w / 2 + p / 2;
            const mRight = new THREE.Mesh(frameV, matA);
            mRight.position.x = w / 2 - p / 2;

            const glassGeo = new THREE.BoxGeometry(w - p * 2, h - p * 2, 0.006);
            const glassObj = new THREE.Mesh(glassGeo, matG);

            group.add(mTop, mBot, mLeft, mRight, glassObj);
            return group;
        },
        [],
    );

    const generate3DModel = useCallback(() => {
        if (!sceneRef.current) return;
        if (windowGroupRef.current) sceneRef.current.remove(windowGroupRef.current);

        // ── Para cualquier servicio que no sea ventana → geometría procedural ──
        if (serviceSlug !== "ventana") {
            const model = buildServiceModel({
                serviceSlug,
                widthM:    widthMeters,
                heightM:   heightMeters,
                aluminum:  finish,
                glassColor,
                wood,
                poly,
            });
            model.traverse((obj) => {
                if (obj instanceof THREE.Mesh) { obj.castShadow = true; obj.receiveShadow = true; }
            });
            const box3   = new THREE.Box3().setFromObject(model);
            const center = box3.getCenter(new THREE.Vector3());
            // Centrado exacto del modelo en el origen 3D
            model.position.set(-center.x, -center.y, -center.z);
            sceneRef.current.add(model);
            windowGroupRef.current = model as unknown as THREE.Group;
            sashGroupRef.current = null;
            return;
        }

        // ── Geometría original de ventana ─────────────────────────────────────
        const windowGroup = new THREE.Group();
        const sashGroup = new THREE.Group();

        const w = width / 1000;
        const h = height / 1000;
        let depth = 0.05;
        let pW = 0.04;

        switch (systemId) {
            case "sistema-nova":
                depth = 0.045;
                pW = 0.035;
                break;
            case "serie-25":
            case "sistema-serie-25":
                depth = 0.07;
                pW = 0.055;
                break;
            case "serie-35":
            case "sistema-serie-35":
            case "sistema-serie-37-38":
                depth = 0.085;
                pW = 0.065;
                break;
            case "serie-62":
            case "sistema-serie-62":
            case "sistema-serie-62-80":
                depth = 0.11;
                pW = 0.085;
                break;
            default:
                depth = 0.05;
                pW = 0.04;
        }

        const selectedColorObj =
            GLASS_COLORS.find((c) => c.id === glassColor) || GLASS_COLORS[0];
        const glassTint = selectedColorObj.tint3d;
        const isTinted = glassColor !== "incoloro";

        const materials = {
            alum: {
                negro: new THREE.MeshStandardMaterial({
                    color: 0x1a1a1a,
                    metalness: 0.7,
                    roughness: 0.4,
                }),
                "gris-claro": new THREE.MeshStandardMaterial({
                    color: 0xb0b4b8,
                    metalness: 0.6,
                    roughness: 0.3,
                }),
                "madera-claro": new THREE.MeshStandardMaterial({
                    color: 0xc19a6b,
                    metalness: 0.1,
                    roughness: 0.75,
                }),
                blanco: new THREE.MeshStandardMaterial({
                    color: 0xf8f9fa,
                    metalness: 0.1,
                    roughness: 0.5,
                }),
            },
            glass: {
                crudo: new THREE.MeshPhysicalMaterial({
                    color: glassTint,
                    transmission: hasArenado ? 0.35 : isTinted ? 0.75 : 0.9,
                    opacity: hasArenado ? 0.85 : 1,
                    transparent: true,
                    roughness: hasArenado ? 0.65 : 0.05,
                    ior: 1.5,
                }),
                templado: new THREE.MeshPhysicalMaterial({
                    color: glassTint,
                    transmission: hasArenado ? 0.35 : isTinted ? 0.8 : 0.95,
                    opacity: hasArenado ? 0.85 : 1,
                    transparent: true,
                    roughness: hasArenado ? 0.65 : 0.02,
                    ior: 1.52,
                }),
                laminado: new THREE.MeshPhysicalMaterial({
                    color: glassTint,
                    transmission: hasArenado ? 0.35 : isTinted ? 0.7 : 0.85,
                    opacity: hasArenado ? 0.85 : 1,
                    transparent: true,
                    roughness: hasArenado ? 0.65 : 0.05,
                    ior: 1.5,
                    thickness: 0.5,
                }),
            },
        };

        const matA =
            materials.alum[finish as keyof typeof materials.alum] || materials.alum.negro;
        const matG =
            materials.glass[glass as keyof typeof materials.glass] || materials.glass.templado;

        // Marco Exterior
        const outerFrameH = new THREE.BoxGeometry(w, pW, depth);
        const outerFrameV = new THREE.BoxGeometry(pW, h - pW * 2, depth);

        const mTop = new THREE.Mesh(outerFrameH, matA);
        mTop.position.y = h / 2 - pW / 2;
        const mBot = new THREE.Mesh(outerFrameH, matA);
        mBot.position.y = -h / 2 + pW / 2;
        const mLeft = new THREE.Mesh(outerFrameV, matA);
        mLeft.position.x = -w / 2 + pW / 2;
        const mRight = new THREE.Mesh(outerFrameV, matA);
        mRight.position.x = w / 2 - pW / 2;

        windowGroup.add(mTop, mBot, mLeft, mRight);

        const inW = w - pW * 2;
        const inH = h - pW * 2;

        if (activeType === "fija") {
            const glassGeo = new THREE.BoxGeometry(inW, inH, 0.006);
            const glassObj = new THREE.Mesh(glassGeo, matG);
            windowGroup.add(glassObj);
        } else if (activeType === "corredizo") {
            const sW = inW / 2 + 0.02;
            const sH = inH;
            const sP = pW * 0.8;
            const sD = depth * 0.45;

            const sashFixed = createSash(sW, sH, sP, sD, matA, matG);
            sashFixed.position.set(-inW / 2 + sW / 2, 0, -sD / 2);
            windowGroup.add(sashFixed);

            const sashMobile = createSash(sW, sH, sP, sD, matA, matG);
            sashMobile.position.set(inW / 2 - sW / 2, 0, sD / 2);
            sashGroup.add(sashMobile);
            windowGroup.add(sashGroup);
        } else if (activeType === "proyectante") {
            const sW = inW - 0.01;
            const sH = inH - 0.01;
            const sP = pW * 0.8;
            const sD = depth * 0.6;

            const sash = createSash(sW, sH, sP, sD, matA, matG);
            sash.position.set(0, -sH / 2, 0);

            sashGroup.position.set(0, sH / 2, 0);
            sashGroup.add(sash);
            windowGroup.add(sashGroup);
        } else if (activeType === "batiente") {
            const sW = inW - 0.01;
            const sH = inH - 0.01;
            const sP = pW * 0.8;
            const sD = depth * 0.6;

            const sash = createSash(sW, sH, sP, sD, matA, matG);
            sash.position.set(sW / 2, 0, 0);

            sashGroup.position.set(-sW / 2, 0, 0);
            sashGroup.add(sash);
            windowGroup.add(sashGroup);
        } else {
            // Default luz fija
            const glassGeo = new THREE.BoxGeometry(inW, inH, 0.006);
            const glassObj = new THREE.Mesh(glassGeo, matG);
            windowGroup.add(glassObj);
        }

        sceneRef.current.add(windowGroup);
        windowGroupRef.current = windowGroup;
        sashGroupRef.current = sashGroup;
    }, [width, height, systemId, glassColor, finish, glass, activeType, hasArenado, createSash, serviceSlug, widthMeters, heightMeters, wood, poly]);

    // Ciclo de vida Three.js
    useEffect(() => {
        const timer = setTimeout(() => {
            init3D();
            generate3DModel();
        }, 60);

        return () => {
            clearTimeout(timer);
            cleanup3D();
        };
    }, [activeType, init3D, cleanup3D, generate3DModel, systemId, serviceSlug]);

    useEffect(() => {
        generate3DModel();
    }, [widthMeters, heightMeters, systemId, finish, glass, glassColor, hasArenado, wood, poly, serviceSlug, generate3DModel]);

    const resetCamera = useCallback(() => {
        if (!cameraRef.current || !controlsRef.current) return;
        const maxDim = Math.max(width / 1000, height / 1000);
        const isTechoLocal = serviceSlug === "techo";
        const radius = isTechoLocal ? maxDim * 1.2 + 2.5 : maxDim * 1.5 + 1.2;
        const phi = (81 * Math.PI) / 180;
        const theta = (27 * Math.PI) / 180;
        cameraRef.current.position.set(
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.cos(theta),
        );
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
        setRotationAngle({ azimuth: 27, polar: 81 });
    }, [width, height, serviceSlug]);

    const currentWindowLabel = (cfg.tipos.find((t) => t.id === activeType)?.label) || WINDOW_CATALOG.find((w) => w.id === activeType)?.title || "Corrediza";
    const currentSystemLabel = availableSystems.find((s) => s.id === systemId)?.nombre || "Nova";
    const currentFinishLabel = FINISHES.find((f) => f.id === finish)?.label || "Negro";
    const currentGlassLabel = GLASS_TYPES.find((g) => g.id === glass)?.label || "Templado";
    const currentGlassColorLabel = GLASS_COLORS.find((c) => c.id === glassColor)?.label || "Incoloro";
    const currentWoodLabel = WOOD_FINISHES.find((w) => w.id === wood)?.label || "Teca";
    const currentPolyLabel = POLYCARBONATE_TYPES.find((p) => p.id === poly)?.label || "Bronce";

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
                    {/* Tipo de Producto / Servicio */}
                    <Box>
                        <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
                            {cfg.tipoLabel || "Tipo"}
                        </Text>
                        <SimpleGrid columns={2} gap="1.5">
                            {cfg.tipos.map((item) => {
                                const isSelected = activeType === item.id;
                                return (
                                    <Button
                                        key={item.id}
                                        onClick={() => setActiveType(item.id)}
                                        size="xs"
                                        variant={isSelected ? "aura" : "outline"}
                                        borderRadius="lg"
                                        h="8"
                                        w="full"
                                        fontSize="2xs"
                                        fontWeight={isSelected ? "bold" : "medium"}
                                        justifyContent="center"
                                        px="2"
                                    >
                                        <Text truncate>{item.label}</Text>
                                    </Button>
                                );
                            })}
                        </SimpleGrid>
                    </Box>

                    {/* Sistema (solo si el servicio lo soporta, e.g. ventana) */}
                    {cfg.hasSistemas && (
                        <Box>
                            <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
                                Sistema
                            </Text>
                            <SimpleGrid columns={2} gap="1.5">
                                {availableSystems.map((sys) => {
                                    const isSelected = systemId === sys.id;
                                    return (
                                        <Button
                                            key={sys.id}
                                            size="xs"
                                            variant={isSelected ? "aura" : "outline"}
                                            onClick={() => setSystemId(sys.id)}
                                            borderRadius="lg"
                                            h="8"
                                            w="full"
                                            fontSize="2xs"
                                            fontWeight={isSelected ? "bold" : "medium"}
                                            justifyContent="center"
                                            px="2"
                                        >
                                            <Text truncate>{sys.nombre}</Text>
                                        </Button>
                                    );
                                })}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* Acabado de Madera (Techo) */}
                    {cfg.hasWood && (
                        <Box>
                            <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
                                Acabado de Estructura
                            </Text>
                            <SimpleGrid columns={2} gap="1.5">
                                {WOOD_FINISHES.map((w) => {
                                    const isSelected = wood === w.id;
                                    return (
                                        <Flex
                                            key={w.id}
                                            as="button"
                                            onClick={() => setWood(w.id)}
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
                                            <Box w="5" h="5" borderRadius="full" bg={w.color} border="1px solid rgba(0,0,0,0.2)" boxShadow="sm" />
                                            <Text fontSize="2xs" fontWeight={isSelected ? "bold" : "medium"} color="text.heading" truncate w="full" textAlign="center">
                                                {w.label}
                                            </Text>
                                        </Flex>
                                    );
                                })}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* Cubierta de Policarbonato (Techo) */}
                    {cfg.hasPoly && (
                        <Box>
                            <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
                                Cubierta de Policarbonato
                            </Text>
                            <SimpleGrid columns={2} gap="1.5">
                                {POLYCARBONATE_TYPES.map((p) => {
                                    const isSelected = poly === p.id;
                                    return (
                                        <Flex
                                            key={p.id}
                                            as="button"
                                            onClick={() => setPoly(p.id)}
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
                                            <Box w="5" h="5" borderRadius="full" bg={p.color} border="1px solid rgba(0,0,0,0.15)" boxShadow="sm" />
                                            <Text fontSize="2xs" fontWeight={isSelected ? "bold" : "medium"} color="text.heading" truncate w="full" textAlign="center">
                                                {p.label}
                                            </Text>
                                        </Flex>
                                    );
                                })}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* Tipo de Vidrio */}
                    {cfg.hasGlassType && (
                        <Box>
                            <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
                                Tipo de Vidrio
                            </Text>
                            <SimpleGrid columns={3} gap="1.5">
                                {GLASS_TYPES.map((g) => {
                                    const isSelected = glass === g.id;
                                    return (
                                        <Button
                                            key={g.id}
                                            size="xs"
                                            variant={isSelected ? "aura" : "outline"}
                                            onClick={() => setGlass(g.id)}
                                            borderRadius="lg"
                                            h="8"
                                            w="full"
                                            fontSize="2xs"
                                            fontWeight={isSelected ? "bold" : "medium"}
                                            justifyContent="center"
                                            px="1"
                                        >
                                            <Text truncate>{g.label}</Text>
                                        </Button>
                                    );
                                })}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* Color de Aluminio */}
                    {cfg.hasAluminum && (
                        <Box>
                            <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
                                Color de Aluminio
                            </Text>
                            <SimpleGrid columns={5} gap="1.5">
                                {FINISHES.map((f) => {
                                    const isSelected = finish === f.id;
                                    return (
                                        <Flex
                                            key={f.id}
                                            as="button"
                                            onClick={() => setFinish(f.id)}
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
                                            <Box w="5" h="5" borderRadius="full" bg={f.color} border="1px solid rgba(0,0,0,0.2)" boxShadow="sm" />
                                            <Text fontSize="2xs" fontWeight={isSelected ? "bold" : "medium"} color="text.heading" truncate w="full" textAlign="center">
                                                {f.label.replace(" Claro", "")}
                                            </Text>
                                        </Flex>
                                    );
                                })}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* Color de Vidrio */}
                    {cfg.hasGlassColor && (
                        <Box>
                            <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
                                Color de Vidrio
                            </Text>
                            <SimpleGrid columns={4} gap="1.5">
                                {GLASS_COLORS.map((gc) => {
                                    const isSelected = glassColor === gc.id;
                                    return (
                                        <Flex
                                            key={gc.id}
                                            as="button"
                                            onClick={() => setGlassColor(gc.id)}
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
                                            <Box w="5" h="5" borderRadius="full" bg={gc.colorHex} border="1px solid" borderColor="border.default" />
                                            <Text fontSize="2xs" fontWeight={isSelected ? "bold" : "medium"} color="text.heading" truncate w="full" textAlign="center">
                                                {gc.label}
                                            </Text>
                                        </Flex>
                                    );
                                })}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* Dimensiones */}
                    <Box>
                        <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" mb="1.5">
                            Dimensiones (m)
                        </Text>
                        <SimpleGrid columns={2} gap="2">
                            <Box>
                                <Text fontSize="9px" color="text.muted" mb="0.5">Ancho</Text>
                                <Input
                                    type="number"
                                    value={widthMeters}
                                    min={cfg.widthRange?.[0] ?? 0.5}
                                    max={cfg.widthRange?.[1] ?? 8.0}
                                    step={0.01}
                                    onChange={(e) => {
                                        const num = parseFloat(e.target.value);
                                        const minW = cfg.widthRange?.[0] ?? 0.5;
                                        const maxW = cfg.widthRange?.[1] ?? 8.0;
                                        if (!isNaN(num) && num >= minW && num <= maxW) setWidthMeters(num);
                                    }}
                                    size="xs"
                                    h="7"
                                    borderRadius="lg"
                                />
                            </Box>
                            <Box>
                                <Text fontSize="9px" color="text.muted" mb="0.5">{cfg.hasWood ? "Largo" : "Alto"}</Text>
                                <Input
                                    type="number"
                                    value={heightMeters}
                                    min={cfg.heightRange?.[0] ?? 0.5}
                                    max={cfg.heightRange?.[1] ?? 8.0}
                                    step={0.01}
                                    onChange={(e) => {
                                        const num = parseFloat(e.target.value);
                                        const minH = cfg.heightRange?.[0] ?? 0.5;
                                        const maxH = cfg.heightRange?.[1] ?? 8.0;
                                        if (!isNaN(num) && num >= minH && num <= maxH) setHeightMeters(num);
                                    }}
                                    size="xs"
                                    h="7"
                                    borderRadius="lg"
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
                        <Box
                            ref={canvasRef}
                            w="full"
                            h="full"
                            cursor="grab"
                            _active={{ cursor: "grabbing" }}
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
                                aria-label="Centrar Cámara"
                                title="Centrar Cámara"
                                onClick={resetCamera}
                                bg="surface.card"
                                borderRadius="lg"
                                boxShadow="sm"
                                color="text.body"
                                size="xs"
                                h="7"
                                w="7"
                                borderWidth="1px"
                                borderColor="border.default"
                                _hover={{ bg: "bg.subtle", color: "primary.500" }}
                            >
                                <Video size={13} />
                            </IconButton>
                            {cfg.hasOpenClose && (
                                <IconButton
                                    aria-label={isWindowOpen ? "Cerrar" : "Abrir"}
                                    title={isWindowOpen ? "Cerrar" : "Abrir"}
                                    onClick={() => setIsWindowOpen((prev) => !prev)}
                                    bg={isWindowOpen ? "primary.500" : "surface.card"}
                                    borderRadius="lg"
                                    boxShadow="sm"
                                    color={isWindowOpen ? "white" : "text.body"}
                                    size="xs"
                                    h="7"
                                    w="7"
                                    borderWidth="1px"
                                    borderColor={isWindowOpen ? "primary.500" : "border.default"}
                                    _hover={{ bg: isWindowOpen ? "primary.600" : "bg.subtle" }}
                                >
                                    <DoorOpen size={13} />
                                </IconButton>
                            )}
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
                            {cfg.hasWood ? (
                                <>
                                    Estructura con acabado <strong>{currentWoodLabel}</strong> y
                                    cubierta de policarbonato <strong>{currentPolyLabel}</strong> en tipo <strong>{currentWindowLabel}</strong>.
                                    Dimensiones: <strong>{widthMeters.toFixed(2)}m × {heightMeters.toFixed(2)}m</strong> ({(widthMeters * heightMeters).toFixed(2)} m²).
                                </>
                            ) : (
                                <>
                                    {cfg.hasSistemas ? (
                                        <>Sistema <strong>{currentSystemLabel}</strong> en tipo <strong>{currentWindowLabel}</strong>, </>
                                    ) : (
                                        <>{cfg.displayLabel} en tipo <strong>{currentWindowLabel}</strong>, </>
                                    )}
                                    {cfg.hasAluminum && (
                                        <>con perfil de aluminio en color <strong>{currentFinishLabel}</strong></>
                                    )}
                                    {cfg.hasGlassType && (
                                        <> y vidrio <strong>{currentGlassLabel}</strong></>
                                    )}
                                    {cfg.hasGlassColor && (
                                        <> tono <strong>{currentGlassColorLabel}</strong></>
                                    )}
                                    . Dimensiones: <strong>{widthMeters.toFixed(2)}m × {heightMeters.toFixed(2)}m</strong> ({(widthMeters * heightMeters).toFixed(2)} m²).
                                </>
                            )}
                        </Text>
                    </Box>
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export const ServiceConfigurator3DCard = VentanaConfigurador3DCard;
export default VentanaConfigurador3DCard;
