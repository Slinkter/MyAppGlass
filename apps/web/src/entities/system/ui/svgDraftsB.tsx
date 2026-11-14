import type { DraftRenderProps } from "./svgDraftsA";

export function FrenoHidraulicoDraft({
  systemTitle,
  glassGradId,
  steelGradId,
  arrowId,
  tint,
  isOverhead = false,
}: DraftRenderProps & { isOverhead?: boolean }) {
  return (
    <g>
      <text x="42" y="48" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#111111">
        {`${systemTitle.toUpperCase()} · ${isOverhead ? "CIERRAPUERTAS AÉREO EN CABEZAL" : "FRENO HIDRÁULICO EMPOTRADO EN PISO"}`}
      </text>

      <g transform="translate(106, 86)">
        <rect x="0" y="0" width="220" height="316" fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="2" />
        <polygon points="22,2 78,2 2,140 2,86" fill={tint.reflection} />
        {/* Tirador vertical tubular */}
        <rect x="188" y="96" width="10" height="128" rx="4" fill={`url(#${steelGradId})`} stroke="#334155" strokeWidth="1.2" />

        {isOverhead ? (
          <>
            {/* Cierrapuertas superior sin perforación de piso */}
            <rect x="0" y="-14" width="126" height="22" rx="3" fill={`url(#${steelGradId})`} stroke="#334155" strokeWidth="1.2" />
            <line x1="92" y1="6" x2="148" y2="28" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
            <rect x="-12" y="316" width="244" height="14" fill="#D6D3D1" stroke="#78716C" strokeWidth="1" />
          </>
        ) : (
          <>
            {/* Herrajes superior e inferior mate */}
            <rect x="0" y="0" width="64" height="26" rx="2" fill={`url(#${steelGradId})`} stroke="#334155" strokeWidth="1.2" />
            <rect x="0" y="290" width="64" height="26" rx="2" fill={`url(#${steelGradId})`} stroke="#334155" strokeWidth="1.2" />
            {/* Caja hidráulica empotrada en piso */}
            <rect x="-12" y="316" width="244" height="14" fill="#D6D3D1" stroke="#78716C" strokeWidth="1" />
            <rect x="0" y="316" width="96" height="24" rx="2" fill="#475569" stroke="#1E293B" strokeWidth="1.2" />
            <line x1="16" y1="316" x2="16" y2="310" stroke="#111111" strokeWidth="4" />
          </>
        )}
      </g>

      <g transform="translate(418, 92)" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#111111">
        <rect x="0" y="0" width="340" height="298" rx="8" fill="#FFFFFF" stroke="#D8D3CA" strokeWidth="1" />
        <text x="20" y="28" fontWeight="700" fontSize="12">
          {isOverhead ? "SIN PERFORACIÓN DE PISO" : "MECÁNICA DE RETENCIÓN 90°"}
        </text>
        <g transform="translate(52, 64)">
          <rect x="0" y="138" width="210" height="6" fill="#94A3B8" />
          <rect x="0" y="10" width="10" height="132" fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1.5" />
          <path d="M 164 138 A 144 144 0 0 0 12 10" fill="none" stroke="#FF5A5F" strokeWidth="2" strokeDasharray="5 3" markerEnd={`url(#${arrowId})`} />
          <text x="108" y="64" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="700" fill="#FF5A5F">
            {isOverhead ? "hasta 65 kg" : "2 válvulas + 90°"}
          </text>
        </g>
        <text x="20" y="256" fontSize="10.5" fill="#4A4A4A">
          • Cierre en 2 velocidades (barrido y golpe final)
        </text>
        <text x="20" y="276" fontSize="10.5" fill="#4A4A4A">
          • Herrajes en acabado mate o negro mate
        </text>
      </g>
    </g>
  );
}

