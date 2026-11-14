import type { FinishSwatch, GlassTintOption } from "./svgPresets";

export interface DraftRenderProps {
  systemTitle: string;
  frameGradId: string;
  glassGradId: string;
  steelGradId: string;
  arrowId: string;
  finish: FinishSwatch;
  tint: GlassTintOption;
  widthCm?: number;
  heightCm?: number;
  frameThicknessPx?: number;
}

function fitSvgRect(
  widthCm: number | undefined,
  heightCm: number | undefined,
  maxW: number,
  maxH: number,
) {
  const w = widthCm && widthCm > 0 ? widthCm : 150;
  const h = heightCm && heightCm > 0 ? heightCm : 120;
  const ratio = w / h;
  let drawW = maxW;
  let drawH = Math.round(maxW / ratio);
  if (drawH > maxH) {
    drawH = maxH;
    drawW = Math.round(maxH * ratio);
  }
  drawW = Math.max(120, Math.min(maxW, drawW));
  drawH = Math.max(110, Math.min(maxH, drawH));
  return {
    drawW,
    drawH,
    offsetX: Math.round((maxW - drawW) / 2),
    offsetY: Math.round((maxH - drawH) / 2),
    hasUpperBody: h > 180,
  };
}

export function ProyectanteDraft({
  systemTitle,
  frameGradId,
  glassGradId,
  steelGradId,
  arrowId,
  finish,
  tint,
  widthCm,
  heightCm,
  frameThicknessPx = 14,
}: DraftRenderProps) {
  const { drawW, drawH, offsetX, offsetY, hasUpperBody } = fitSvgRect(
    widthCm,
    heightCm,
    250,
    310,
  );
  const fw = Math.max(10, Math.min(18, frameThicknessPx));
  const innerW = Math.max(60, drawW - fw * 2);
  const innerH = Math.max(60, drawH - fw * 2);
  const glassW = Math.max(40, innerW - fw * 1.6);
  const glassH = Math.max(40, innerH - fw * 1.6);
  const glassX = Math.round((drawW - glassW) / 2);
  const glassY = Math.round((drawH - glassH) / 2);

  return (
    <g>
      <text
        x="42"
        y="48"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="13"
        fontWeight="700"
        fill="#111111"
      >
        {`${systemTitle.toUpperCase()} · ALZADO Y CORTE LATERAL PROYECTANTE`}
      </text>

      <g transform={`translate(${92 + offsetX}, ${92 + offsetY})`}>
        <line
          x1="0"
          y1="-14"
          x2={drawW}
          y2="-14"
          stroke="#111111"
          strokeWidth="1"
          markerStart={`url(#${arrowId})`}
          markerEnd={`url(#${arrowId})`}
        />
        <line x1="0" y1="-22" x2="0" y2="-4" stroke="#78716C" strokeWidth="0.9" />
        <line x1={drawW} y1="-22" x2={drawW} y2="-4" stroke="#78716C" strokeWidth="0.9" />
        <text
          x={drawW / 2}
          y="-22"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fontWeight="600"
          fill="#111111"
        >
          {widthCm ? `Ancho: ${widthCm} cm` : "ancho a medida"}
        </text>

        <line
          x1="-20"
          y1="0"
          x2="-20"
          y2={drawH}
          stroke="#111111"
          strokeWidth="1"
          markerStart={`url(#${arrowId})`}
          markerEnd={`url(#${arrowId})`}
        />
        <text
          x="-32"
          y={drawH / 2}
          textAnchor="middle"
          transform={`rotate(-90, -32, ${drawH / 2})`}
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fontWeight="600"
          fill="#111111"
        >
          {heightCm ? `Alto: ${heightCm} cm` : "apertura exterior"}
        </text>

        <rect
          x="0"
          y="0"
          width={drawW}
          height={drawH}
          rx="2"
          fill={`url(#${frameGradId})`}
          stroke={finish.stroke}
          strokeWidth="1.5"
        />
        <rect x={fw} y={fw} width={innerW} height={innerH} fill="none" stroke="#18181B" strokeWidth="2.2" />
        <rect
          x={fw + 3}
          y={fw + 3}
          width={Math.max(48, innerW - 6)}
          height={Math.max(48, innerH - 6)}
          fill={`url(#${frameGradId})`}
          stroke={finish.stroke}
          strokeWidth="1.2"
        />
        <rect
          x={glassX}
          y={glassY}
          width={glassW}
          height={glassH}
          fill={`url(#${glassGradId})`}
          stroke={tint.edgeStroke}
          strokeWidth="1.2"
        />
        {hasUpperBody && (
          <rect
            x={fw}
            y={Math.round(drawH * 0.28)}
            width={innerW}
            height="10"
            fill={`url(#${frameGradId})`}
            stroke={finish.stroke}
            strokeWidth="1.1"
          />
        )}
        <polygon
          points={`${glassX + 12},${glassY + 2} ${glassX + 44},${glassY + 2} ${glassX + 2},${glassY + 68} ${glassX + 2},${glassY + 34}`}
          fill={tint.reflection}
        />
        <polyline
          points={`${glassX},${glassY} ${drawW / 2},${glassY + glassH} ${glassX + glassW},${glassY}`}
          fill="none"
          stroke="#FF5A5F"
          strokeWidth="1.6"
          strokeDasharray="6 4"
        />
        <rect x={fw + 2} y={Math.round(drawH * 0.24)} width="9" height={Math.round(drawH * 0.25)} rx="1.5" fill={`url(#${steelGradId})`} stroke="#475569" strokeWidth="0.9" />
        <rect x={drawW - fw - 11} y={Math.round(drawH * 0.24)} width="9" height={Math.round(drawH * 0.25)} rx="1.5" fill={`url(#${steelGradId})`} stroke="#475569" strokeWidth="0.9" />
        <rect x={Math.round(drawW / 2) - 20} y={drawH - fw - 10} width="40" height="9" rx="3" fill="#111111" stroke="#52525B" strokeWidth="1" />
      </g>

      <g transform="translate(458, 92)">
        <rect x="0" y="0" width="26" height="300" fill="#E5E0D8" stroke="#A8A29E" strokeWidth="1" />
        <rect x="26" y="24" width="24" height="252" fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.4" />
        <circle cx="51" cy="36" r="3" fill="#18181B" />
        <circle cx="51" cy="264" r="3" fill="#18181B" />

        <g transform="translate(50, 32) rotate(-28)">
          <rect x="0" y="0" width="16" height="244" rx="1.5" fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.4" />
          <rect x="5" y="14" width="6" height="216" fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1" />
        </g>

        <line x1="50" y1="126" x2="112" y2="148" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <line x1="50" y1="126" x2="112" y2="148" stroke="#E2E8F0" strokeWidth="2.2" strokeLinecap="round" />
        <path
          d="M 52 276 A 210 210 0 0 0 156 244"
          fill="none"
          stroke="#FF5A5F"
          strokeWidth="1.8"
          strokeDasharray="5 3"
          markerEnd={`url(#${arrowId})`}
        />
        <text x="126" y="272" fontFamily="ui-monospace, monospace" fontSize="12" fontWeight="700" fill="#FF5A5F">
          ~35° exterior
        </text>

        <g fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#111111">
          <line x1="48" y1="36" x2="155" y2="20" stroke="#78716C" strokeWidth="0.9" />
          <text x="160" y="24" fontWeight="600">Doble sello EPDM</text>
          <line x1="102" y1="142" x2="155" y2="128" stroke="#78716C" strokeWidth="0.9" />
          <text x="160" y="132" fontWeight="600">Brazos acero inox</text>
          <line x1="138" y1="192" x2="155" y2="192" stroke="#78716C" strokeWidth="0.9" />
          <text x="160" y="196" fontWeight="600">Manija de cierre</text>
        </g>
      </g>
    </g>
  );
}

