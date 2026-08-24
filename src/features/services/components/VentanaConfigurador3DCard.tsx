"use client";
import React, { useState, useEffect, useRef } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import {
    Box,
    Flex,
    IconButton,
    Text,
    SimpleGrid,
    HStack,
    VStack,
    Button,
    Badge,
    Input,
} from "@chakra-ui/react";
import {
    DialogRoot,
    DialogContent,
    DialogBody,
} from "@/components/ui/dialog";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { calcularPrecio } from "../utils/calculo-ventanas";
import ventanasCatalogo from "../data/ventanas-catalogo.json";
import { companyData } from "@/shared/config/company-data";
import {
    ArrowUp,
    ArrowRightLeft,
    DoorOpen,
    RotateCw,
    Square,
    Columns,
    Ruler,
    Layers,
    LayoutTemplate,
    Box as BoxIcon,
    Wrench,
    MessageCircle,
    Video,
    Check,
    ShieldCheck,
    Sparkles,
    X,
} from "lucide-react";

const WINDOW_CATALOG = [
    {
        id: "corredizo",
        title: "CORREDIZA",
        badge: "Más Popular",
        badgeBg: "green.50",
        badgeColor: "green.700",
        badgeBorder: "green.200",
        accentColor: "green.500",
        icon: ArrowRightLeft,
        description: "Se desliza horizontalmente sobre rieles inferiores.",
        mechanics: "Deslizamiento lateral sobre garruchas.",
        bullets: [
            "Ahorra espacio interior",
            "Fácil de usar y limpiar",
            "Ideal para mamparas y ventilación amplia",
        ],
    },
    {
        id: "proyectante",
        title: "PROYECTANTE",
        badge: "Ventilación",
        badgeBg: "orange.50",
        badgeColor: "orange.700",
        badgeBorder: "orange.200",
        accentColor: "orange.500",
        icon: ArrowUp,
        description: "Se proyecta hacia afuera desde la parte inferior.",
        mechanics: "Brazos de extensión laterales.",
        bullets: [
            "Ventilación constante",
            "Protege contra la lluvia",
            "Ideal para oficinas y baños",
        ],
    },
    {
        id: "batiente",
        title: "BATIENTE (ABATIBLE)",
        badge: "Hermética",
        badgeBg: "blue.50",
        badgeColor: "blue.700",
        badgeBorder: "blue.200",
        accentColor: "blue.500",
        icon: DoorOpen,
        description:
            "Se abre hacia el interior o exterior mediante bisagras laterales.",
        mechanics: "Giro sobre bisagras capuchinas/pesadas.",
        bullets: [
            "Máxima ventilación total",
            "Aislamiento acústico superior",
            "Fácil limpieza ambas caras",
        ],
    },
    {
        id: "pivotante",
        title: "PIVOTANTE",
        badge: "Diseño Top",
        badgeBg: "purple.50",
        badgeColor: "purple.700",
        badgeBorder: "purple.200",
        accentColor: "purple.500",
        icon: RotateCw,
        description: "Gira sobre un eje vertical u horizontal central.",
        mechanics: "Giro sobre pivotes de acero.",
        bullets: [
            "Apertura visualmente impactante",
            "Flujo de aire regulable",
            "Ideal para arquitectura moderna",
        ],
    },
    {
        id: "fija",
        title: "LUZ FIJA",
        badge: "Económica",
        badgeBg: "gray.100",
        badgeColor: "gray.700",
        badgeBorder: "gray.300",
        accentColor: "gray.600",
        icon: Square,
        description: "Panel inamovible para maximizar iluminación.",
        mechanics: "Cristal incrustado en marco sellado.",
        bullets: [
            "100% Hermética y acústica",
            "La opción más económica",
            "Máxima entrada de luz",
        ],
    },
    {
        id: "corrediza-4h",
        title: "CORREDIZA (4 HOJAS)",
        badge: "Grandes Espacios",
        badgeBg: "teal.50",
        badgeColor: "teal.700",
        badgeBorder: "teal.200",
        accentColor: "teal.500",
        icon: Columns,
        description: "Cuatro hojas (2 fijas en extremos, 2 móviles al centro).",
        mechanics: "Apertura central OXXO.",
        bullets: [
            "Ideal para frentes amplios",
            "Apertura central generosa",
            "Excelente simetría visual",
        ],
    },
    {
        id: "4-panos",
        title: "VENTANA 4 PAÑOS",
        badge: "Compuesta",
        badgeBg: "indigo.50",
        badgeColor: "indigo.700",
        badgeBorder: "indigo.200",
        accentColor: "indigo.500",
        icon: Layers,
        description: "Fijo superior, Fijo inferior y 2 hojas corredizas al centro.",
        mechanics: "Estructura compuesta multipaño.",
        bullets: [
            "Alturas que superan los 2.40m",
            "Seguridad en la parte inferior",
            "Diseño arquitectónico complejo",
        ],
    },
    {
        id: "fijo-corredizo",
        title: "FIJO + CORREDIZO",
        badge: "Versátil",
        badgeBg: "teal.50",
        badgeColor: "teal.700",
        badgeBorder: "teal.200",
        accentColor: "teal.500",
        icon: Columns,
        description:
            "Combinación de paño fijo superior y hojas corredizas inferiores.",
        mechanics: "Travesaño H dividiendo los paneles.",
        bullets: [
            "Luz superior constante",
            "Ventilación inferior controlada",
            "Ideal para vanos muy altos",
        ],
    },
];

const FINISHES = [
    { id: "natural", label: "Natural", color: "#dedfe3" },
    { id: "negro", label: "Negro", color: "#1A1A1A" },
    { id: "madera", label: "Madera", color: "#8B4513" },
    { id: "blanco", label: "Blanco", color: "#F8F9FA" },
    { id: "gris-claro", label: "Gris Claro", color: "#B0B4B8" },
];

const GLASS_TYPES = [
    {
        id: "crudo",
        label: "Vidrio Crudo",
        thickness: "6 mm",
        desc: "Económico y ligero",
    },
    {
        id: "templado",
        label: "Vidrio Templado",
        thickness: "6 mm",
        desc: "Alta resistencia al impacto",
    },
    {
        id: "laminado",
        label: "Vidrio Laminado",
        thickness: "(3+3) 6 mm",
        desc: "Aislamiento acústico y seguridad",
    },
];

const GLASS_COLORS = [
    {
        id: "incoloro",
        label: "Incoloro",
        colorHex: "#E8F4F8",
        border: "#CBD5E1",
        tint3d: 0xe8f4f8,
    },
    {
        id: "bronce",
        label: "Bronce",
        colorHex: "#8A5A36",
        border: "#78350F",
        tint3d: 0x966847,
    },
    {
        id: "gris",
        label: "Gris (Humo)",
        colorHex: "#4B5563",
        border: "#374151",
        tint3d: 0x475569,
    },
];

