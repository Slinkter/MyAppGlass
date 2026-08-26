/**
 * use3DViewer — Hook reutilizable de infraestructura Three.js
 *
 * Encapsula TODA la lógica de ciclo de vida de una escena Three.js:
 *   - scene / camera / renderer / OrbitControls / luces / grid
 *   - animate loop con autoRotate reactivo vía ref
 *   - ResizeObserver para responsive
 *   - cleanup completo al desmontar
 *
 * Patrón extraído de VentanaConfigurador3DCard.tsx para ser reutilizado
 * por ServiceConfigurator3DCard y cualquier visor 3D del proyecto.
 */

import { useRef, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export interface Use3DViewerOptions {
    /** Distancia inicial de cámara (radio esférico). Default: 4.5 */
    cameraRadius?: number;
    /** Ángulo polar inicial en grados. Default: 55 */
    cameraPolarDeg?: number;
    /** Ángulo azimutal inicial en grados. Default: 35 */
    cameraAzimuthDeg?: number;
    /** Distancia mínima de OrbitControls. Default: 1.5 */
    minDistance?: number;
    /** Distancia máxima de OrbitControls. Default: 9 */
    maxDistance?: number;
    /** Color de fondo de la escena. Default: 0xf0f4f8 */
    bgColor?: number;
    /** Tamaño y divisiones del grid. Default: 12, 24 */
    gridSize?: number;
    gridDivisions?: number;
    /** Posición Y del grid. Default: 0 */
    gridY?: number;
}

export interface Use3DViewerReturn {
    /** Div contenedor donde se inyecta el canvas de Three.js */
    canvasRef: React.RefObject<HTMLDivElement | null>;
    sceneRef: React.MutableRefObject<THREE.Scene | null>;
    cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>;
    rendererRef: React.MutableRefObject<THREE.WebGLRenderer | null>;
    controlsRef: React.MutableRefObject<OrbitControls | null>;
    /** Grupo vacío añadido a la escena — colocar aquí el modelo 3D */
    modelGroupRef: React.MutableRefObject<THREE.Group | null>;
    /** Ref que controla autoRotate sin re-renderizar React */
    autoRotateRef: React.MutableRefObject<boolean>;
    /**
     * Inicializa la escena completa y crea `modelGroupRef`.
     * Llamar una sola vez (idempotente si ya fue llamado).
     */
    initScene: (opts?: Use3DViewerOptions) => void;
    /** Libera todos los recursos de Three.js y limpia el DOM */
    cleanup: () => void;
    /** Resetea la posición de la cámara a los valores iniciales */
    resetCamera: (opts?: { cameraRadius?: number; polarDeg?: number; azimuthDeg?: number }) => void;
}

export function use3DViewer(): Use3DViewerReturn {
    const canvasRef     = useRef<HTMLDivElement>(null);
    const sceneRef      = useRef<THREE.Scene | null>(null);
    const cameraRef     = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef   = useRef<THREE.WebGLRenderer | null>(null);
    const controlsRef   = useRef<OrbitControls | null>(null);
    const modelGroupRef = useRef<THREE.Group | null>(null);
    const reqRef        = useRef<number | null>(null);
    const autoRotateRef = useRef<boolean>(true);

    // ── Guardados de opciones para resetCamera ────────────────────────────────
    const initOptsRef = useRef<Use3DViewerOptions>({});

    // ── cleanup ───────────────────────────────────────────────────────────────
    const cleanup = useCallback(() => {
        if (reqRef.current !== null) {
            cancelAnimationFrame(reqRef.current);
            reqRef.current = null;
        }
        if (controlsRef.current) {
            controlsRef.current.dispose();
            controlsRef.current = null;
        }
        if (rendererRef.current) {
            rendererRef.current.dispose();
            if (canvasRef.current) canvasRef.current.innerHTML = "";
            rendererRef.current = null;
        }
        sceneRef.current      = null;
        cameraRef.current     = null;
        modelGroupRef.current = null;
    }, []);

    // ── initScene ─────────────────────────────────────────────────────────────
    const initScene = useCallback((opts: Use3DViewerOptions = {}) => {
        // Idempotente: si el renderer ya existe, no reinicializar
        if (rendererRef.current || !canvasRef.current) return;

        // Guardar opciones para poder hacer resetCamera después
        initOptsRef.current = opts;

        const {
            cameraRadius    = 4.5,
            cameraPolarDeg  = 55,
            cameraAzimuthDeg = 35,
            minDistance     = 1.5,
            maxDistance     = 9,
            bgColor         = 0xf0f4f8,
            gridSize        = 12,
            gridDivisions   = 24,
            gridY           = 0,
        } = opts;

        const container = canvasRef.current;
        const w = container.clientWidth  || 600;
        const h = container.clientHeight || 460;

        // ── Escena ────────────────────────────────────────────────────────────
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(bgColor);
        scene.fog = new THREE.FogExp2(bgColor, 0.04);
        sceneRef.current = scene;

        // ── Cámara ────────────────────────────────────────────────────────────
        const phi   = (cameraPolarDeg   * Math.PI) / 180;
        const theta = (cameraAzimuthDeg * Math.PI) / 180;
        const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
        camera.position.set(
            cameraRadius * Math.sin(phi) * Math.sin(theta),
            cameraRadius * Math.cos(phi),
            cameraRadius * Math.sin(phi) * Math.cos(theta),
        );
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // ── Renderer ─────────────────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
        });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type    = THREE.PCFShadowMap;
        renderer.toneMapping       = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // ── OrbitControls ─────────────────────────────────────────────────────
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping    = true;
        controls.dampingFactor    = 0.06;
        controls.minDistance      = minDistance;
        controls.maxDistance      = maxDistance;
        controls.maxPolarAngle    = Math.PI / 1.6;
        controls.autoRotate       = autoRotateRef.current;
        controls.autoRotateSpeed  = 1.0;
        controlsRef.current = controls;

        // ── Iluminación ───────────────────────────────────────────────────────
        // Luz ambiente hemisférica (cielo + suelo)
        const hemi = new THREE.HemisphereLight(0xddeeff, 0xbbaa88, 0.9);
        scene.add(hemi);

        // Luz solar principal con sombras
        const sun = new THREE.DirectionalLight(0xfff5e4, 1.2);
        sun.position.set(6, 12, 8);
        sun.castShadow = true;
        sun.shadow.mapSize.set(1024, 1024);
        sun.shadow.camera.near   = 0.5;
        sun.shadow.camera.far    = 40;
        sun.shadow.camera.left   = sun.shadow.camera.bottom = -8;
        sun.shadow.camera.right  = sun.shadow.camera.top   =  8;
        scene.add(sun);

        // Luz de relleno suave
        const fill = new THREE.DirectionalLight(0xc9e8ff, 0.5);
        fill.position.set(-6, 2, -6);
        scene.add(fill);

        // ── Grid ──────────────────────────────────────────────────────────────
        const grid = new THREE.GridHelper(gridSize, gridDivisions, 0xb0bec5, 0xcfd8dc);
        grid.position.y = gridY;
        scene.add(grid);

        // ── Grupo del modelo (vacío, se rellena desde buildModel) ─────────────
        const group = new THREE.Group();
        scene.add(group);
        modelGroupRef.current = group;

        // ── Loop de animación ─────────────────────────────────────────────────
        const animate = () => {
            reqRef.current = requestAnimationFrame(animate);
            controls.autoRotate = autoRotateRef.current;
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // ── ResizeObserver ────────────────────────────────────────────────────
        const ro = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width: nw, height: nh } = entry.contentRect;
                if (nw > 0 && nh > 0 && cameraRef.current && rendererRef.current) {
                    cameraRef.current.aspect = nw / nh;
                    cameraRef.current.updateProjectionMatrix();
                    rendererRef.current.setSize(nw, nh);
                }
            }
        });
        ro.observe(container);
    }, []);

    // ── resetCamera ───────────────────────────────────────────────────────────
    const resetCamera = useCallback((
        opts?: { cameraRadius?: number; polarDeg?: number; azimuthDeg?: number }
    ) => {
        if (!cameraRef.current || !controlsRef.current) return;

        const {
            cameraRadius    = initOptsRef.current.cameraRadius    ?? 4.5,
            polarDeg        = initOptsRef.current.cameraPolarDeg  ?? 55,
            azimuthDeg      = initOptsRef.current.cameraAzimuthDeg ?? 35,
        } = opts ?? {};

        const phi   = (polarDeg   * Math.PI) / 180;
        const theta = (azimuthDeg * Math.PI) / 180;

        cameraRef.current.position.set(
            cameraRadius * Math.sin(phi) * Math.sin(theta),
            cameraRadius * Math.cos(phi),
            cameraRadius * Math.sin(phi) * Math.cos(theta),
        );
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
    }, []);

    return {
        canvasRef,
        sceneRef,
        cameraRef,
        rendererRef,
        controlsRef,
        modelGroupRef,
        autoRotateRef,
        initScene,
        cleanup,
        resetCamera,
    };
}