export function CorredizaDraft({
  systemTitle,
  frameGradId,
  glassGradId,
  steelGradId,
  arrowId,
  finish,
  tint,
  widthCm,
  heightCm,
  frameThicknessPx = 12,
  tracks = 2,
}: DraftRenderProps & { tracks?: 2 | 3 | 4 }) {
  const effectiveTracks: 2 | 3 | 4 =
    widthCm && widthCm > 260 ? 4 : widthCm && widthCm > 195 ? 3 : tracks;

  const { drawW, drawH, offsetX, offsetY, hasUpperBody } = fitSvgRect(
    widthCm,
    heightCm,
    456,
    312,
  );
  const fw = Math.max(8, Math.min(16, frameThicknessPx));
  const bodyTop = hasUpperBody ? Math.round(drawH * 0.26) : 0;
  const leafH = Math.max(60, drawH - bodyTop - fw * 2 - 4);
  const innerW = Math.max(96, drawW - fw * 2);

  const layoutLabel =
    effectiveTracks === 4
      ? "fija - corr - corr - fija"
      : effectiveTracks === 3
        ? "3 hojas corredizas"
        : "1 fija + 1 corrediza";

  return (
    <g>
      <text
        x="42"
        y="48"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="13"
        fontWeight="700"
        fill="#111111"
      >
        {`${systemTitle.toUpperCase()} · ALZADO CORREDIZO (${effectiveTracks === 4 ? "4 HOJAS" : `${effectiveTracks} HOJAS`})`}
      </text>

      <g transform={`translate(${80 + offsetX}, ${92 + offsetY})`}>
        <line
          x1="0"
          y1="-14"
          x2={drawW}
          y2="-14"
          stroke="#111111"
          strokeWidth="1"
          markerStart={`url(#${arrowId})`}
          markerEnd={`url(#${arrowId})`}
        />
        <line x1="0" y1="-22" x2="0" y2="-4" stroke="#78716C" strokeWidth="0.9" />
        <line x1={drawW} y1="-22" x2={drawW} y2="-4" stroke="#78716C" strokeWidth="0.9" />
        <text
          x={drawW / 2}
          y="-22"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fontWeight="600"
          fill="#111111"
        >
          {widthCm ? `${widthCm} cm · ${layoutLabel}` : layoutLabel}
        </text>

        <line
          x1="-20"
          y1="0"
          x2="-20"
          y2={drawH}
          stroke="#111111"
          strokeWidth="1"
          markerStart={`url(#${arrowId})`}
          markerEnd={`url(#${arrowId})`}
        />
        <text
          x="-32"
          y={drawH / 2}
          textAnchor="middle"
          transform={`rotate(-90, -32, ${drawH / 2})`}
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fontWeight="600"
          fill="#111111"
        >
          {heightCm ? `Alto: ${heightCm} cm` : "alto a medida"}
        </text>

        <rect
          x="0"
          y="0"
          width={drawW}
          height={drawH}
          rx="2"
          fill={`url(#${frameGradId})`}
          stroke={finish.stroke}
          strokeWidth="1.5"
        />

        {hasUpperBody && (
          <g>
            <rect
              x={fw}
              y={fw}
              width={innerW}
              height={Math.max(22, bodyTop - fw)}
              fill={`url(#${glassGradId})`}
              stroke={tint.edgeStroke}
              strokeWidth="1"
            />
            <rect
              x={fw}
              y={bodyTop}
              width={innerW}
              height="8"
              fill={`url(#${frameGradId})`}
              stroke={finish.stroke}
              strokeWidth="1.1"
            />
          </g>
        )}

        {effectiveTracks === 2 && (
          <>
            {(() => {
              const leafW = Math.round(innerW / 2) + 4;
              const leafY = (hasUpperBody ? bodyTop + 8 : fw);
              const gPad = Math.max(8, fw - 2);
              const gW = Math.max(24, leafW - gPad * 2);
              const gH = Math.max(30, leafH - gPad * 2);
              const leaf2X = fw + innerW - leafW;
              const midY = leafY + Math.round(leafH / 2);
              return (
                <>
                  <rect x={fw} y={leafY} width={leafW} height={leafH} fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.1" />
                  <rect x={fw + gPad} y={leafY + gPad} width={gW} height={gH} fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1" />
                  <line x1={fw + leafW / 2 - 8} y1={midY} x2={fw + leafW / 2 + 8} y2={midY} stroke="#475569" strokeWidth="1.6" />
                  <line x1={fw + leafW / 2} y1={midY - 8} x2={fw + leafW / 2} y2={midY + 8} stroke="#475569" strokeWidth="1.6" />

                  <rect x={leaf2X} y={leafY - 2} width={leafW} height={leafH + 2} fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.3" />
                  <rect x={leaf2X + gPad} y={leafY + gPad - 2} width={gW} height={gH + 2} fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1.1" />
                  <line
                    x1={leaf2X + gW - 10}
                    y1={midY}
                    x2={leaf2X + gPad + 16}
                    y2={midY}
                    stroke="#FF5A5F"
                    strokeWidth="2.2"
                    markerEnd={`url(#${arrowId})`}
                  />
                  <rect x={leaf2X + leafW - 10} y={midY - 24} width="7" height="48" rx="3" fill="#111111" stroke="#71717A" strokeWidth="0.9" />
                </>
              );
            })()}
          </>
        )}

        {effectiveTracks === 3 && (
          <>
            {(() => {
              const colW = Math.round(innerW / 3);
              const leafY = hasUpperBody ? bodyTop + 8 : fw;
              const gPad = Math.max(6, fw - 4);
              const midY = leafY + Math.round(leafH / 2);
              return (
                <>
                  {[0, 1, 2].map((col) => {
                    const x = fw + col * colW;
                    return (
                      <g key={col}>
                        <rect x={x} y={leafY} width={colW + 2} height={leafH} fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.2" />
                        <rect x={x + gPad} y={leafY + gPad} width={Math.max(18, colW - gPad * 2 + 2)} height={Math.max(24, leafH - gPad * 2)} fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1" />
                      </g>
                    );
                  })}
                  <line x1={fw + innerW - 20} y1={midY} x2={fw + colW + 14} y2={midY} stroke="#FF5A5F" strokeWidth="2.2" markerEnd={`url(#${arrowId})`} />
                </>
              );
            })()}
          </>
        )}

        {effectiveTracks === 4 && (
          <>
            {(() => {
              const colW = Math.round(innerW / 4);
              const leafY = hasUpperBody ? bodyTop + 8 : fw;
              const gPad = Math.max(6, fw - 4);
              const midY = leafY + Math.round(leafH / 2);
              const centerX = fw + Math.round(innerW / 2);
              return (
                <>
                  {[0, 1, 2, 3].map((col) => {
                    const x = fw + col * colW;
                    return (
                      <g key={col}>
                        <rect x={x} y={leafY} width={colW + 1} height={leafH} fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.2" />
                        <rect x={x + gPad} y={leafY + gPad} width={Math.max(14, colW - gPad * 2)} height={Math.max(24, leafH - gPad * 2)} fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1" />
                      </g>
                    );
                  })}
                  <line x1={centerX - 8} y1={midY} x2={fw + Math.round(colW * 0.7)} y2={midY} stroke="#FF5A5F" strokeWidth="2.2" markerEnd={`url(#${arrowId})`} />
                  <line x1={centerX + 8} y1={midY} x2={fw + innerW - Math.round(colW * 0.7)} y2={midY} stroke="#FF5A5F" strokeWidth="2.2" markerEnd={`url(#${arrowId})`} />
                </>
              );
            })()}
          </>
        )}

        <circle cx={Math.round(drawW * 0.56)} cy={drawH - 15} r="5" fill={`url(#${steelGradId})`} stroke="#334155" strokeWidth="1.1" />
        <circle cx={Math.round(drawW * 0.88)} cy={drawH - 15} r="5" fill={`url(#${steelGradId})`} stroke="#334155" strokeWidth="1.1" />
        <rect x="4" y={drawH - 10} width={drawW - 8} height="10" fill="#27272A" stroke="#111111" strokeWidth="1" />
      </g>
    </g>
  );
}