export const VentanaConfigurador3DCard = ({
    initialSystemId = "sistema-nova",
}: {
    initialSystemId?: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeType, setActiveType] = useState<string>("corredizo");
    const [widthMeters, setWidthMeters] = useState(1.2);
    const [heightMeters, setHeightMeters] = useState(1.0);
    const [systemId, setSystemId] = useState(initialSystemId);
    const [finish, setFinish] = useState("natural");
    const [glass, setGlass] = useState("templado");
    const [glassColor, setGlassColor] = useState("incoloro");
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [price, setPrice] = useState(0);

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
    const windowGroupRef = useRef<THREE.Group | null>(null);
    const sashGroupRef = useRef<THREE.Group | null>(null);
    const reqRef = useRef<number | null>(null);

    const availableSystems = ventanasCatalogo.sistemas.filter((sys) =>
        sys.tiposDisponibles.some((t) => t.id === activeType),
    );

    useEffect(() => {
        if (isOpen) {
            if (
                !availableSystems.find((s) => s.id === systemId) &&
                availableSystems.length > 0
            ) {
                setSystemId(availableSystems[0].id);
            }
            updatePrice();
            // Delay initialization slightly to let the dialog DOM mount
            const timer = setTimeout(() => {
                init3D();
                generate3DModel();
            }, 100);
            return () => clearTimeout(timer);
        } else {
            cleanup3D();
        }
    }, [isOpen, activeType]);

    useEffect(() => {
        if (isOpen) {
            updatePrice();
            generate3DModel();
        }
    }, [
        widthMeters,
        heightMeters,
        systemId,
        finish,
        glass,
        glassColor,
        isOpen,
    ]);

    const updatePrice = () => {
        const cost = calcularPrecio({
            sistemaId: systemId,
            tipoId: activeType,
            acabadoAluminio: finish as any,
            tipoVidrio: glass as any,
            colorVidrio: glassColor as any,
            anchoMm: width,
            altoMm: height,
        });
        setPrice(cost);
    };

    const handleOpenModal = (typeId: string) => {
        setActiveType(typeId);
        setIsOpen(true);
    };

    const cleanup3D = () => {
        if (reqRef.current) {
            cancelAnimationFrame(reqRef.current);
            reqRef.current = null;
        }
        if (controlsRef.current) {
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
    };

    const init3D = () => {
        if (rendererRef.current || !canvasRef.current) return;

        const container = canvasRef.current;
        const w = container.clientWidth || 500;
        const h = container.clientHeight || 450;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8fafc);
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
        camera.position.set(0, 0, 4);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
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
        controls.maxDistance = 10;
        controls.maxPolarAngle = Math.PI / 1.5;
        controlsRef.current = controls;

        // Iluminación tipo estudio idéntica al prototipo HTML
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 10, 7);
        dirLight.castShadow = true;
        scene.add(dirLight);

        const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.4);
        fillLight.position.set(-5, 0, -5);
        scene.add(fillLight);

        const grid = new THREE.GridHelper(10, 20, 0xcbd5e1, 0xe2e8f0);
        grid.position.y = -1.5;
        scene.add(grid);

        const animate = () => {
            reqRef.current = requestAnimationFrame(animate);
            if (controlsRef.current) controlsRef.current.update();

            const curType = activeTypeRef.current;
            const isOpenState = isWindowOpenRef.current;
            const curW = widthRef.current;
            const curH = heightRef.current;

            if (sashGroupRef.current && curType !== "fija") {
                const speed = 0.08;
                const pW = 0.04;
                const inW = curW / 1000 - pW * 2;
                const inH = curH / 1000 - pW * 2;
                const sW = inW / 2 + 0.02;
                const closedX = inW / 2 - sW / 2;
                const openX = -inW / 2 + sW / 2;
                const sash = sashGroupRef.current;

                if (curType === "corredizo") {
                    // Desliza entre su posición cerrada a la derecha y su posición abierta a la izquierda
                    const targetX = isOpenState ? openX : closedX;
                    sash.position.x += (targetX - sash.position.x) * speed;
                } else if (curType === "proyectante") {
                    const targetRot = isOpenState ? Math.PI / 6 : 0;
                    sash.rotation.x += (targetRot - sash.rotation.x) * speed;
                } else if (curType === "batiente") {
                    const targetRot = isOpenState ? -Math.PI / 3 : 0;
                    sash.rotation.y += (targetRot - sash.rotation.y) * speed;
                } else if (curType === "pivotante") {
                    const targetRot = isOpenState ? Math.PI / 2.5 : 0;
                    sash.rotation.y += (targetRot - sash.rotation.y) * speed;
                } else if (curType === "fijo-corredizo") {
                    const hBot = inH * 0.6;
                    const basePos = -inH / 2 + (hBot - pW / 2) / 2;
                    const targetY = isOpenState
                        ? basePos + hBot - 0.05
                        : basePos;
                    sash.position.y += (targetY - sash.position.y) * speed;
                }
            }

            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        };
        animate();

        // Escuchar cambios de tamaño del contenedor para ajustar el viewport 3D automáticamente
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
    };

    const createSash = (
        w: number,
        h: number,
        p: number,
        d: number,
        matA: any,
        matG: any,
    ) => {
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
    };

    const generate3DModel = () => {
        if (!sceneRef.current) return;
        if (windowGroupRef.current)
            sceneRef.current.remove(windowGroupRef.current);

        const windowGroup = new THREE.Group();
        const sashGroup = new THREE.Group();
        const sashGroup2 = new THREE.Group();

        const w = width / 1000;
        const h = height / 1000;
        let depth = 0.05;
        let pW = 0.04;
        switch (systemId) {
            case "sistema-nova":
                depth = 0.04; pW = 0.035; break;
            case "sistema-serie-20":
                depth = 0.055; pW = 0.045; break;
            case "sistema-serie-25":
                depth = 0.07; pW = 0.055; break;
            case "sistema-serie-vl42":
                depth = 0.08; pW = 0.065; break;
            case "sistema-serie-37-38":
                depth = 0.09; pW = 0.075; break;
            case "sistema-serie-62-80":
                depth = 0.12; pW = 0.09; break;
            default:
                depth = 0.05; pW = 0.04;
        }

        const selectedColorObj =
            GLASS_COLORS.find((c) => c.id === glassColor) || GLASS_COLORS[0];
        const glassTint = selectedColorObj.tint3d;
        const isTinted = glassColor !== "incoloro";

        const materials = {
            alum: {
                natural: new THREE.MeshStandardMaterial({
                    color: 0xcccccc,
                    metalness: 0.8,
                    roughness: 0.3,
                }),
                negro: new THREE.MeshStandardMaterial({
                    color: 0x1a1a1a,
                    metalness: 0.7,
                    roughness: 0.4,
                }),
                madera: new THREE.MeshStandardMaterial({
                    color: 0x5c3a21,
                    metalness: 0.1,
                    roughness: 0.8,
                }),
                blanco: new THREE.MeshStandardMaterial({
                    color: 0xf8f9fa,
                    metalness: 0.1,
                    roughness: 0.5,
                }),
                "gris-claro": new THREE.MeshStandardMaterial({
                    color: 0xb0b4b8,
                    metalness: 0.6,
                    roughness: 0.3,
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
                    color: 0xffffff,
                    transmission: 0.4,
                    opacity: 0.8,
                    transparent: true,
                    roughness: 0.6,
                    ior: 1.4,
                }),
            },
            dark: new THREE.MeshStandardMaterial({
                color: 0x222222,
                metalness: 0.5,
                roughness: 0.5,
            }),
        };

        const matAlum =
            materials.alum[finish as keyof typeof materials.alum] ||
            materials.alum.natural;
        const matGlass =
            materials.glass[glass as keyof typeof materials.glass] ||
            materials.glass.templado;

        // 1. Marco Exterior
        const frameGeoH = new THREE.BoxGeometry(w, pW, depth);
        const frameGeoV = new THREE.BoxGeometry(pW, h - pW * 2, depth);

        const mTop = new THREE.Mesh(frameGeoH, matAlum);
        mTop.position.y = h / 2 - pW / 2;
        const mBot = new THREE.Mesh(frameGeoH, matAlum);
        mBot.position.y = -h / 2 + pW / 2;
        const mLeft = new THREE.Mesh(frameGeoV, matAlum);
        mLeft.position.x = -w / 2 + pW / 2;
        const mRight = new THREE.Mesh(frameGeoV, matAlum);
        mRight.position.x = w / 2 - pW / 2;

        windowGroup.add(mTop, mBot, mLeft, mRight);

        // 2. Construcción de hojas
        const inW = w - pW * 2;
        const inH = h - pW * 2;
        const sashP = 0.03;
        const glassT = 0.006;

        if (activeType === "corredizo") {
            const sW = inW / 2 + 0.02;
            const sash1 = createSash(
                sW,
                inH,
                sashP,
                depth * 0.4,
                matAlum,
                matGlass,
            );
            sash1.position.set(-inW / 2 + sW / 2, 0, -depth * 0.2);
            sashGroup2.add(sash1);

            const sash2 = createSash(
                sW,
                inH,
                sashP,
                depth * 0.4,
                matAlum,
                matGlass,
            );
            sashGroup.position.set(inW / 2 - sW / 2, 0, depth * 0.2);
            sashGroup.add(sash2);

            // SEGURO PIVOT A ROSCA EXCLUSIVO DE SISTEMA NOVA (EN EL ZÓCALO INFERIOR)
            if (systemId === "sistema-nova") {
                const lockGroup = new THREE.Group();

                // 1. Placa base / roseta del seguro adosada al zócalo
                const basePlateGeo = new THREE.BoxGeometry(0.024, 0.024, 0.004);
                const lockMaterial = new THREE.MeshStandardMaterial({
                    color: finish === "negro" ? 0x111111 : 0xb8b8b8,
                    metalness: 0.85,
                    roughness: 0.25,
                });
                const basePlate = new THREE.Mesh(basePlateGeo, lockMaterial);
                basePlate.position.set(0, 0, 0.002);
                lockGroup.add(basePlate);

                // 2. Cilindro roscado / cuerpo del seguro
                const bodyGeo = new THREE.CylinderGeometry(
                    0.008,
                    0.008,
                    0.018,
                    16,
                );
                bodyGeo.rotateX(Math.PI / 2);
                const bodyMesh = new THREE.Mesh(bodyGeo, lockMaterial);
                bodyMesh.position.set(0, 0, 0.012);
                lockGroup.add(bodyMesh);

                // 3. Perilla moleteada / cabezal de giro a rosca
                const knobGeo = new THREE.CylinderGeometry(
                    0.011,
                    0.011,
                    0.008,
                    16,
                );
                knobGeo.rotateX(Math.PI / 2);
                const knobMesh = new THREE.Mesh(knobGeo, lockMaterial);
                knobMesh.position.set(0, 0, 0.022);
                lockGroup.add(knobMesh);

                // 4. Pin / perno de trabado inferior hacia el riel
                const pinGeo = new THREE.CylinderGeometry(
                    0.0035,
                    0.0035,
                    0.014,
                    12,
                );
                const pinMesh = new THREE.Mesh(
                    pinGeo,
                    new THREE.MeshStandardMaterial({
                        color: 0x888888,
                        metalness: 0.9,
                        roughness: 0.2,
                    }),
                );
                pinMesh.position.set(0, -0.01, 0.01);
                lockGroup.add(pinMesh);

                // Ubicación en el CENTRO del zócalo de la hoja móvil
                lockGroup.position.set(
                    0,
                    -inH / 2 + sashP / 2,
                    depth * 0.2,
                );
                sashGroup.add(lockGroup);
            }

            // Tirador embutido / manija lateral de enganche (NO existe en Sistema Nova)
            if (systemId !== "sistema-nova") {
                const handleGeo = new THREE.BoxGeometry(0.012, 0.14, 0.014);
                const handleMat = new THREE.MeshStandardMaterial({
                    color: finish === "negro" ? 0x111111 : 0x444444,
                    metalness: 0.6,
                    roughness: 0.4,
                });
                const handle = new THREE.Mesh(handleGeo, handleMat);
                handle.position.set(-sW / 2 + 0.025, 0, depth * 0.22);
                sashGroup.add(handle);
            }
        } else if (activeType === "corrediza-4h") {
            const sW = inW / 4 + sashP / 2;
            const sash1 = createSash(sW, inH, sashP, depth * 0.4, matAlum, matGlass);
            const sash2 = createSash(sW, inH, sashP, depth * 0.4, matAlum, matGlass);
            const sash3 = createSash(sW, inH, sashP, depth * 0.4, matAlum, matGlass);
            const sash4 = createSash(sW, inH, sashP, depth * 0.4, matAlum, matGlass);

            sash1.position.set(-inW / 2 + sW / 2, 0, depth * -0.2);
            sash2.position.set(-sW / 2 + sashP / 4, 0, depth * 0.2);
            sash3.position.set(sW / 2 - sashP / 4, 0, depth * 0.2);
            sash4.position.set(inW / 2 - sW / 2, 0, depth * -0.2);

            sashGroup.add(sash1);
            sashGroup.add(sash2);
            sashGroup.add(sash3);
            sashGroup.add(sash4);

            if (systemId === "sistema-nova") {
                // Two pivot locks in the center for OXXO
                const lockMat = new THREE.MeshStandardMaterial({ color: finish === "negro" ? 0x111111 : 0xb8b8b8, metalness: 0.85, roughness: 0.25 });
                const baseGeo = new THREE.BoxGeometry(0.024, 0.024, 0.004);
                
                const lock1 = new THREE.Mesh(baseGeo, lockMat);
                lock1.position.set(-sW / 2 + sashP / 4, -inH / 2 + sashP / 2, depth * 0.2);
                
                const lock2 = new THREE.Mesh(baseGeo, lockMat);
                lock2.position.set(sW / 2 - sashP / 4, -inH / 2 + sashP / 2, depth * 0.2);
                
                sashGroup.add(lock1);
                sashGroup.add(lock2);
            }

        } else if (activeType === "4-panos") {
            const hTop = inH * 0.2;
            const hMid = inH * 0.4;
            const hBot = inH * 0.4;

            const sashTop = createSash(inW, hTop, sashP, depth * 0.6, matAlum, matGlass);
            sashTop.position.set(0, inH / 2 - hTop / 2, 0);
            sashGroup.add(sashTop);

            const sashBot = createSash(inW, hBot, sashP, depth * 0.6, matAlum, matGlass);
            sashBot.position.set(0, -inH / 2 + hBot / 2, 0);
            sashGroup.add(sashBot);

            const sW = inW / 2 + sashP / 2;
            const sashMid1 = createSash(sW, hMid, sashP, depth * 0.4, matAlum, matGlass);
            const sashMid2 = createSash(sW, hMid, sashP, depth * 0.4, matAlum, matGlass);
            
            sashMid1.position.set(-inW / 2 + sW / 2, inH / 2 - hTop - hMid / 2, depth * 0.2);
            sashMid2.position.set(inW / 2 - sW / 2, inH / 2 - hTop - hMid / 2, depth * -0.2);

            sashGroup.add(sashMid1);
            sashGroup.add(sashMid2);

        } else if (activeType === "fijo-corredizo") {
            const hTop = inH * 0.4;
            const hBot = inH * 0.6;

            const hBar = new THREE.Mesh(
                new THREE.BoxGeometry(inW, pW, depth),
                matAlum,
            );
            hBar.position.y = inH / 2 - hTop - pW / 2;
            windowGroup.add(hBar);

            const fixGGeo = new THREE.BoxGeometry(inW, hTop, glassT);
            const fixG = new THREE.Mesh(fixGGeo, matGlass);
            fixG.position.y = inH / 2 - hTop / 2;
            windowGroup.add(fixG);

            const sW = inW;
            const sash2 = createSash(
                sW,
                hBot - pW / 2,
                sashP,
                depth * 0.6,
                matAlum,
                matGlass,
            );
            sashGroup.position.set(0, -inH / 2 + (hBot - pW / 2) / 2, 0);
            sashGroup.add(sash2);
        } else if (activeType === "proyectante" || activeType === "batiente") {
            const sash1 = createSash(
                inW,
                inH,
                sashP,
                depth * 0.8,
                matAlum,
                matGlass,
            );
            sashGroup.add(sash1);

            if (activeType === "proyectante") {
                sashGroup.position.set(0, inH / 2, 0);
                sash1.position.set(0, -inH / 2, 0);
            } else {
                sashGroup.position.set(-inW / 2, 0, 0);
                sash1.position.set(inW / 2, 0, 0);
            }

            const handle = new THREE.Mesh(
                new THREE.BoxGeometry(0.015, 0.1, 0.03),
                materials.dark,
            );
            if (activeType === "proyectante")
                handle.position.set(0, -inH / 2 + 0.05, 0.02);
            else handle.position.set(inW / 2 - 0.05, 0, 0.02);
            sash1.add(handle);
        } else if (activeType === "pivotante") {
            const sash1 = createSash(
                inW,
                inH,
                sashP,
                depth * 0.8,
                matAlum,
                matGlass,
            );
            sashGroup.add(sash1);
        } else {
            const fixGGeo = new THREE.BoxGeometry(inW, inH, glassT);
            const fixG = new THREE.Mesh(fixGGeo, matGlass);
            windowGroup.add(fixG);
        }

        windowGroup.add(sashGroup2);
        windowGroup.add(sashGroup);

        windowGroup.position.y = 0;

        // Añadir bordes/sombras (outline) a los perfiles de aluminio para que se distingan mejor
        windowGroup.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material === matAlum) {
                const edges = new THREE.EdgesGeometry(child.geometry);
                const edgeColor = (finish === "negro" || finish === "madera") ? 0x444444 : 0x9ca3af;
                const line = new THREE.LineSegments(
                    edges,
                    new THREE.LineBasicMaterial({ color: edgeColor, linewidth: 1 })
                );
                child.add(line);
            }
        });

        if (cameraRef.current && controlsRef.current) {
            const maxDim = Math.max(w, h);
            cameraRef.current.position.z = maxDim * 1.5 + 1;
            controlsRef.current.target.set(0, 0, 0);
        }

        sceneRef.current.add(windowGroup);
        windowGroupRef.current = windowGroup;
        sashGroupRef.current = sashGroup;
    };

    const resetCamera = () => {
        if (!cameraRef.current || !controlsRef.current) return;
        const maxDim = Math.max(width / 1000, height / 1000);
        cameraRef.current.position.set(0, 0, maxDim * 1.5 + 1);
        controlsRef.current.target.set(0, 0, 0);
    };

    const handleSendWhatsApp = () => {
        const phone = companyData.whatsappNumber || "51999999999";
        const sys =
            ventanasCatalogo.sistemas.find((s) => s.id === systemId)?.nombre ||
            systemId;
        const winName =
            WINDOW_CATALOG.find((w) => w.id === activeType)?.title ||
            activeType;

        const glassName =
            GLASS_TYPES.find((g) => g.id === glass)?.label || glass;
        const glassColorName =
            GLASS_COLORS.find((c) => c.id === glassColor)?.label || glassColor;

        const text = `Hola ${companyData.companyName}, deseo cotizar el siguiente diseño de su catálogo web:%0A%0A*Tipo:* ${winName}%0A*Sistema:* ${sys}%0A*Medidas:* ${widthMeters.toFixed(2)}m ancho x ${heightMeters.toFixed(2)}m alto (${width}x${height} mm)%0A*Acabado:* ${finish}%0A*Cristal:* ${glassName} (${glassColorName})%0A*Precio Ref:* S/ ${price.toFixed(2)}%0A%0A¿Podrían confirmar tiempos de entrega?`;

        window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
    };

    const currentWindow =
        WINDOW_CATALOG.find((w) => w.id === activeType) || WINDOW_CATALOG[0];

    return (
        <Box>
            {/* Header Banner - Chakra UI */}
            <Box
                p={{ base: "6", md: "8" }}
                bg="gray.900"
                color="white"
                borderRadius="3xl"
                mb="8"
                position="relative"
                overflow="hidden"
            >
                <Box
                    position="absolute"
                    inset="0"
                    opacity="0.15"
                    backgroundImage="url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')"
                    backgroundSize="cover"
                    backgroundPosition="center"
                />
                <Box
                    position="absolute"
                    inset="0"
                    bgGradient="to-r"
                    gradientFrom="gray.900"
                    gradientVia="gray.900/90"
                    gradientTo="transparent"
                />
                <Box position="relative" zIndex="1" maxW="7xl">
                    <Text
                        fontSize={{ base: "2xl", sm: "4xl", md: "5xl" }}
                        fontWeight="extrabold"
                        mb="3"
                        letterSpacing="tight"
                    >
                        Catálogo Interactivo de Ventanas
                    </Text>
                    <Text
                        fontSize={{ base: "sm", md: "md" }}
                        color="gray.300"
                        maxW="2xl"
                    >
                        Conoce las características, diseña a medida en 3D y
                        obtén una cotización al instante con los mejores
                        perfiles de aluminio del mercado peruano.
                    </Text>
                </Box>
            </Box>

            {/* Grid de Productos - Alineación y Espaciados Optimizados */}
            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                gap={{ base: "4", md: "6" }}
                alignItems="stretch"
            >
                {WINDOW_CATALOG.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <Box
                            key={item.id}
                            bg="white"
                            borderRadius="2xl"
                            boxShadow="0 2px 12px rgba(0,0,0,0.04)"
                            borderWidth="1px"
                            borderColor="gray.200"
                            overflow="hidden"
                            display="flex"
                            flexDirection="column"
                            cursor="pointer"
                            transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                            role="group"
                            _hover={{
                                transform: "translateY(-4px)",
                                boxShadow: "0 12px 28px rgba(0,0,0,0.09)",
                                borderColor: "blue.300",
                            }}
                            onClick={() => handleOpenModal(item.id)}
                        >
                            {/* Barra superior de acento */}
                            <Box bg={item.accentColor} h="3.5px" w="full" />

                            <Flex
                                p={{ base: "5", md: "6" }}
                                flex="1"
                                direction="column"
                            >
                                {/* Cabecera del Card: Icono + Badge alineados */}
                                <Flex
                                    justify="space-between"
                                    align="center"
                                    mb="4"
                                >
                                    <Flex
                                        w="11"
                                        h="11"
                                        borderRadius="xl"
                                        bg="gray.50"
                                        align="center"
                                        justify="center"
                                        color="gray.700"
                                        borderWidth="1px"
                                        borderColor="gray.200"
                                        transition="all 0.3s ease"
                                        _groupHover={{
                                            bg: "blue.50",
                                            color: "blue.600",
                                            borderColor: "blue.200",
                                            transform: "scale(1.05)",
                                        }}
                                    >
                                        <IconComponent size={20} />
                                    </Flex>
                                    <Badge
                                        bg={item.badgeBg}
                                        color={item.badgeColor}
                                        borderColor={item.badgeBorder}
                                        borderWidth="1px"
                                        px="2.5"
                                        py="0.5"
                                        borderRadius="full"
                                        fontSize="11px"
                                        fontWeight="bold"
                                        letterSpacing="0.02em"
                                    >
                                        {item.badge}
                                    </Badge>
                                </Flex>

                                {/* Título y Descripción */}
                                <Text
                                    fontSize="lg"
                                    fontWeight="bold"
                                    color="gray.900"
                                    mb="1.5"
                                    letterSpacing="tight"
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    fontSize="xs"
                                    color="gray.500"
                                    mb="4"
                                    lineHeight="tall"
                                    minH="36px"
                                >
                                    {item.description}
                                </Text>

                                {/* Lista de características y mecánica */}
                                <Box
                                    mt="auto"
                                    pt="3"
                                    borderTopWidth="1px"
                                    borderColor="gray.100"
                                >
                                    <Flex
                                        align="center"
                                        gap="2"
                                        fontSize="xs"
                                        fontWeight="semibold"
                                        color="gray.700"
                                        mb="2.5"
                                    >
                                        <Wrench size={13} color="#0284c7" />
                                        <Text fontSize="11px">
                                            {item.mechanics}
                                        </Text>
                                    </Flex>
                                    <VStack align="start" gap="1.5">
                                        {item.bullets.map((b, i) => (
                                            <Flex
                                                key={i}
                                                align="flex-start"
                                                gap="1.5"
                                            >
                                                <Box
                                                    w="1.5"
                                                    h="1.5"
                                                    borderRadius="full"
                                                    bg="blue.500"
                                                    mt="1.5"
                                                    flexShrink={0}
                                                />
                                                <Text
                                                    fontSize="11px"
                                                    color="gray.600"
                                                    lineHeight="short"
                                                >
                                                    {b}
                                                </Text>
                                            </Flex>
                                        ))}
                                    </VStack>
                                </Box>
                            </Flex>

                            {/* Botón / Footer del Card */}
                            <Flex
                                px="6"
                                py="3.5"
                                bg="gray.50"
                                borderTopWidth="1px"
                                borderColor="gray.100"
                                justify="space-between"
                                align="center"
                                transition="all 0.2s ease"
                                _groupHover={{ bg: "blue.50/60" }}
                            >
                                <Text
                                    fontSize="xs"
                                    fontWeight="bold"
                                    color="gray.700"
                                    _groupHover={{ color: "blue.600" }}
                                >
                                    Diseñar y Cotizar en 3D
                                </Text>
                                <BoxIcon size={15} color="#0284c7" />
                            </Flex>
                        </Box>
                    );
                })}
            </SimpleGrid>

            {/* Modal 3D Dialog - Usando Chakra Dialog V3 nativo con Scroll Interno y Footer Fijo */}
            <DialogRoot
                open={isOpen}
                onOpenChange={(details) => setIsOpen(details.open)}
                placement="center"
            >
                <DialogContent
                    w={{ base: "100vw", lg: "92vw", xl: "1240px" }}
                    maxW={{ base: "100vw", lg: "1240px" }}
                    h={{ base: "100dvh", lg: "88vh" }}
                    maxH={{ base: "100dvh", lg: "860px" }}
                    m={{ base: 0, lg: "auto" }}
                    borderRadius={{ base: "0", lg: "2xl" }}
                    overflow="hidden"
                    p="0"
                    bg="white"
                    boxShadow="2xl"
                    display="flex"
                    flexDirection="column"
                >
                    <DialogBody p="0" flex="1" overflow="hidden" display="flex" minH="0">
                        <Flex
                            direction={{ base: "column", lg: "row" }}
                            w="full"
                            h="full"
                            minH="0"
                            overflow="hidden"
                        >
                            {/* Columna Izquierda: Visor 3D Three.js */}
                            <Box
                                flex={{ base: "none", lg: "1" }}
                                position="relative"
                                bg="gray.100"
                                h={{ base: "260px", sm: "300px", lg: "100%" }}
                                w={{ base: "full", lg: "auto" }}
                                borderRightWidth={{ lg: "1px" }}
                                borderBottomWidth={{ base: "1px", lg: "0" }}
                                borderColor="gray.200"
                                overflow="hidden"
                            >
                                {/* Botón de Cierre (X) dentro del panel izquierdo (3D) */}
                                <IconButton
                                    aria-label="Cerrar modal"
                                    title="Cerrar modal"
                                    onClick={() => setIsOpen(false)}
                                    position="absolute"
                                    top="3"
                                    left="3"
                                    zIndex="20"
                                    bg="white"
                                    borderRadius="lg"
                                    boxShadow="md"
                                    color="gray.700"
                                    size="xs"
                                    w="8"
                                    h="8"
                                    _hover={{
                                        bg: "red.50",
                                        color: "red.600",
                                    }}
                                >
                                    <X size={15} />
                                </IconButton>

                                <Box
                                    ref={canvasRef}
                                    w="full"
                                    h="full"
                                    cursor="grab"
                                    _active={{ cursor: "grabbing" }}
                                />

                                {/* Controles Flotantes 3D */}
                                <Flex
                                    position="absolute"
                                    top="3"
                                    right="3"
                                    direction="column"
                                    gap="2"
                                    zIndex="10"
                                >
                                    <IconButton
                                        aria-label="Centrar Cámara"
                                        title="Centrar Cámara"
                                        onClick={resetCamera}
                                        bg="white"
                                        borderRadius="lg"
                                        boxShadow="md"
                                        color="gray.700"
                                        size="xs"
                                        w="8"
                                        h="8"
                                        _hover={{
                                            bg: "gray.50",
                                            color: "blue.600",
                                        }}
                                    >
                                        <Video size={15} />
                                    </IconButton>
                                    <IconButton
                                        aria-label={
                                            isWindowOpen
                                                ? "Cerrar ventana"
                                                : "Abrir ventana"
                                        }
                                        title={
                                            isWindowOpen
                                                ? "Cerrar ventana"
                                                : "Abrir ventana"
                                        }
                                        onClick={() =>
                                            setIsWindowOpen((prev) => !prev)
                                        }
                                        bg={isWindowOpen ? "blue.600" : "white"}
                                        borderRadius="lg"
                                        boxShadow="md"
                                        color={
                                            isWindowOpen ? "white" : "gray.700"
                                        }
                                        size="xs"
                                        w="8"
                                        h="8"
                                        _hover={{
                                            bg: isWindowOpen
                                                ? "blue.700"
                                                : "gray.50",
                                            color: isWindowOpen
                                                ? "white"
                                                : "blue.600",
                                        }}
                                    >
                                        <DoorOpen size={15} />
                                    </IconButton>
                                </Flex>

                                {/* Badge Inferior de Medidas */}
                                <Box
                                    position="absolute"
                                    bottom="3"
                                    left="3"
                                    right="3"
                                    bg="rgba(255, 255, 255, 0.94)"
                                    backdropFilter="blur(8px)"
                                    borderRadius="lg"
                                    py="2"
                                    px="3"
                                    boxShadow="sm"
                                    borderWidth="1px"
                                    borderColor="gray.200"
                                >
                                    <Flex align="center" justify="space-around">
                                        <Box textAlign="center">
                                            <Text
                                                fontSize="9px"
                                                color="gray.500"
                                                fontWeight="bold"
                                                textTransform="uppercase"
                                                letterSpacing="wider"
                                            >
                                                Ancho
                                            </Text>
                                            <Text
                                                fontSize="xs"
                                                fontWeight="extrabold"
                                                color="gray.800"
                                            >
                                                {widthMeters.toFixed(2)} m
                                            </Text>
                                        </Box>
                                        <Box w="1px" h="5" bg="gray.300" />
                                        <Box textAlign="center">
                                            <Text
                                                fontSize="9px"
                                                color="gray.500"
                                                fontWeight="bold"
                                                textTransform="uppercase"
                                                letterSpacing="wider"
                                            >
                                                Alto
                                            </Text>
                                            <Text
                                                fontSize="xs"
                                                fontWeight="extrabold"
                                                color="gray.800"
                                            >
                                                {heightMeters.toFixed(2)} m
                                            </Text>
                                        </Box>
                                        <Box w="1px" h="5" bg="gray.300" />
                                        <Box textAlign="center">
                                            <Text
                                                fontSize="9px"
                                                color="gray.500"
                                                fontWeight="bold"
                                                textTransform="uppercase"
                                                letterSpacing="wider"
                                            >
                                                Área
                                            </Text>
                                            <Text
                                                fontSize="xs"
                                                fontWeight="extrabold"
                                                color="gray.800"
                                            >
                                                {(
                                                    widthMeters * heightMeters
                                                ).toFixed(2)}{" "}
                                                m²
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Box>

                            {/* Columna Derecha: Controles Scrolleables + Footer Fijo */}
                            <Flex
                                w={{ base: "full", lg: "400px", xl: "420px" }}
                                flexShrink={0}
                                bg="white"
                                direction="column"
                                h="full"
                                minH="0"
                            >
                                {/* Zona con scroll para controles */}
                                <Box flex="1" overflowY="auto" p="5" minH="0">
                                    <VStack gap="4" align="stretch">
                                        {/* Dimensiones en Metros */}
                                        <Box>
                                            <Flex
                                                align="center"
                                                justify="space-between"
                                                mb="1.5"
                                            >
                                                <Flex align="center" gap="1.5">
                                                    <Ruler
                                                        size={14}
                                                        color="#0284c7"
                                                    />
                                                    <Text
                                                        fontSize="xs"
                                                        fontWeight="bold"
                                                        color="gray.800"
                                                        textTransform="uppercase"
                                                        letterSpacing="wider"
                                                    >
                                                        Dimensiones (Metros)
                                                    </Text>
                                                </Flex>
                                                <Text
                                                    fontSize="10px"
                                                    color="gray.400"
                                                    fontWeight="medium"
                                                >
                                                    {width} × {height} mm
                                                </Text>
                                            </Flex>
                                            <SimpleGrid columns={2} gap="2.5">
                                                <Box>
                                                    <Text
                                                        fontSize="11px"
                                                        color="gray.500"
                                                        mb="1"
                                                        fontWeight="medium"
                                                    >
                                                        Ancho (m)
                                                    </Text>
                                                    <Input
                                                        type="number"
                                                        value={widthMeters}
                                                        min={0.6}
                                                        max={3.0}
                                                        step={0.05}
                                                        onChange={(e) =>
                                                            setWidthMeters(
                                                                parseFloat(
                                                                    e.target
                                                                        .value,
                                                                ) || 0.6,
                                                            )
                                                        }
                                                        size={{
                                                            base: "md",
                                                            lg: "sm",
                                                        }}
                                                        borderRadius="lg"
                                                    />
                                                </Box>
                                                <Box>
                                                    <Text
                                                        fontSize="11px"
                                                        color="gray.500"
                                                        mb="1"
                                                        fontWeight="medium"
                                                    >
                                                        Alto (m)
                                                    </Text>
                                                    <Input
                                                        type="number"
                                                        value={heightMeters}
                                                        min={0.6}
                                                        max={3.0}
                                                        step={0.05}
                                                        onChange={(e) =>
                                                            setHeightMeters(
                                                                parseFloat(
                                                                    e.target
                                                                        .value,
                                                                ) || 0.6,
                                                            )
                                                        }
                                                        size={{
                                                            base: "md",
                                                            lg: "sm",
                                                        }}
                                                        borderRadius="lg"
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                        </Box>

                                        {/* Tipo de Diseño - Píldoras */}
                                        <Box mb="4">
                                            <Flex
                                                align="center"
                                                gap="1.5"
                                                mb="2"
                                            >
                                                <LayoutTemplate color="gray.500" size={14} />
                                                <Text
                                                    fontSize="xs"
                                                    fontWeight="700"
                                                    color="gray.500"
                                                    textTransform="uppercase"
                                                    letterSpacing="wider"
                                                >
                                                    Tipo de Diseño
                                                </Text>
                                            </Flex>
                                            <Flex wrap="wrap" gap="1.5">
                                                {WINDOW_CATALOG.map((item) => {
                                                    const isSelected = activeType === item.id;
                                                    return (
                                                        <Tooltip key={item.id} content={item.description}>
                                                            <Button
                                                                size="sm"
                                                                variant={isSelected ? "solid" : "outline"}
                                                                colorPalette={isSelected ? "blue" : "gray"}
                                                                onClick={() => setActiveType(item.id)}
                                                                borderRadius="full"
                                                                px="3"
                                                                py="1"
                                                                h="auto"
                                                                fontSize="xs"
                                                                fontWeight="500"
                                                                transition="all 0.2s"
                                                                _hover={{
                                                                    transform: "translateY(-1px)",
                                                                    shadow: "sm"
                                                                }}
                                                            >
                                                                {item.title}
                                                            </Button>
                                                        </Tooltip>
                                                    );
                                                })}
                                            </Flex>
                                        </Box>

                                        {/* Sistema de Aluminio - Píldoras */}
                                        <Box>
                                            <Flex
                                                align="center"
                                                gap="1.5"
                                                mb="2"
                                            >
                                                <Layers
                                                    size={14}
                                                    color="#0284c7"
                                                />
                                                <Text
                                                    fontSize="xs"
                                                    fontWeight="bold"
                                                    color="gray.800"
                                                    textTransform="uppercase"
                                                    letterSpacing="wider"
                                                >
                                                    Sistema de Perfilería
                                                </Text>
                                            </Flex>
                                            <Flex wrap="wrap" gap="1.5">
                                                {availableSystems.map((sys) => {
                                                    const isSelected =
                                                        systemId === sys.id;
                                                    return (
                                                        <Button
                                                            key={sys.id}
                                                            size={{
                                                                base: "sm",
                                                                lg: "xs",
                                                            }}
                                                            variant={
                                                                isSelected
                                                                    ? "solid"
                                                                    : "outline"
                                                            }
                                                            colorPalette={
                                                                isSelected
                                                                    ? "blue"
                                                                    : "gray"
                                                            }
                                                            onClick={() =>
                                                                setSystemId(
                                                                    sys.id,
                                                                )
                                                            }
                                                            borderRadius="full"
                                                            px="3"
                                                            py="1"
                                                            fontSize="11px"
                                                            fontWeight={
                                                                isSelected
                                                                    ? "bold"
                                                                    : "medium"
                                                            }
                                                            transition="all 0.2s ease"
                                                        >
                                                            {sys.nombre}
                                                        </Button>
                                                    );
                                                })}
                                            </Flex>
                                        </Box>

                                        {/* Color de Perfil: Círculos / Esferas */}
                                        <Box>
                                            <Flex
                                                justify="space-between"
                                                align="center"
                                                mb="2"
                                            >
                                                <Text
                                                    fontSize="xs"
                                                    fontWeight="bold"
                                                    color="gray.800"
                                                    textTransform="uppercase"
                                                    letterSpacing="wider"
                                                >
                                                    Color de Perfil
                                                </Text>
                                                <Text
                                                    fontSize="xs"
                                                    color="blue.600"
                                                    fontWeight="bold"
                                                >
                                                    {
                                                        FINISHES.find(
                                                            (f) =>
                                                                f.id === finish,
                                                        )?.label
                                                    }
                                                </Text>
                                            </Flex>
                                            <HStack gap="3">
                                                {FINISHES.map((f) => {
                                                    const isSelected =
                                                        finish === f.id;
                                                    return (
                                                        <Box
                                                            key={f.id}
                                                            as="button"
                                                            onClick={() =>
                                                                setFinish(f.id)
                                                            }
                                                            w="8"
                                                            h="8"
                                                            borderRadius="full"
                                                            bg={f.color}
                                                            borderWidth={
                                                                isSelected
                                                                    ? "3px"
                                                                    : "1.5px"
                                                            }
                                                            borderColor={
                                                                isSelected
                                                                    ? "blue.500"
                                                                    : "gray.300"
                                                            }
                                                            boxShadow={
                                                                isSelected
                                                                    ? "0 0 0 2px rgba(59, 130, 246, 0.35)"
                                                                    : "sm"
                                                            }
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            cursor="pointer"
                                                            transition="all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                                                            _hover={{
                                                                transform:
                                                                    "scale(1.15)",
                                                            }}
                                                            aria-label={`Seleccionar color ${f.label}`}
                                                        >
                                                            {isSelected && (
                                                                <Check
                                                                    size={14}
                                                                    color={
                                                                        f.id ===
                                                                        "natural"
                                                                            ? "#1e293b"
                                                                            : "#ffffff"
                                                                    }
                                                                    strokeWidth={
                                                                        3
                                                                    }
                                                                />
                                                            )}
                                                        </Box>
                                                    );
                                                })}
                                            </HStack>
                                        </Box>

                                        {/* Color de Cristal: Círculos / Esferas Igual al Perfil */}
                                        <Box>
                                            <Flex
                                                justify="space-between"
                                                align="center"
                                                mb="2"
                                            >
                                                <Text
                                                    fontSize="xs"
                                                    fontWeight="bold"
                                                    color="gray.800"
                                                    textTransform="uppercase"
                                                    letterSpacing="wider"
                                                >
                                                    Color de Cristal
                                                </Text>
                                                <Text
                                                    fontSize="xs"
                                                    color="blue.600"
                                                    fontWeight="bold"
                                                >
                                                    {
                                                        GLASS_COLORS.find(
                                                            (c) =>
                                                                c.id ===
                                                                glassColor,
                                                        )?.label
                                                    }
                                                </Text>
                                            </Flex>
                                            <HStack gap="3">
                                                {GLASS_COLORS.map((c) => {
                                                    const isSelected =
                                                        glassColor === c.id;
                                                    return (
                                                        <Box
                                                            key={c.id}
                                                            as="button"
                                                            onClick={() =>
                                                                setGlassColor(
                                                                    c.id,
                                                                )
                                                            }
                                                            w="8"
                                                            h="8"
                                                            borderRadius="full"
                                                            bg={c.colorHex}
                                                            borderWidth={
                                                                isSelected
                                                                    ? "3px"
                                                                    : "1.5px"
                                                            }
                                                            borderColor={
                                                                isSelected
                                                                    ? "blue.500"
                                                                    : c.border
                                                            }
                                                            boxShadow={
                                                                isSelected
                                                                    ? "0 0 0 2px rgba(59, 130, 246, 0.35)"
                                                                    : "sm"
                                                            }
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            cursor="pointer"
                                                            transition="all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                                                            _hover={{
                                                                transform:
                                                                    "scale(1.15)",
                                                            }}
                                                            aria-label={`Seleccionar color de cristal ${c.label}`}
                                                        >
                                                            {isSelected && (
                                                                <Check
                                                                    size={14}
                                                                    color={
                                                                        c.id ===
                                                                        "incoloro"
                                                                            ? "#1e293b"
                                                                            : "#ffffff"
                                                                    }
                                                                    strokeWidth={
                                                                        3
                                                                    }
                                                                />
                                                            )}
                                                        </Box>
                                                    );
                                                })}
                                            </HStack>
                                        </Box>

                                        {/* Tipo de Cristal: 3 Opciones del Catálogo */}
                                        <Box>
                                            <Flex
                                                justify="space-between"
                                                align="center"
                                                mb="1.5"
                                            >
                                                <Flex align="center" gap="1.5">
                                                    <ShieldCheck
                                                        size={14}
                                                        color="#0284c7"
                                                    />
                                                    <Text
                                                        fontSize="xs"
                                                        fontWeight="bold"
                                                        color="gray.800"
                                                        textTransform="uppercase"
                                                        letterSpacing="wider"
                                                    >
                                                        Tipo de Cristal
                                                    </Text>
                                                </Flex>
                                                <Text
                                                    fontSize="xs"
                                                    color="blue.600"
                                                    fontWeight="bold"
                                                >
                                                    {
                                                        GLASS_TYPES.find(
                                                            (g) =>
                                                                g.id === glass,
                                                        )?.label
                                                    }
                                                </Text>
                                            </Flex>
                                            <VStack gap="1.5" align="stretch">
                                                {GLASS_TYPES.map((g) => {
                                                    const isSelected =
                                                        glass === g.id;
                                                    return (
                                                        <Box
                                                            key={g.id}
                                                            as="button"
                                                            onClick={() =>
                                                                setGlass(g.id)
                                                            }
                                                            p="2"
                                                            borderRadius="lg"
                                                            borderWidth={
                                                                isSelected
                                                                    ? "2px"
                                                                    : "1px"
                                                            }
                                                            borderColor={
                                                                isSelected
                                                                    ? "blue.500"
                                                                    : "gray.200"
                                                            }
                                                            bg={
                                                                isSelected
                                                                    ? "blue.50/70"
                                                                    : "gray.50/40"
                                                            }
                                                            cursor="pointer"
                                                            transition="all 0.2s ease"
                                                            _hover={{
                                                                borderColor:
                                                                    isSelected
                                                                        ? "blue.600"
                                                                        : "gray.300",
                                                                bg: isSelected
                                                                    ? "blue.50"
                                                                    : "gray.50",
                                                            }}
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="space-between"
                                                            textAlign="left"
                                                            w="full"
                                                        >
                                                            <Box>
                                                                <Flex
                                                                    align="center"
                                                                    gap="1.5"
                                                                >
                                                                    <Text
                                                                        fontSize="xs"
                                                                        fontWeight="bold"
                                                                        color={
                                                                            isSelected
                                                                                ? "blue.900"
                                                                                : "gray.800"
                                                                        }
                                                                    >
                                                                        {
                                                                            g.label
                                                                        }
                                                                    </Text>
                                                                    <Badge
                                                                        size="xs"
                                                                        colorPalette={
                                                                            isSelected
                                                                                ? "blue"
                                                                                : "gray"
                                                                        }
                                                                        variant="subtle"
                                                                        borderRadius="md"
                                                                        fontSize="9px"
                                                                        px="1.5"
                                                                    >
                                                                        {
                                                                            g.thickness
                                                                        }
                                                                    </Badge>
                                                                </Flex>
                                                                <Text
                                                                    fontSize="10px"
                                                                    color="gray.500"
                                                                >
                                                                    {g.desc}
                                                                </Text>
                                                            </Box>
                                                            <Box
                                                                w="4"
                                                                h="4"
                                                                borderRadius="full"
                                                                borderWidth="1.5px"
                                                                borderColor={
                                                                    isSelected
                                                                        ? "blue.500"
                                                                        : "gray.300"
                                                                }
                                                                bg={
                                                                    isSelected
                                                                        ? "blue.500"
                                                                        : "transparent"
                                                                }
                                                                display="flex"
                                                                alignItems="center"
                                                                justifyContent="center"
                                                                flexShrink={0}
                                                                ml="2"
                                                            >
                                                                {isSelected && (
                                                                    <Check
                                                                        size={
                                                                            10
                                                                        }
                                                                        color="#ffffff"
                                                                        strokeWidth={
                                                                            3
                                                                        }
                                                                    />
                                                                )}
                                                            </Box>
                                                        </Box>
                                                    );
                                                })}
                                            </VStack>
                                        </Box>
                                    </VStack>
                                </Box>

                                {/* Footer Fijo de Cotización + Botón WhatsApp */}
                                <Box
                                    p="4"
                                    bg="gray.50"
                                    borderTopWidth="1px"
                                    borderColor="gray.200"
                                    flexShrink={0}
                                    pb={{
                                        base: "max(1rem, env(safe-area-inset-bottom))",
                                        lg: "4",
                                    }} // Safe area para iOS
                                >
                                    <Flex
                                        justify="space-between"
                                        align="center"
                                        mb="3"
                                    >
                                        <Box>
                                            <Text
                                                fontSize="11px"
                                                color="gray.500"
                                                fontWeight="bold"
                                                textTransform="uppercase"
                                                letterSpacing="wider"
                                            >
                                                Precio Estimado
                                            </Text>
                                            <Flex align="baseline" gap="1">
                                                <Text
                                                    fontSize="md"
                                                    color="gray.500"
                                                    fontWeight="bold"
                                                >
                                                    S/
                                                </Text>
                                                <Text
                                                    fontSize="2xl"
                                                    color="blue.600"
                                                    fontWeight="black"
                                                    lineHeight="1"
                                                >
                                                    {price.toFixed(2)}
                                                </Text>
                                            </Flex>
                                        </Box>
                                        <Box textAlign="right">
                                            <Text
                                                fontSize="10px"
                                                color="gray.400"
                                            >
                                                Incluye IGV
                                            </Text>
                                            <Text
                                                fontSize="10px"
                                                color="gray.400"
                                            >
                                                e Instalación
                                            </Text>
                                        </Box>
                                    </Flex>

                                    <Button
                                        w="full"
                                        size="lg"
                                        colorPalette="green"
                                        onClick={handleSendWhatsApp}
                                        borderRadius="xl"
                                        h="12"
                                        _hover={{
                                            transform: "translateY(-1px)",
                                            boxShadow:
                                                "0 4px 12px rgba(34, 197, 94, 0.2)",
                                        }}
                                        transition="all 0.2s"
                                    >
                                        <MessageCircle
                                            size={18}
                                            style={{ marginRight: "8px" }}
                                        />
                                        Cotizar por WhatsApp
                                    </Button>
                                </Box>
                            </Flex>
                        </Flex>
                    </DialogBody>
                </DialogContent>
            </DialogRoot>
        </Box>
    );
};