export function BarandaParapetoDraft({
  systemTitle,
  frameGradId,
  glassGradId,
  steelGradId,
  tint,
  isTubular = false,
  isBalcon = false,
}: DraftRenderProps & { isTubular?: boolean; isBalcon?: boolean }) {
  return (
    <g>
      <text x="42" y="48" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#111111">
        {`${systemTitle.toUpperCase()} · ${isBalcon ? "CERRAMIENTO PANORÁMICO DE BALCÓN" : isTubular ? "PARANTES Y PASAMANOS TUBULARES" : "BARANDA PANORÁMICA EN CANAL U / FIJACIONES"}`}
      </text>

      <g transform="translate(86, 108)">
        {/* Losa / Antepecho */}
        <rect x="0" y="246" width="628" height="44" fill="#D6D3D1" stroke="#78716C" strokeWidth="1.2" />

        {isBalcon ? (
          <>
            {/* Base baranda inferior + hojas corredizas superiores */}
            <rect x="16" y="140" width="596" height="106" fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1.4" />
            <rect x="16" y="-8" width="596" height="148" fill={`url(#${frameGradId})`} stroke="#334155" strokeWidth="1.4" />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={28 + i * 194} y={4} width="184" height="124" fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1" />
                <polygon points={`${44 + i * 194},5 ${78 + i * 194},5 ${29 + i * 194},82 ${29 + i * 194},48`} fill={tint.reflection} />
              </g>
            ))}
          </>
        ) : (
          <>
            {/* 3 Paños de vidrio templado/laminado */}
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={22 + i * 200} y="46" width="186" height="200" fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1.5" />
                <polygon points={`${38 + i * 200},47 ${82 + i * 200},47 ${23 + i * 200},148 ${23 + i * 200},104`} fill={tint.reflection} />
              </g>
            ))}
            {isTubular ? (
              <>
                <rect x="10" y="34" width="608" height="10" rx="5" fill={`url(#${steelGradId})`} stroke="#475569" strokeWidth="1.2" />
                {[16, 215, 415, 608].map((x) => (
                  <g key={x}>
                    <rect x={x} y="44" width="10" height="202" fill={`url(#${steelGradId})`} stroke="#475569" strokeWidth="1" />
                    <rect x={x - 6} y="240" width="22" height="6" rx="1" fill="#64748B" />
                  </g>
                ))}
              </>
            ) : (
              <>
                <rect x="16" y="232" width="596" height="18" rx="2" fill={`url(#${steelGradId})`} stroke="#475569" strokeWidth="1.2" />
                <rect x="16" y="40" width="596" height="8" rx="3" fill={`url(#${frameGradId})`} stroke="#64748B" strokeWidth="1" />
              </>
            )}
          </>
        )}
      </g>
    </g>
  );
}