export function BatienteDraft({
  systemTitle,
  frameGradId,
  glassGradId,
  steelGradId,
  arrowId,
  finish,
  tint,
  widthCm,
  heightCm,
  frameThicknessPx = 14,
}: DraftRenderProps) {
  const { drawW, drawH, offsetX, offsetY } = fitSvgRect(widthCm, heightCm, 210, 316);
  const fw = Math.max(10, Math.min(18, frameThicknessPx));
  const innerW = Math.max(60, drawW - fw * 2);
  const innerH = Math.max(60, drawH - fw * 2);
  const glassW = Math.max(40, innerW - fw * 1.6);
  const glassH = Math.max(40, innerH - fw * 1.6);
  const glassX = Math.round((drawW - glassW) / 2);
  const glassY = Math.round((drawH - glassH) / 2);

  return (
    <g>
      <text
        x="42"
        y="48"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="13"
        fontWeight="700"
        fill="#111111"
      >
        {`${systemTitle.toUpperCase()} · ALZADO BATIENTE Y RADIO DE GIRO EN PLANTA`}
      </text>

      <g transform={`translate(${106 + offsetX}, ${92 + offsetY})`}>
        <line
          x1="0"
          y1="-14"
          x2={drawW}
          y2="-14"
          stroke="#111111"
          strokeWidth="1"
          markerStart={`url(#${arrowId})`}
          markerEnd={`url(#${arrowId})`}
        />
        <text
          x={drawW / 2}
          y="-22"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fontWeight="600"
          fill="#111111"
        >
          {widthCm ? `Ancho: ${widthCm} cm` : "ancho a medida"}
        </text>
        <line
          x1="-20"
          y1="0"
          x2="-20"
          y2={drawH}
          stroke="#111111"
          strokeWidth="1"
          markerStart={`url(#${arrowId})`}
          markerEnd={`url(#${arrowId})`}
        />
        <text
          x="-32"
          y={drawH / 2}
          textAnchor="middle"
          transform={`rotate(-90, -32, ${drawH / 2})`}
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fontWeight="600"
          fill="#111111"
        >
          {heightCm ? `Alto: ${heightCm} cm` : "alto a medida"}
        </text>
        <rect x="0" y="0" width={drawW} height={drawH} rx="2" fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.5" />
        <rect x={fw} y={fw} width={innerW} height={innerH} fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.2" />
        <rect x={glassX} y={glassY} width={glassW} height={glassH} fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1.2" />
        <polygon points={`${glassX + 12},${glassY + 2} ${glassX + 42},${glassY + 2} ${glassX + 2},${glassY + 64} ${glassX + 2},${glassY + 32}`} fill={tint.reflection} />

        <polyline
          points={`${drawW - fw - 4},${fw + 6} ${fw + 6},${drawH / 2} ${drawW - fw - 4},${drawH - fw - 6}`}
          fill="none"
          stroke="#FF5A5F"
          strokeWidth="1.6"
          strokeDasharray="6 4"
        />

        {[0.14, 0.36, 0.62, 0.84].map((ratio) => (
          <rect
            key={ratio}
            x="4"
            y={Math.round(drawH * ratio)}
            width="10"
            height="18"
            rx="2"
            fill={`url(#${steelGradId})`}
            stroke="#334155"
            strokeWidth="1"
          />
        ))}
        <rect x={drawW - fw - 12} y={Math.round(drawH / 2) - 18} width="10" height="36" rx="3" fill="#111111" />
        <rect x={drawW - fw - 26} y={Math.round(drawH / 2) - 10} width="20" height="7" rx="3" fill={`url(#${steelGradId})`} stroke="#334155" strokeWidth="0.9" />
      </g>

      {/* Vista en planta giro 90° */}
      <g transform="translate(428, 92)">
        <rect x="0" y="0" width="320" height="304" rx="8" fill="#FFFFFF" stroke="#D8D3CA" strokeWidth="1" />
        <text x="20" y="28" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="#111111">
          VISTA EN PLANTA (APERTURA 90°)
        </text>
        <g transform="translate(56, 74)">
          <rect x="0" y="148" width="22" height="16" fill="#A8A29E" />
          <rect x="176" y="148" width="22" height="16" fill="#A8A29E" />
          {/* Hoja cerrada punteada */}
          <rect x="22" y="152" width="154" height="8" fill="none" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="4 3" />
          {/* Hoja abierta a 90° */}
          <rect x="22" y="2" width="12" height="154" fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.2" />
          {/* Arco de barrido */}
          <path d="M 176 156 A 154 154 0 0 0 28 4" fill="none" stroke="#FF5A5F" strokeWidth="2" strokeDasharray="5 3" markerEnd={`url(#${arrowId})`} />
          <text x="108" y="64" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="700" fill="#FF5A5F">
            apertura libre 90°
          </text>
        </g>
        <text x="20" y="266" fontFamily="Inter, sans-serif" fontSize="11" fill="#4A4A4A">
          • 4 bisagras reforzadas + chapa o cerradura
        </text>
        <text x="20" y="284" fontFamily="Inter, sans-serif" fontSize="11" fill="#4A4A4A">
          • Sello perimetral contra viento y polvo
        </text>
      </g>
    </g>
  );
}

