import type { FinishSwatch, GlassTintOption } from "./svgPresets";

export interface DraftRenderProps {
  systemTitle: string;
  frameGradId: string;
  glassGradId: string;
  steelGradId: string;
  arrowId: string;
  finish: FinishSwatch;
  tint: GlassTintOption;
}

export function ProyectanteDraft({
  systemTitle,
  frameGradId,
  glassGradId,
  steelGradId,
  arrowId,
  finish,
  tint,
}: DraftRenderProps) {
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

      <g transform="translate(92, 86)">
        <line
          x1="0"
          y1="-18"
          x2="250"
          y2="-18"
          stroke="#111111"
          strokeWidth="1"
          markerStart={`url(#${arrowId})`}
          markerEnd={`url(#${arrowId})`}
        />
        <line x1="0" y1="-26" x2="0" y2="-6" stroke="#78716C" strokeWidth="0.9" />
        <line x1="250" y1="-26" x2="250" y2="-6" stroke="#78716C" strokeWidth="0.9" />
        <rect x="78" y="-29" width="94" height="18" fill="#FAF9F6" />
        <text
          x="125"
          y="-15"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fontWeight="600"
          fill="#111111"
        >
          ancho a medida
        </text>

        <line
          x1="-22"
          y1="0"
          x2="-22"
          y2="310"
          stroke="#111111"
          strokeWidth="1"
          markerStart={`url(#${arrowId})`}
          markerEnd={`url(#${arrowId})`}
        />
        <text
          x="-32"
          y="155"
          textAnchor="middle"
          transform="rotate(-90, -32, 155)"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fontWeight="600"
          fill="#111111"
        >
          apertura exterior controlada
        </text>

        <rect
          x="0"
          y="0"
          width="250"
          height="310"
          rx="2"
          fill={`url(#${frameGradId})`}
          stroke={finish.stroke}
          strokeWidth="1.5"
        />
        <rect x="14" y="14" width="222" height="282" fill="none" stroke="#18181B" strokeWidth="2.5" />
        <rect
          x="19"
          y="19"
          width="212"
          height="272"
          fill={`url(#${frameGradId})`}
          stroke={finish.stroke}
          strokeWidth="1.2"
        />
        <rect
          x="33"
          y="33"
          width="184"
          height="244"
          fill={`url(#${glassGradId})`}
          stroke={tint.edgeStroke}
          strokeWidth="1.2"
        />
        <polygon points="52,34 94,34 34,126 34,82" fill={tint.reflection} />
        <polyline
          points="33,33 125,277 217,33"
          fill="none"
          stroke="#FF5A5F"
          strokeWidth="1.6"
          strokeDasharray="6 4"
        />
        <rect x="20" y="72" width="10" height="82" rx="1.5" fill={`url(#${steelGradId})`} stroke="#475569" strokeWidth="0.9" />
        <rect x="220" y="72" width="10" height="82" rx="1.5" fill={`url(#${steelGradId})`} stroke="#475569" strokeWidth="0.9" />
        <rect x="105" y="278" width="40" height="10" rx="3" fill="#111111" stroke="#52525B" strokeWidth="1" />
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
          <line x1="48" y1="36" x2="195" y2="20" stroke="#78716C" strokeWidth="0.9" />
          <text x="200" y="24" fontWeight="600">Doble burlete EPDM</text>
          <line x1="102" y1="142" x2="195" y2="128" stroke="#78716C" strokeWidth="0.9" />
          <text x="200" y="132" fontWeight="600">Brazos acero inox</text>
          <line x1="138" y1="192" x2="195" y2="192" stroke="#78716C" strokeWidth="0.9" />
          <text x="200" y="196" fontWeight="600">Manija de cierre</text>
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
  tracks = 2,
}: DraftRenderProps & { tracks?: 2 | 3 | 4 }) {
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
        {`${systemTitle.toUpperCase()} · ALZADO CORREDIZO (${tracks === 4 ? "4 HOJAS OXXO" : `${tracks} RIELES`})`}
      </text>

      <g transform="translate(80, 86)">
        <line
          x1="0"
          y1="-18"
          x2="456"
          y2="-18"
          stroke="#111111"
          strokeWidth="1"
          markerStart={`url(#${arrowId})`}
          markerEnd={`url(#${arrowId})`}
        />
        <rect x="164" y="-29" width="128" height="18" fill="#FAF9F6" />
        <text
          x="228"
          y="-15"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fontWeight="600"
          fill="#111111"
        >
          {tracks === 4 ? "fija - corr - corr - fija" : tracks === 3 ? "triple corrediza" : "1 fija + 1 corrediza"}
        </text>

        <rect
          x="0"
          y="0"
          width="456"
          height="312"
          rx="2"
          fill={`url(#${frameGradId})`}
          stroke={finish.stroke}
          strokeWidth="1.5"
        />

        {tracks === 2 && (
          <>
            <rect x="14" y="14" width="218" height="280" fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.1" />
            <rect x="28" y="28" width="190" height="252" fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1" />
            <polygon points="48,29 90,29 29,122 29,76" fill={tint.reflection} />
            <line x1="113" y1="154" x2="133" y2="154" stroke="#475569" strokeWidth="1.8" />
            <line x1="123" y1="144" x2="123" y2="164" stroke="#475569" strokeWidth="1.8" />

            <rect x="214" y="12" width="228" height="284" fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.3" />
            <rect x="228" y="26" width="200" height="256" fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1.1" />
            <polygon points="248,27 294,27 229,130 229,82" fill={tint.reflection} />
            <line x1="400" y1="154" x2="262" y2="154" stroke="#FF5A5F" strokeWidth="2.4" markerEnd={`url(#${arrowId})`} />
            <rect x="430" y="124" width="8" height="58" rx="3" fill="#111111" stroke="#71717A" strokeWidth="0.9" />
          </>
        )}

        {tracks === 3 && (
          <>
            {[0, 1, 2].map((col) => {
              const x = 14 + col * 142;
              return (
                <g key={col}>
                  <rect x={x} y={14} width={144} height={282} fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.2" />
                  <rect x={x + 12} y={26} width={120} height={258} fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1" />
                  <polygon points={`${x + 26},27 ${x + 58},27 ${x + 13},106 ${x + 13},68`} fill={tint.reflection} />
                </g>
              );
            })}
            <line x1="398" y1="154" x2="190" y2="154" stroke="#FF5A5F" strokeWidth="2.4" markerEnd={`url(#${arrowId})`} />
          </>
        )}

        {tracks === 4 && (
          <>
            {[0, 1, 2, 3].map((col) => {
              const x = 12 + col * 108;
              return (
                <g key={col}>
                  <rect x={x} y={14} width={108} height={282} fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.2" />
                  <rect x={x + 10} y={26} width={88} height={258} fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1" />
                  <polygon points={`${x + 22},27 ${x + 48},27 ${x + 11},92 ${x + 11},60`} fill={tint.reflection} />
                </g>
              );
            })}
            <line x1="214" y1="154" x2="128" y2="154" stroke="#FF5A5F" strokeWidth="2.4" markerEnd={`url(#${arrowId})`} />
            <line x1="242" y1="154" x2="328" y2="154" stroke="#FF5A5F" strokeWidth="2.4" markerEnd={`url(#${arrowId})`} />
          </>
        )}

        <circle cx="250" cy="291" r="6" fill={`url(#${steelGradId})`} stroke="#334155" strokeWidth="1.1" />
        <circle cx="404" cy="291" r="6" fill={`url(#${steelGradId})`} stroke="#334155" strokeWidth="1.1" />
        <rect x="4" y="298" width="448" height="12" fill="#27272A" stroke="#111111" strokeWidth="1" />
      </g>

      <g transform="translate(566, 92)" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#111111">
        <rect x="0" y="0" width="198" height="298" rx="8" fill="#FFFFFF" stroke="#D8D3CA" strokeWidth="1" />
        <text x="16" y="26" fontWeight="700" fontSize="12">DETALLE DEL SISTEMA</text>
        <text x="16" y="58" fontWeight="600">1. Desplazamiento</text>
        <text x="16" y="74" fill="#4A4A4A" fontSize="10.5">Garruchas regulables de baja fricción.</text>
        <text x="16" y="110" fontWeight="600">2. Cierre hermético</text>
        <text x="16" y="126" fill="#4A4A4A" fontSize="10.5">Seguro lateral / multipunto según serie.</text>
        <text x="16" y="162" fontWeight="600">3. Riel inferior</text>
        <text x="16" y="178" fill="#4A4A4A" fontSize="10.5">Canal continuo con evacuación pluvial.</text>
        <text x="16" y="214" fontWeight="600">4. Sellado perimetral</text>
        <text x="16" y="230" fill="#4A4A4A" fontSize="10.5">Felpa siliconada + burlete EPDM.</text>
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
}: DraftRenderProps) {
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

      <g transform="translate(106, 86)">
        <rect x="0" y="0" width="210" height="316" rx="2" fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.5" />
        <rect x="16" y="16" width="178" height="284" fill={`url(#${frameGradId})`} stroke={finish.stroke} strokeWidth="1.2" />
        <rect x="30" y="30" width="150" height="256" fill={`url(#${glassGradId})`} stroke={tint.edgeStroke} strokeWidth="1.2" />
        <polygon points="48,31 92,31 31,128 31,82" fill={tint.reflection} />

        {/* Línea normativa de giro lateral */}
        <polyline points="178,24 22,158 178,292" fill="none" stroke="#FF5A5F" strokeWidth="1.6" strokeDasharray="6 4" />

        {/* 4 bisagras laterales */}
        {[40, 108, 198, 266].map((y) => (
          <rect key={y} x="4" y={y} width="12" height="22" rx="2" fill={`url(#${steelGradId})`} stroke="#334155" strokeWidth="1" />
        ))}
        {/* Manija + chapa */}
        <rect x="166" y="142" width="12" height="38" rx="3" fill="#111111" />
        <rect x="150" y="148" width="22" height="8" rx="3" fill={`url(#${steelGradId})`} stroke="#334155" strokeWidth="0.9" />
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
          • Burlete perimetral continuo contra corrientes
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