export function ArchitecturalSpecialtyDraft({
  systemTitle,
  frameGradId,
  glassGradId,
  steelGradId,
  finish,
  tint,
  mode,
}: DraftRenderProps & {
  mode: "muro_cortina" | "celosia" | "espejo" | "techo" | "mantenimiento";
}) {
  return (
    <g>
      <text x="42" y="48" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#111111">
        {`${systemTitle.toUpperCase()} · DETALLE TÉCNICO ARQUITECTÓNICO`}
      </text>

      {mode === "muro_cortina" && (
        <g transform="translate(88, 86)">
          <rect x="0" y="0" width="624" height="316" fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.5" />
          {[0, 1, 2, 3].map((c) =>
            [0, 1, 2].map((r) => {
              const x = 14 + c * 150;
              const y = 14 + r * 100;
              return (
                <g key={`${c}-${r}`}>
                  <rect x={x} y={y} width="144" height="92" fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1" />
                  {c === 1 && r === 1 && (
                    <polyline points={`${x}, ${y} ${x + 72}, ${y + 92} ${x + 144}, ${y}`} fill="none" stroke="#FF5A5F" strokeWidth="1.4" strokeDasharray="5 3" />
                  )}
                </g>
              );
            }),
          )}
        </g>
      )}

      {mode === "celosia" && (
        <g transform="translate(106, 86)">
          <rect x="0" y="0" width="260" height="316" fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.6" />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="18" y={20 + i * 24} width="224" height="12" rx="2" fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1" />
          ))}
          <g transform="translate(332, 16)">
            <rect x="0" y="0" width="286" height="286" rx="8" fill="#FFFFFF" stroke="#D8D3CA" strokeWidth="1" />
            <text x="20" y="30" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="#111111">
              CORTE DE LAMAS ORIENTADAS
            </text>
            {Array.from({ length: 6 }).map((_, i) => (
              <polygon
                key={i}
                points={`72,${70 + i * 32} 142,${88 + i * 32} 138,${96 + i * 32} 68,${78 + i * 32}`}
                fill={`url(#${frameGradId})`}
                stroke={finish.stroke}
                strokeWidth="1"
              />
            ))}
            <text x="20" y="256" fontFamily="Inter, sans-serif" fontSize="11" fill="#4A4A4A">
              • Ventilación continua con barrera contra lluvia
            </text>
          </g>
        </g>
      )}

      {mode === "espejo" && (
        <g transform="translate(106, 86)">
          <rect x="0" y="0" width="290" height="316" rx="4" fill="#E7E5E4" stroke="#A8A29E" strokeWidth="1" />
          <rect x="34" y="24" width="222" height="268" fill={`url(#${steelGradId})`} fillOpacity="0.45" stroke="#475569" strokeWidth="1.4" />
          <polygon points="56,25 112,25 35,160 35,102" fill="#FFFFFF" fillOpacity="0.6" />
          <g transform="translate(332, 16)">
            <rect x="0" y="0" width="286" height="286" rx="8" fill="#FFFFFF" stroke="#D8D3CA" strokeWidth="1" />
            <text x="20" y="30" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="#111111">
              ESPEJO FLOTANTE &gt;95 % REFLEXIÓN
            </text>
            <text x="20" y="70" fontFamily="Inter, sans-serif" fontSize="11" fill="#4A4A4A">• Espesores: 2 mm, 3 mm, 4 mm y 6 mm</text>
            <text x="20" y="96" fontFamily="Inter, sans-serif" fontSize="11" fill="#4A4A4A">• Fijación: cinta doble contacto acrílica</text>
            <text x="20" y="122" fontFamily="Inter, sans-serif" fontSize="11" fill="#4A4A4A">• Sellado con silicona neutra segura</text>
            <text x="20" y="148" fontFamily="Inter, sans-serif" fontSize="11" fill="#4A4A4A">• Cantos pulidos o biselados sin marco</text>
          </g>
        </g>
      )}

      {mode === "techo" && (
        <g transform="translate(88, 92)">
          <polygon points="40,42 584,18 624,132 0,156" fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1.5" />
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1={40 + i * 136} y1={42 - i * 6} x2={i * 156} y2={156 - i * 6} stroke={finish.frameDark} strokeWidth="6" />
          ))}
          <rect x="0" y="156" width="624" height="16" fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.2" />
          <text x="0" y="220" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#111111">
            Correas rectangulares aluminio 6063-T5 + Policarbonato UV 6–8 mm + Canaleta pluvial
          </text>
        </g>
      )}

      {mode === "mantenimiento" && (
        <g transform="translate(88, 92)">
          <rect x="0" y="0" width="624" height="304" rx="8" fill="#FFFFFF" stroke="#D8D3CA" strokeWidth="1" />
          <text x="28" y="38" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="700" fill="#111111">
            PROTOCOLO PREVENTIVO Y CORRECTIVO (CADA 12–18 MESES)
          </text>
          {[
            { t: "1. Rodamientos y garruchas", d: "Limpieza de rieles, nivelación de hojas y reemplazo de piezas fatigadas." },
            { t: "2. Hermeticidad y sellado", d: "Renovación de felpas F-10/F-15, burletes EPDM y silicona perimetral." },
            { t: "3. Herrajes y cierres", d: "Regulación de brazos proyectantes, cremonas multipunto, bisagras y frenos de piso." },
          ].map((item, idx) => (
            <g key={item.t} transform={`translate(28, ${72 + idx * 72})`}>
              <rect width="568" height="54" rx="6" fill="#FAF9F6" stroke="#E7E3DC" strokeWidth="1" />
              <text x="16" y="23" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="#111111">
                {item.t}
              </text>
              <text x="16" y="41" fontFamily="Inter, sans-serif" fontSize="11" fill="#4A4A4A">
                {item.d}
              </text>
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
