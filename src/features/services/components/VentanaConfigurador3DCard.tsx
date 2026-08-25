"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
    Box,
    Flex,
    IconButton,
    Text,
    SimpleGrid,
    HStack,
    VStack,
    Badge,
    Input,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { calcularPrecio } from "../utils/calculo-ventanas";
import ventanasCatalogo from "../data/ventanas-catalogo.json";
import { companyData } from "@/shared/config/company-data";
import {
    WINDOW_CATALOG,
    FINISHES,
    GLASS_TYPES,
    GLASS_COLORS,
    DIMENSION_PRESETS,
} from "./configurador3d/constants";
import {
    DoorOpen,
    Video,
    MessageCircle,
    Ruler,
    Layers,
    Sparkles,
    Check,
    Compass,
} from "lucide-react";

export const VentanaConfigurador3DCard: React.FC<{
    initialSystemId?: string;
}> = ({ initialSystemId = "sistema-nova" }) => {
    const [activeType, setActiveType] = useState<string>("corredizo");
    const [widthMeters, setWidthMeters] = useState(1.2);
    const [heightMeters, setHeightMeters] = useState(1.0);
    const [systemId, setSystemId] = useState(initialSystemId);
    const [finish, setFinish] = useState("negro");
    const [glass, setGlass] = useState("templado");
    const [glassColor, setGlassColor] = useState("incoloro");
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [price, setPrice] = useState(0);
    const [rotationAngle, setRotationAngle] = useState<{ azimuth: number; polar: number }>({ azimuth: 27, polar: 81 });

    // Sincronizar cuando cambia la selección externa del sistema en la cabecera
    useEffect(() => {
        if (initialSystemId) {
            setSystemId(initialSystemId);
        }
    }, [initialSystemId]);

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

    const availableSystems = useMemo(() => {
        return ventanasCatalogo.sistemas.filter((sys) =>
            sys.tiposDisponibles.some((t) => t.id === activeType),
        );
    }, [activeType]);

    const updatePrice = useCallback(() => {
        const cost = calcularPrecio({
            sistemaId: systemId,
            tipoId: activeType,
            acabadoAluminio: finish as import("../types/catalogo").AcabadoAluminioId,
            tipoVidrio: glass as import("../types/catalogo").TipoVidrioId,
            colorVidrio: glassColor as import("../types/catalogo").ColorVidrioId,
            anchoMm: width,
            altoMm: height,
        });
        setPrice(cost);
    }, [systemId, activeType, finish, glass, glassColor, width, height]);

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

        const windowGroup = new THREE.Group();
        const sashGroup = new THREE.Group();

        const w = width / 1000;
        const h = height / 1000;
        let depth = 0.05;
        let pW = 0.04;

        switch (systemId) {
            case "sistema-nova":
                depth = 0.04;
                pW = 0.035;
                break;
            case "sistema-serie-20":
                depth = 0.055;
                pW = 0.045;
                break;
            case "sistema-serie-25":
                depth = 0.07;
                pW = 0.055;
                break;
            case "sistema-serie-vl42":
                depth = 0.08;
                pW = 0.065;
                break;
            case "sistema-serie-37-38":
                depth = 0.09;
                pW = 0.075;
                break;
            case "sistema-serie-62-80":
                depth = 0.12;
                pW = 0.09;
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
                    transmission: isTinted ? 0.75 : 0.9,
                    opacity: 1,
                    transparent: true,
                    roughness: 0.05,
                    ior: 1.5,
                }),
                templado: new THREE.MeshPhysicalMaterial({
                    color: glassTint,
                    transmission: isTinted ? 0.8 : 0.95,
                    opacity: 1,
                    transparent: true,
                    roughness: 0.02,
                    ior: 1.52,
                }),
                laminado: new THREE.MeshPhysicalMaterial({
                    color: glassTint,
                    transmission: isTinted ? 0.7 : 0.85,
                    opacity: 1,
                    transparent: true,
                    roughness: 0.05,
                    ior: 1.5,
                    thickness: 0.5,
                }),
                pavonado: new THREE.MeshPhysicalMaterial({
                    color: isTinted ? glassTint : 0xffffff,
                    transmission: 0.35,
                    opacity: 0.85,
                    transparent: true,
                    roughness: 0.65,
                    ior: 1.45,
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
    }, [width, height, systemId, glassColor, finish, glass, activeType, createSash]);

    // Ciclo de vida Three.js
    useEffect(() => {
        if (!availableSystems.find((s) => s.id === systemId) && availableSystems.length > 0) {
            setSystemId(availableSystems[0].id);
        }
        updatePrice();

        const timer = setTimeout(() => {
            init3D();
            generate3DModel();
        }, 60);

        return () => {
            clearTimeout(timer);
            cleanup3D();
        };
    }, [activeType, init3D, cleanup3D, updatePrice, generate3DModel, availableSystems, systemId]);

    useEffect(() => {
        updatePrice();
        generate3DModel();
    }, [widthMeters, heightMeters, systemId, finish, glass, glassColor, updatePrice, generate3DModel]);

    const resetCamera = useCallback(() => {
        if (!cameraRef.current || !controlsRef.current) return;
        const maxDim = Math.max(width / 1000, height / 1000);
        const radius = maxDim * 1.5 + 1.2;
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
    }, [width, height]);

    const handleSendWhatsApp = useCallback(() => {
        const phone = companyData.whatsappNumber || "51999999999";
        const sys =
            ventanasCatalogo.sistemas.find((s) => s.id === systemId)?.nombre || systemId;
        const winName =
            WINDOW_CATALOG.find((w) => w.id === activeType)?.title || activeType;
        const glassName =
            GLASS_TYPES.find((g) => g.id === glass)?.label || glass;
        const glassColorName =
            GLASS_COLORS.find((c) => c.id === glassColor)?.label || glassColor;

        const text = `Hola ${companyData.companyName}, deseo cotizar el siguiente diseño configurado en 3D:%0A%0A*Tipo:* ${winName}%0A*Sistema:* ${sys}%0A*Medidas:* ${widthMeters.toFixed(2)}m ancho x ${heightMeters.toFixed(2)}m alto (${width}x${height} mm)%0A*Área:* ${(widthMeters * heightMeters).toFixed(2)} m²%0A*Acabado Perfil:* ${finish}%0A*Cristal:* ${glassName} (${glassColorName})%0A*Precio Estimado:* S/ ${price.toFixed(2)}%0A%0A¿Podrían confirmar tiempos de fabricación e instalación?`;

        window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
    }, [systemId, activeType, glass, glassColor, widthMeters, heightMeters, width, height, finish, price]);

    const currentWindow = useMemo(() => {
        return WINDOW_CATALOG.find((w) => w.id === activeType) || WINDOW_CATALOG[0];
    }, [activeType]);

    return (
        <Box
            w="full"
            bg={{ base: "transparent", md: "surface.card" }}
            borderRadius={{ base: "none", md: "3xl" }}
            borderWidth={{ base: "0px", md: "1px" }}
            borderColor="border.default"
            boxShadow={{ base: "none", md: "sm" }}
            overflow="hidden"
            position="relative"
        >
            {/* 1. Cabecera del Card con Selector de Pastillas (Pills) */}
            <Box
                p={{ base: "4", md: "6" }}
                px={{ base: "0", md: "6" }}
                borderBottomWidth="1px"
                borderColor="border.subtle"
                bg={{ base: "transparent", md: "bg.subtle" }}
            >
                <Flex
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align={{ base: "flex-start", md: "center" }}
                    gap="4"
                    mb="4"
                >
                    <VStack align="flex-start" gap="1">
                        <HStack gap="2">
                            <Sparkles size={18} className="text-primary-500" />
                            <Text
                                fontSize={{ base: "md", sm: "lg", md: "xl" }}
                                fontWeight="800"
                                letterSpacing="tight"
                                color="text.heading"
                            >
                                Estudio & Configurador 3D de Ventanas
                            </Text>
                        </HStack>
                        <Text fontSize="xs" color="text.muted">
                            {currentWindow.description}
                        </Text>
                    </VStack>

                    <Badge
                        colorPalette={currentWindow.colorPalette}
                        variant="surface"
                        borderRadius="full"
                        px="3"
                        py="1"
                        fontSize="xs"
                        fontWeight="bold"
                    >
                        {currentWindow.badge}
                    </Badge>
                </Flex>

                {/* Barra de Pastillas (Pill Chips) */}
                <HStack
                    gap="2"
                    overflowX="auto"
                    py="1"
                    w="full"
                    css={{
                        "&::-webkit-scrollbar": { display: "none" },
                        scrollbarWidth: "none",
                    }}
                >
                    {WINDOW_CATALOG.map((item) => {
                        const isSelected = activeType === item.id;
                        const IconComp = item.icon;
                        return (
                            <Button
                                key={item.id}
                                onClick={() => setActiveType(item.id)}
                                size={{ base: "sm", md: "sm" }}
                                variant={isSelected ? "aura" : "outline"}
                                borderRadius="full"
                                px="4"
                                flexShrink={0}
                                fontWeight={isSelected ? "bold" : "medium"}
                                transition="all 0.2s ease"
                                _hover={{
                                    transform: isSelected ? "none" : "translateY(-1px)",
                                }}
                            >
                                <IconComp size={15} style={{ marginRight: "6px" }} />
                                {item.title}
                            </Button>
                        );
                    })}
                </HStack>
            </Box>

            {/* 2. Cuerpo Principal Dividido: Visor 3D + Panel de Controles */}
            <Flex direction={{ base: "column", lg: "row" }} w="full" minH="500px">
                {/* Columna Izquierda: Visor 3D Three.js */}
                <Box
                    flex={{ base: "none", lg: "1.2" }}
                    position="relative"
                    bg="bg.page"
                    h={{ base: "340px", sm: "400px", lg: "auto" }}
                    w={{ base: "full", lg: "auto" }}
                    borderRightWidth={{ lg: "1px" }}
                    borderBottomWidth={{ base: "1px", lg: "0" }}
                    borderColor="border.subtle"
                    overflow="hidden"
                >
                    {/* Badge de Grados de Rotación 3D en Tiempo Real */}
                    <Flex
                        position="absolute"
                        top="4"
                        left="4"
                        bg="surface.card"
                        backdropFilter="blur(16px)"
                        borderRadius="full"
                        py="1.5"
                        px="3.5"
                        boxShadow="sm"
                        borderWidth="1px"
                        borderColor="border.default"
                        align="center"
                        gap="2"
                        zIndex="10"
                        pointerEvents="none"
                    >
                        <Compass size={14} className="text-primary-500" />
                        <Text fontSize="11px" fontWeight="bold" fontFamily="mono" color="text.heading">
                            {rotationAngle.azimuth}° <Text as="span" color="text.muted" fontWeight="normal">Azimut</Text>
                        </Text>
                        <Box w="1px" h="3" bg="border.subtle" />
                        <Text fontSize="11px" fontWeight="bold" fontFamily="mono" color="text.heading">
                            {rotationAngle.polar}° <Text as="span" color="text.muted" fontWeight="normal">Elev</Text>
                        </Text>
                    </Flex>

                    {/* Controles Flotantes 3D */}
                    <Flex
                        position="absolute"
                        top="4"
                        right="4"
                        direction="column"
                        gap="2"
                        zIndex="10"
                    >
                        <IconButton
                            aria-label="Centrar Cámara"
                            title="Centrar Cámara"
                            onClick={resetCamera}
                            bg="surface.card"
                            borderRadius="xl"
                            boxShadow="md"
                            color="text.body"
                            size="sm"
                            borderWidth="1px"
                            borderColor="border.default"
                            _hover={{
                                bg: "bg.subtle",
                                color: "primary.500",
                            }}
                        >
                            <Video size={16} />
                        </IconButton>
                        <IconButton
                            aria-label={isWindowOpen ? "Cerrar ventana" : "Abrir ventana"}
                            title={isWindowOpen ? "Cerrar ventana" : "Abrir ventana"}
                            onClick={() => setIsWindowOpen((prev) => !prev)}
                            bg={isWindowOpen ? "primary.500" : "surface.card"}
                            borderRadius="xl"
                            boxShadow="md"
                            color={isWindowOpen ? "white" : "text.body"}
                            size="sm"
                            borderWidth="1px"
                            borderColor={isWindowOpen ? "primary.500" : "border.default"}
                            _hover={{
                                bg: isWindowOpen ? "primary.600" : "bg.subtle",
                            }}
                        >
                            <DoorOpen size={16} />
                        </IconButton>
                    </Flex>

                    {/* Canvas 3D */}
                    <Box
                        ref={canvasRef}
                        w="full"
                        h="full"
                        cursor="grab"
                        _active={{ cursor: "grabbing" }}
                    />

                    {/* Badge Inferior de Medidas & Área */}
                    <Box
                        position="absolute"
                        bottom="4"
                        left="4"
                        right="4"
                        bg="surface.card"
                        backdropFilter="blur(16px)"
                        borderRadius="xl"
                        py="2.5"
                        px="4"
                        boxShadow="md"
                        borderWidth="1px"
                        borderColor="border.default"
                    >
                        <Flex align="center" justify="space-around">
                            <Box textAlign="center">
                                <Text fontSize="10px" color="text.muted" fontWeight="bold" textTransform="uppercase">
                                    Ancho
                                </Text>
                                <Text fontSize="xs" fontWeight="extrabold" color="text.heading">
                                    {widthMeters.toFixed(2)} m
                                </Text>
                            </Box>
                            <Box w="1px" h="5" bg="border.subtle" />
                            <Box textAlign="center">
                                <Text fontSize="10px" color="text.muted" fontWeight="bold" textTransform="uppercase">
                                    Alto
                                </Text>
                                <Text fontSize="xs" fontWeight="extrabold" color="text.heading">
                                    {heightMeters.toFixed(2)} m
                                </Text>
                            </Box>
                            <Box w="1px" h="5" bg="border.subtle" />
                            <Box textAlign="center">
                                <Text fontSize="10px" color="text.muted" fontWeight="bold" textTransform="uppercase">
                                    Área Total
                                </Text>
                                <Text fontSize="xs" fontWeight="extrabold" color="primary.500">
                                    {(widthMeters * heightMeters).toFixed(2)} m²
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                </Box>

                {/* Columna Derecha: Panel de Configuración & Precio */}
                <Flex
                    w={{ base: "full", lg: "420px", xl: "450px" }}
                    flexShrink={0}
                    bg={{ base: "transparent", md: "surface.card" }}
                    direction="column"
                    justify="space-between"
                >
                    <Box p={{ base: "4", md: "5" }} px={{ base: "0", md: "5" }} overflowY="auto" maxH={{ lg: "520px" }}>
                        <VStack gap="5" align="stretch">
                            {/* 1. Dimensiones */}
                            <Box>
                                <Flex align="center" justify="space-between" mb="2">
                                    <Flex align="center" gap="1.5">
                                        <Ruler size={15} className="text-primary-500" />
                                        <Text fontSize="xs" fontWeight="bold" color="text.heading" textTransform="uppercase" letterSpacing="wider">
                                            Dimensiones (Metros)
                                        </Text>
                                    </Flex>
                                    <Text fontSize="10px" color="text.muted" fontWeight="semibold">
                                        {width} × {height} mm
                                    </Text>
                                </Flex>

                                {/* Presets Rápidos de Medidas */}
                                <HStack gap="1.5" mb="3" wrap="wrap">
                                    {DIMENSION_PRESETS.map((preset) => {
                                        const isSelected =
                                            Math.abs(widthMeters - preset.width) < 0.01 &&
                                            Math.abs(heightMeters - preset.height) < 0.01;
                                        return (
                                            <Button
                                                key={preset.label}
                                                size="xs"
                                                variant={isSelected ? "aura" : "outline"}
                                                borderRadius="full"
                                                px="2.5"
                                                py="0"
                                                h="6"
                                                fontSize="10px"
                                                fontWeight={isSelected ? "bold" : "medium"}
                                                onClick={() => {
                                                    setWidthMeters(preset.width);
                                                    setHeightMeters(preset.height);
                                                }}
                                            >
                                                {preset.label}
                                            </Button>
                                        );
                                    })}
                                </HStack>

                                <SimpleGrid columns={2} gap="3">
                                    <Box>
                                        <Text fontSize="11px" color="text.muted" mb="1" fontWeight="medium">
                                            Ancho (m)
                                        </Text>
                                        <Input
                                            type="number"
                                            value={widthMeters}
                                            min={0.6}
                                            max={3.0}
                                            step={0.05}
                                            onChange={(e) => setWidthMeters(parseFloat(e.target.value) || 0.6)}
                                            size="sm"
                                            borderRadius="xl"
                                        />
                                    </Box>
                                    <Box>
                                        <Text fontSize="11px" color="text.muted" mb="1" fontWeight="medium">
                                            Alto (m)
                                        </Text>
                                        <Input
                                            type="number"
                                            value={heightMeters}
                                            min={0.6}
                                            max={3.0}
                                            step={0.05}
                                            onChange={(e) => setHeightMeters(parseFloat(e.target.value) || 0.6)}
                                            size="sm"
                                            borderRadius="xl"
                                        />
                                    </Box>
                                </SimpleGrid>
                            </Box>

                            {/* 2. Sistema de Perfilería */}
                            <Box>
                                <Flex align="center" gap="1.5" mb="2">
                                    <Layers size={15} className="text-primary-500" />
                                    <Text fontSize="xs" fontWeight="bold" color="text.heading" textTransform="uppercase" letterSpacing="wider">
                                        Sistema de Perfilería
                                    </Text>
                                </Flex>
                                <Flex wrap="wrap" gap="1.5">
                                    {availableSystems.map((sys) => {
                                        const isSelected = systemId === sys.id;
                                        return (
                                            <Button
                                                key={sys.id}
                                                size="xs"
                                                variant={isSelected ? "aura" : "outline"}
                                                onClick={() => setSystemId(sys.id)}
                                                borderRadius="full"
                                                px="3"
                                                py="1"
                                                fontWeight={isSelected ? "bold" : "medium"}
                                                transition="all 0.2s ease"
                                            >
                                                {sys.nombre}
                                            </Button>
                                        );
                                    })}
                                </Flex>
                            </Box>

                            {/* 3. Color de Perfil */}
                            <Box>
                                <Flex justify="space-between" align="center" mb="2">
                                    <Text fontSize="xs" fontWeight="bold" color="text.heading" textTransform="uppercase" letterSpacing="wider">
                                        Color de Perfil
                                    </Text>
                                    <Text fontSize="xs" color="primary.500" fontWeight="bold">
                                        {FINISHES.find((f) => f.id === finish)?.label}
                                    </Text>
                                </Flex>
                                <HStack gap="3">
                                    {FINISHES.map((f) => {
                                        const isSelected = finish === f.id;
                                        return (
                                            <Box
                                                key={f.id}
                                                as="button"
                                                onClick={() => setFinish(f.id)}
                                                w="8"
                                                h="8"
                                                borderRadius="full"
                                                bg={f.color}
                                                borderWidth={isSelected ? "3px" : "1.5px"}
                                                borderColor={isSelected ? "primary.500" : "border.default"}
                                                boxShadow={isSelected ? "0 0 0 2px var(--chakra-colors-primary-200)" : "sm"}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                cursor="pointer"
                                                transition="all 0.2s ease"
                                                _hover={{ transform: "scale(1.15)" }}
                                                aria-label={`Seleccionar color ${f.label}`}
                                            >
                                                {isSelected && (
                                                    <Check size={12} color={f.id === "blanco" ? "#000" : "#fff"} strokeWidth={3} />
                                                )}
                                            </Box>
                                        );
                                    })}
                                </HStack>
                            </Box>

                            {/* 4. Tipo de Vidrio & Color */}
                            <Box>
                                <Text fontSize="xs" fontWeight="bold" color="text.heading" textTransform="uppercase" letterSpacing="wider" mb="2">
                                    Cristal & Seguridad
                                </Text>
                                <VStack gap="2" align="stretch">
                                    {GLASS_TYPES.map((g: typeof GLASS_TYPES[0]) => {
                                        const isSelected = glass === g.id;
                                        return (
                                            <Flex
                                                key={g.id}
                                                p="2.5"
                                                borderRadius="xl"
                                                borderWidth="1px"
                                                borderColor={isSelected ? "primary.500" : "border.default"}
                                                bg={isSelected ? "bg.subtle" : "transparent"}
                                                justify="space-between"
                                                align="center"
                                                cursor="pointer"
                                                onClick={() => setGlass(g.id)}
                                                transition="all 0.2s ease"
                                            >
                                                <Box>
                                                    <Flex align="center" gap="2" mb="0.5">
                                                        <Text fontSize="xs" fontWeight="bold" color="text.heading">
                                                            {g.label} ({g.thickness})
                                                        </Text>
                                                        {g.badge && (
                                                            <Badge
                                                                size="xs"
                                                                colorPalette={g.colorPalette}
                                                                variant="subtle"
                                                                borderRadius="full"
                                                                fontSize="9px"
                                                                px="1.5"
                                                            >
                                                                {g.badge}
                                                            </Badge>
                                                        )}
                                                    </Flex>
                                                    <Text fontSize="10px" color="text.muted">
                                                        {g.desc}
                                                    </Text>
                                                </Box>
                                                {isSelected && <Check size={14} className="text-primary-500" />}
                                            </Flex>
                                        );
                                    })}
                                </VStack>
                            </Box>

                            {/* 5. Tono de Vidrio */}
                            <Box>
                                <Text fontSize="xs" fontWeight="bold" color="text.heading" textTransform="uppercase" letterSpacing="wider" mb="2">
                                    Tono del Cristal
                                </Text>
                                <HStack gap="2">
                                    {GLASS_COLORS.map((gc) => {
                                        const isSelected = glassColor === gc.id;
                                        return (
                                            <Button
                                                key={gc.id}
                                                size="xs"
                                                variant={isSelected ? "aura" : "outline"}
                                                onClick={() => setGlassColor(gc.id)}
                                                borderRadius="full"
                                                px="3"
                                            >
                                                <Box w="2.5" h="2.5" borderRadius="full" bg={gc.colorHex} mr="1.5" borderWidth="1px" borderColor="border.default" />
                                                {gc.label}
                                            </Button>
                                        );
                                    })}
                                </HStack>
                            </Box>
                        </VStack>
                    </Box>

                    {/* Footer Fijo de Cotización + Botón WhatsApp */}
                    <Box
                        p={{ base: "4", md: "5" }}
                        px={{ base: "0", md: "5" }}
                        bg={{ base: "transparent", md: "bg.subtle" }}
                        borderTopWidth="1px"
                        borderColor="border.subtle"
                    >
                        <Flex justify="space-between" align="center" mb="3">
                            <Box>
                                <Text fontSize="10px" color="text.muted" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                    Precio Estimado
                                </Text>
                                <Flex align="baseline" gap="1">
                                    <Text fontSize="sm" color="text.muted" fontWeight="bold">
                                        S/
                                    </Text>
                                    <Text fontSize="2xl" color="primary.500" fontWeight="black" lineHeight="1">
                                        {price.toFixed(2)}
                                    </Text>
                                </Flex>
                            </Box>
                            <Box textAlign="right">
                                <Text fontSize="10px" color="text.muted">
                                    Incluye IGV
                                </Text>
                                <Text fontSize="10px" color="text.muted">
                                    e Instalación
                                </Text>
                            </Box>
                        </Flex>

                        <Button
                            w="full"
                            size="lg"
                            variant="aura"
                            onClick={handleSendWhatsApp}
                            borderRadius="xl"
                            h="12"
                            fontWeight="800"
                            _hover={{
                                transform: "translateY(-1px)",
                                boxShadow: "lg",
                            }}
                            transition="all 0.2s"
                        >
                            <MessageCircle size={18} style={{ marginRight: "8px" }} />
                            Cotizar por WhatsApp
                        </Button>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
};

export default VentanaConfigurador3DCard;