export function DuchaDraft({
  systemTitle,
  glassGradId,
  steelGradId,
  arrowId,
  tint,
  variant = "frontal",
}: DraftRenderProps & { variant?: "frontal" | "doble" | "esquinero" }) {
  return (
    <g>
      <text
        x="42"
        y="48"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="13"
        fontWeight="700"
        fill="#111111"
      >
        {`${systemTitle.toUpperCase()} · BOX EN CRISTAL TEMPLADO + ACERO INOX 304`}
      </text>

      <g transform="translate(86, 84)">
        <rect x="-18" y="0" width="18" height="314" fill="#E5E0D8" stroke="#A8A29E" strokeWidth="1" />
        <rect x="444" y="0" width="18" height="314" fill="#E5E0D8" stroke="#A8A29E" strokeWidth="1" />
        <rect x="-18" y="314" width="480" height="14" fill="#D6D3D1" stroke="#78716C" strokeWidth="1" />

        <rect x="-4" y="16" width="452" height="13" rx="6" fill={`url(#${steelGradId})`} stroke="#475569" strokeWidth="1.2" />
        <rect x="-6" y="11" width="10" height="23" rx="2" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
        <rect x="440" y="11" width="10" height="23" rx="2" fill="#94A3B8" stroke="#334155" strokeWidth="1" />

        {variant === "esquinero" ? (
          <>
            {/* 2 fijos laterales + 2 hojas hacia vértice */}
            <rect x="0" y="36" width="110" height="278" fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1.4" />
            <rect x="334" y="36" width="110" height="278" fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1.4" />
            <rect x="104" y="34" width="118" height="278" fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1.6" />
            <rect x="222" y="34" width="118" height="278" fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1.6" />
            <line x1="212" y1="176" x2="128" y2="176" stroke="#FF5A5F" strokeWidth="2.4" markerEnd={`url(#${arrowId})`} />
            <line x1="232" y1="176" x2="316" y2="176" stroke="#FF5A5F" strokeWidth="2.4" markerEnd={`url(#${arrowId})`} />
            {[124, 320].map((cx) => (
              <circle key={cx} cx={cx} cy="22" r="12" fill={`url(#${steelGradId})`} stroke="#334155" strokeWidth="1.4" />
            ))}
          </>
        ) : (
          <>
            <rect x="0" y="36" width="226" height="278" fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1.5" />
            <polygon points="18,37 64,37 1,148 1,98" fill={tint.reflection} />
            <rect x="210" y="34" width="234" height="278" fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1.6" />
            <polygon points="242,35 288,35 211,158 211,112" fill={tint.reflection} />
            {[246, 408].map((cx) => (
              <g key={cx}>
                <rect x={cx - 4} y="22" width="8" height="26" rx="2" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
                <circle cx={cx} cy="22" r="13" fill={`url(#${steelGradId})`} stroke="#334155" strokeWidth="1.4" />
                <circle cx={cx} cy="22" r="4.5" fill="#334155" />
              </g>
            ))}
            <circle cx="238" cy="176" r="11" fill={`url(#${steelGradId})`} stroke="#334155" strokeWidth="1.4" />
            {variant === "doble" && (
              <circle cx="32" cy="176" r="11" fill={`url(#${steelGradId})`} stroke="#334155" strokeWidth="1.4" />
            )}
            <line x1="398" y1="176" x2="268" y2="176" stroke="#FF5A5F" strokeWidth="2.4" markerEnd={`url(#${arrowId})`} />
            {variant === "doble" && (
              <line x1="56" y1="176" x2="180" y2="176" stroke="#FF5A5F" strokeWidth="2.4" markerEnd={`url(#${arrowId})`} />
            )}
          </>
        )}
      </g>

      <g transform="translate(572, 84)" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#111111">
        <rect x="0" y="0" width="192" height="316" rx="8" fill="#FFFFFF" stroke="#D8D3CA" strokeWidth="1" />
        <text x="16" y="26" fontWeight="700" fontSize="12">COMPONENTES DEL KIT</text>
        <text x="16" y="56" fontWeight="600">1. Riel tubular 304</text>
        <text x="16" y="72" fill="#4A4A4A" fontSize="10.5">Acero inox / cromado sin óxido.</text>
        <text x="16" y="106" fontWeight="600">2. Rodamientos vistos</text>
        <text x="16" y="122" fill="#4A4A4A" fontSize="10.5">Deslizamiento suave con tope.</text>
        <text x="16" y="156" fontWeight="600">3. Vinil antisalpicaduras</text>
        <text x="16" y="172" fill="#4A4A4A" fontSize="10.5">Cierre limpio sin riel cerrado.</text>
        <text x="16" y="206" fontWeight="600">4. Templado 6–8 mm</text>
        <text x="16" y="222" fill="#4A4A4A" fontSize="10.5">Cantos pulidos de seguridad.</text>
      </g>
    </g>
  );
}
