"use client";

import * as React from "react";
import {
  ALUMINUM_FINISHES,
  GLASS_TINTS,
  archetypeSupportsAluminumFinish,
  resolveSystemSvgArchetype,
  type AluminumFinishId,
  type GlassTintId,
} from "./svgPresets";
import {
  BatienteDraft,
  CorredizaDraft,
  DuchaDraft,
  ProyectanteDraft,
} from "./svgDraftsA";
import {
  ArchitecturalSpecialtyDraft,
  BarandaParapetoDraft,
  FrenoHidraulicoDraft,
} from "./svgDraftsB";

export interface SystemArchitecturalSvgProps {
  serviceSlug?: string;
  systemName: string;
  finishId?: AluminumFinishId;
  tintId?: GlassTintId;
  onSvgMount?: (el: SVGSVGElement | null) => void;
}

/**
 * Motor SVG arquitectónico parametrizado para los 13 servicios y 50 sistemas de GYA.
 */
export function SystemArchitecturalSvg({
  serviceSlug,
  systemName,
  finishId = "negro",
  tintId = "incoloro",
  onSvgMount,
}: SystemArchitecturalSvgProps) {
  const uid = React.useId().replace(/:/g, "");
  const frameGradId = `frame-${uid}`;
  const glassGradId = `glass-${uid}`;
  const steelGradId = `steel-${uid}`;
  const gridPatternId = `grid-${uid}`;
  const arrowId = `arrow-${uid}`;

  const archetype = resolveSystemSvgArchetype(serviceSlug, systemName);
  const finish =
    ALUMINUM_FINISHES.find((item) => item.id === finishId) ?? ALUMINUM_FINISHES[0];
  const tint = GLASS_TINTS.find((item) => item.id === tintId) ?? GLASS_TINTS[0];
  const hasAluminumFinish = archetypeSupportsAluminumFinish(archetype);

  const sharedProps = {
    systemTitle: systemName,
    frameGradId,
    glassGradId,
    steelGradId,
    arrowId,
    finish,
    tint,
  };

  return (
    <svg
      ref={onSvgMount}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 500"
      role="img"
      aria-label={`Plano técnico SVG de ${systemName}`}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        backgroundColor: "#FAF9F6",
      }}
    >
      <defs>
        <pattern
          id={gridPatternId}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="#E7E3DC"
            strokeWidth="0.7"
          />
        </pattern>

        <linearGradient id={frameGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={finish.frameHighlight} />
          <stop offset="45%" stopColor={finish.frameMain} />
          <stop offset="100%" stopColor={finish.frameDark} />
        </linearGradient>

        <linearGradient id={glassGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={tint.fillStart} />
          <stop offset="100%" stopColor={tint.fillEnd} />
        </linearGradient>

        <linearGradient id={steelGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="45%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>

        <marker
          id={arrowId}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#111111" />
        </marker>
      </defs>

      <rect width="800" height="500" fill={`url(#${gridPatternId})`} />
      <rect
        x="16"
        y="16"
        width="768"
        height="468"
        rx="8"
        fill="none"
        stroke="#D8D3CA"
        strokeWidth="1.2"
      />

      {archetype === "proyectante" && <ProyectanteDraft {...sharedProps} />}
      {archetype === "corrediza" && <CorredizaDraft {...sharedProps} tracks={2} />}
      {archetype === "corrediza_triple" && <CorredizaDraft {...sharedProps} tracks={3} />}
      {archetype === "corrediza_4" && <CorredizaDraft {...sharedProps} tracks={4} />}
      {archetype === "batiente" && <BatienteDraft {...sharedProps} />}
      {archetype === "ducha_frontal" && <DuchaDraft {...sharedProps} variant="frontal" />}
      {archetype === "ducha_doble" && <DuchaDraft {...sharedProps} variant="doble" />}
      {archetype === "ducha_esquinero" && <DuchaDraft {...sharedProps} variant="esquinero" />}
      {archetype === "freno_piso" && <FrenoHidraulicoDraft {...sharedProps} isOverhead={false} />}
      {archetype === "freno_aereo" && <FrenoHidraulicoDraft {...sharedProps} isOverhead />}
      {archetype === "baranda_minimalista" && <BarandaParapetoDraft {...sharedProps} />}
      {archetype === "baranda_tubular" && <BarandaParapetoDraft {...sharedProps} isTubular />}
      {archetype === "balcon" && <BarandaParapetoDraft {...sharedProps} isBalcon />}
      {(archetype === "muro_cortina" ||
        archetype === "celosia" ||
        archetype === "espejo" ||
        archetype === "techo" ||
        archetype === "mantenimiento") && (
        <ArchitecturalSpecialtyDraft {...sharedProps} mode={archetype} />
      )}

      <g transform="translate(36, 444)">
        <rect
          width="728"
          height="28"
          rx="4"
          fill="#FFFFFF"
          fillOpacity="0.92"
          stroke="#D8D3CA"
          strokeWidth="1"
        />
        <text
          x="14"
          y="18"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="10"
          fontWeight="600"
          fill="#111111"
        >
          {`${systemName.slice(0, 34).toUpperCase()} · ${hasAluminumFinish ? finish.label.toUpperCase() : "HERRAJE"}`}
        </text>
        <text
          x="714"
          y="18"
          textAnchor="end"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="10"
          fill="#4A4A4A"
        >
          {`VIDRIO ${tint.label.toUpperCase()} · REF.`}
        </text>
      </g>
    </svg>
  );
}
