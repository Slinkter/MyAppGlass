import type { AluminumFinishId, GlassTintId } from "./systemVisualSpecs";

export type ServiceFilterId =
  | "todos"
  | "ventana"
  | "mampara"
  | "ducha"
  | "frenos-hidraulicos"
  | "baranda"
  | "parapeto"
  | "pserie"
  | "pvidrio"
  | "balcones"
  | "celosias"
  | "espejos"
  | "techo"
  | "mantenimiento";

export interface ServicePromptOption {
  id: ServiceFilterId;
  label: string;
}

export interface SystemPromptEntry {
  id: string;
  serviceSlug: Exclude<ServiceFilterId, "todos">;
  serviceLabel: string;
  systemName: string;
  resumenTecnico: string;
  aspectRatio: "4:3" | "16:9" | "1:1";
  /** Indica si el sistema lleva carpintería de aluminio pintado/anodizado */
  usesAluminumFrame: boolean;
  /** Sujeto visual principal y geometría física exacta para Nano Banana */
  visualSubject: string;
  /** Herrajes visibles, burletes, rieles y detalles mecánicos exactos */
  hardwareDetail: string;
  /** Ambiente arquitectónico realista en Lima */
  settingDetail: string;
  /** Encuadre fotográfico e iluminación recomendada */
  cameraDetail: string;
}

export const SERVICE_FILTER_OPTIONS: ServicePromptOption[] = [
  { id: "todos", label: "Todos los servicios (50)" },
  { id: "ventana", label: "Ventana (17)" },
  { id: "mampara", label: "Mampara (9)" },
  { id: "ducha", label: "Box de Ducha (4)" },
  { id: "frenos-hidraulicos", label: "Freno Hidráulico (4)" },
  { id: "baranda", label: "Baranda (3)" },
  { id: "parapeto", label: "Parapeto (3)" },
  { id: "pserie", label: "Puerta en Serie (3)" },
  { id: "pvidrio", label: "Puerta de Vidrio (2)" },
  { id: "balcones", label: "Balcón (1)" },
  { id: "celosias", label: "Celosía (1)" },
  { id: "espejos", label: "Espejo (1)" },
  { id: "techo", label: "Techo (1)" },
  { id: "mantenimiento", label: "Mantenimiento (1)" },
];

const FINISH_PROMPT_MAP: Record<AluminumFinishId, string> = {
  negro: "matte black anodized aluminum 6063-T5 frame",
  mate: "natural silver matte anodized aluminum 6063-T5 frame",
  blanco: "architectural satin white powder-coated aluminum 6063-T5 frame",
  madera: "warm wood-grain textured aluminum 6063-T5 frame",
  champagne: "brushed champagne anodized aluminum 6063-T5 frame",
};

const HARDWARE_FINISH_MAP: Record<AluminumFinishId, string> = {
  negro: "matte black",
  mate: "brushed satin stainless steel / matte silver",
  blanco: "clean satin chrome",
  madera: "brushed stainless steel",
  champagne: "brushed satin nickel",
};

const GLASS_PROMPT_MAP: Record<GlassTintId, string> = {
  incoloro: "crystal-clear transparent architectural glass",
  bronce: "subtle warm bronze-tinted architectural glass",
  gris: "sleek cool charcoal gray-tinted architectural glass",
};

/**
 * Construye un prompt completo y consistente para Nano Banana respetando
 * acabados elegidos, geometría del sistema y regla cero marcas/texto.
 */
export function buildNanoBananaPrompt(
  entry: SystemPromptEntry,
  finishId: AluminumFinishId,
  tintId: GlassTintId,
): string {
  const framePhrase = entry.usesAluminumFrame
    ? FINISH_PROMPT_MAP[finishId]
    : `${HARDWARE_FINISH_MAP[finishId]} structural hardware`;
  const glassPhrase = GLASS_PROMPT_MAP[tintId];

  return [
    `Photorealistic architectural photography for Glass & Aluminum Company catalog (${entry.serviceLabel} — ${entry.systemName}), ratio ${entry.aspectRatio}.`,
    `Subject: ${entry.visualSubject} crafted with ${framePhrase} and ${glassPhrase}.`,
    `Technical details: ${entry.hardwareDetail}.`,
    `Setting: ${entry.settingDetail}.`,
    `Photography & lighting: ${entry.cameraDetail}.`,
    `Constraints: accurate rectilinear architectural lines, physically plausible reflections, zero text, zero numbers, zero logos, zero brand stamps, zero watermarks.`,
  ].join(" ");
}

export const SERVICE_SYSTEM_PROMPTS: SystemPromptEntry[] = [
  // ================= VENTANA (17) =================
  {
    id: "ventana-nova",
    serviceSlug: "ventana",
    serviceLabel: "Ventana",
    systemName: "Nova",
    resumenTecnico:
      "Sistema modular corredizo para vanos residenciales pequeños o medianos con cierre pasante o de aleta.",
    aspectRatio: "4:3",
    usesAluminumFrame: true,
    visualSubject:
      "modular sliding window assembly (1 fixed glass pane + 1 sliding glass sash) with slim aluminum edge channels and glazed central meeting stile",
    hardwareDetail:
      "exposed compact bottom roller housing, sleek toggle wing latch at vertical meeting profile, neat perimeter brush pile weatherstripping and clean silicone perimeter bead",
    settingDetail:
      "sunlit residential apartment kitchen or study nook in Lima with off-white plastered wall and clean tiled windowsill",
    cameraDetail:
      "eye-level three-quarter interior shot, 35mm architectural lens, soft morning daylight, crisp focus on latch and glass edge",
  },
  {
    id: "ventana-serie-20",
    serviceSlug: "ventana",
    serviceLabel: "Ventana",
    systemName: "Serie 20",
    resumenTecnico:
      "Ventana corrediza liviana y económica para vanos pequeños; rieles superior/inferior, jamba, zócalos y traslape con felpa.",
    aspectRatio: "4:3",
    usesAluminumFrame: true,
    visualSubject:
      "compact lightweight sliding residential window with slim perimeter aluminum jambs, bottom and top rails, overlapping vertical stiles and 4mm glass panes",
    hardwareDetail:
      "concealed sliding carriage rollers, flush automatic snap latch mounted into vertical lock stile, clean black EPDM wedge gasket and F-10 brush pile along overlap",
    settingDetail:
      "minimalist modern home bedroom or bathroom upper window opening in Surco, neutral stucco reveal and warm wood interior accents",
    cameraDetail:
      "natural daylight balanced exposure, 35mm rectilinear interior shot showing one sash slid halfway open",
  },
  {
    id: "ventana-serie-25",
    serviceSlug: "ventana",
    serviceLabel: "Ventana",
    systemName: "Serie 25",
    resumenTecnico:
      "Corrediza intermedia de marco en dos carriles de 66 mm y perfiles de 1.20 mm; hoja hasta 1.50 m × 2.20 m con vidrio de 6 mm.",
    aspectRatio: "4:3",
    usesAluminumFrame: true,
    visualSubject:
      "medium-duty 2-track sliding architectural window (66mm frame depth) with rigid aluminum sash profiles holding 6mm monolithic glass",
    hardwareDetail:
      "recessed parrot-beak lock with ergonomic nylon pull grip, dual-track bottom channel with tidy EPDM seals, silicone-treated brush pile at central interlock",
    settingDetail:
      "bright contemporary living/dining window opening overlooking lush backyard garden trees in La Molina",
    cameraDetail:
      "three-quarter architectural shot highlighting rigid 66mm track depth and clean corner miters, natural daylight",
  },
  {
    id: "ventana-serie-28",
    serviceSlug: "ventana",
    serviceLabel: "Ventana",
    systemName: "Serie 28",
    resumenTecnico:
      "Corrediza hermética con desalojo de agua al exterior y cierre lateral y central para vanos expuestos de 6 mm.",
    aspectRatio: "4:3",
    usesAluminumFrame: true,
    visualSubject:
      "weather-tight 2-track sliding window (Serie 28 architectural profile) fitted with 6mm tempered glass and stepped exterior water-drainage sill",
    hardwareDetail:
      "aluminum spiral cam lock (seguro caracol) on side jamb, nylon top guides, smooth bottom track rollers and tight black 6mm EPDM perimeter glazing gasket",
    settingDetail:
      "coastal-facing apartment facade window in Miraflores catching crisp natural sea daylight on light concrete sill",
    cameraDetail:
      "three-quarter interior view slightly angled down toward stepped exterior drainage track, 35mm architectural lens",
  },
  {
    id: "ventana-serie-29",
    serviceSlug: "ventana",
    serviceLabel: "Ventana",
    systemName: "Serie 29",
    resumenTecnico:
      "Ventana corrediza económica y hermética pensada para viviendas modulares y proyectos multifamiliares con vidrio de 4 mm.",
    aspectRatio: "4:3",
    usesAluminumFrame: true,
    visualSubject:
      "modular residential sliding window in crisp rectangular profile proportions for uniform multifamily facade bay with 4mm clear glass",
    hardwareDetail:
      "dual-wheel sliding rollers, compact aluminum snail cam lock, continuous EPDM rubber glazing gasket and dense F-10 brush pile seal",
    settingDetail:
      "clean modern apartment bedroom in San Borja with neutral drywall reveal, roller shade recessed above and oak floor",
    cameraDetail:
      "straight-on three-quarter architectural view, warm morning sunlight casting geometric shadow bars on interior floor",
  },
  {
    id: "ventana-serie-3825",
    serviceSlug: "ventana",
    serviceLabel: "Ventana",
    systemName: "Serie 3825",
    resumenTecnico:
      "Corrediza para edificaciones de mediana altura con alféizar de desalojo de agua en riel doble o sencillo.",
    aspectRatio: "4:3",
    usesAluminumFrame: true,
    visualSubject:
      "mid-rise building sliding window featuring an integrated sloped exterior water-drainage sill lip and clean rectangular aluminum sash frames",
    hardwareDetail:
      "right-hand spiral cam latch with strike plate, double nylon rollers, crisp top/bottom guide inserts and black 4mm perimeter EPDM seals",
    settingDetail:
      "bright mid-rise home office window opening onto urban greenery in San Isidro, crisp masonry reveal",
    cameraDetail:
      "sharp three-quarter angle capturing both interior sash overlap and subtle exterior drainage sill geometry",
  },
  {
    id: "ventana-serie-35",
    serviceSlug: "ventana",
    serviceLabel: "Ventana",
    systemName: "Serie 35",
    resumenTecnico:
      "Sistema batiente hermético con felpa perimetral y burlete de cuña; apertura 45° o 90° hasta 0.80 × 2.10 m.",
    aspectRatio: "4:3",
    usesAluminumFrame: true,
    visualSubject:
      "inward-swinging architectural casement window (vertical side-hung single sash open at 45 degrees) with clean perimeter frame and snap glazing beads",
    hardwareDetail:
      "four precision matching aluminum hinges along vertical jamb, mortised lever handle lockset, flush shoot bolt, wedge EPDM gasket and perimeter brush seal",
    settingDetail:
      "quiet architectural study or dressing room in San Isidro with matte stucco walls and warm oak credenza beside opening",
    cameraDetail:
      "interior three-quarter perspective clearly revealing hinges and 45-degree casement swing depth, natural skylight",
  },
  {
    id: "ventana-serie-62",
    serviceSlug: "ventana",
    serviceLabel: "Ventana",
    systemName: "Serie 62",
    resumenTecnico:
      "Corrediza perimetral de línea europea con marco doble de 100 mm, cierre embutido y hoja hasta 1.30 × 2.30 m.",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "heavy-duty European perimeter sliding window (100mm deep double-track frame, substantial 45-degree mitered sash corners) with 8mm safety glass",
    hardwareDetail:
      "slim European multipoint cremona lever handle, flush recessed automatic pull latch, quiet high-load nylon rollers and dense EPDM gaskets",
    settingDetail:
      "expansive corner apartment living room window in Miraflores overlooking sunlit park trees and contemporary travertine sill",
    cameraDetail:
      "wide 28mm architectural photograph emphasizing robust 100mm frame depth and clean mitered profile joints",
  },
  {
    id: "ventana-serie-3831",
    serviceSlug: "ventana",
    serviceLabel: "Ventana",
    systemName: "Serie 3831",
    resumenTecnico:
      "Ventana proyectante económica con burlete de doble contacto y cuerpos fijos opcionales; vidrio 4 mm monolítico o laminado.",
    aspectRatio: "4:3",
    usesAluminumFrame: true,
    visualSubject:
      "two-section aluminum window combining a fixed lower glass pane and a compact outward-projecting upper awning sash tilted open at 30 degrees",
    hardwareDetail:
      "visible stainless steel friction extension arms on jamb sides, bottom-rail cam handle, double-contact black EPDM seal around casement perimeter",
    settingDetail:
      "modern apartment facade hallway or bathroom exterior wall with clean cement plaster finish in Lima",
    cameraDetail:
      "interior three-quarter closeup showing upper projecting sash tilted open above lower fixed transom pane",
  },
  {
    id: "ventana-serie-42",
    serviceSlug: "ventana",
    serviceLabel: "Ventana",
    systemName: "Serie 42",
    resumenTecnico:
      "Ventana proyectante hermética de alto desempeño hasta 1.00 m × 1.30 m (10 pisos), apta para termopanel DVH.",
    aspectRatio: "4:3",
    usesAluminumFrame: true,
    visualSubject:
      "heavy-duty European-inspired projecting awning window (42mm deep architectural frame) tilted outward at 35 degrees holding thick insulated double glass",
    hardwareDetail:
      "heavy-gauge stainless steel friction stay arms on both jambs, ergonomic multipoint bottom handle, continuous dual black EPDM acoustic weatherstrip seals",
    settingDetail:
      "bright quiet master bedroom in San Isidro or Miraflores overlooking treetops with linen drapery and timber sill",
    cameraDetail:
      "three-quarter architectural close-up revealing 35-degree tilt angle, double seal depth, and crisp double-glazed edge reflection",
  },
  {
    id: "ventana-vco-031",
    serviceSlug: "ventana",
    serviceLabel: "Ventana",
    systemName: "Corrediza VCO 031",
    resumenTecnico:
      "Ventana corrediza económica de 37.60 mm de sección con doble línea de felpa para controlar la vibración de hojas.",
    aspectRatio: "4:3",
    usesAluminumFrame: true,
    visualSubject:
      "slim 37.6mm architectural sliding aluminum window (1 fixed + 1 sliding sash) with clean narrow perimeter frame and neat vertical overlap stile",
    hardwareDetail:
      "compact side-jamb latch, smooth hidden tandem rollers and double-row brush pile top and bottom to prevent sash rattle",
    settingDetail:
      "clean contemporary home kitchen or guest room in Surco with minimalist white quartz sill",
    cameraDetail:
      "eye-level three-quarter interior view, crisp natural window light, clean architectural lines",
  },
  {
    id: "ventana-vco-036",
    serviceSlug: "ventana",
    serviceLabel: "Ventana",
    systemName: "Corrediza VCO 036",
    resumenTecnico:
      "Ventana corrediza de 63.00 mm de sección con riel inferior inclinado para evacuación de agua; vidrio 4 y 6 mm.",
    aspectRatio: "4:3",
    usesAluminumFrame: true,
    visualSubject:
      "sturdy 63mm section architectural sliding window with noticeably sloped rain-drainage bottom sill track and 6mm clear glazed sashes",
    hardwareDetail:
      "flush automatic vertical lock latch integrated seamlessly in sash stile, heavy-duty bottom rollers, clean EPDM glazing seals and brush pile",
    settingDetail:
      "rain-exposed exterior apartment facade window overlooking garden courtyard in La Molina",
    cameraDetail:
      "architectural three-quarter angle highlighting sloped drainage sill profile and crisp mitered sash geometry",
  },
  {
    id: "ventana-vco-042",
    serviceSlug: "ventana",
    serviceLabel: "Ventana",
    systemName: "Corrediza VCO 042",
    resumenTecnico:
      "Ventana corrediza de 67.10 mm armada con traslape reforzado y rodamientos con billas de acero para vidrio de 6 mm.",
    aspectRatio: "4:3",
    usesAluminumFrame: true,
    visualSubject:
      "rigid 67.1mm architectural sliding window featuring a deep reinforced central interlocking vertical stile and smooth 6mm glazed sashes",
    hardwareDetail:
      "precision steel ball-bearing bottom rollers, recessed automatic jamb latch, thick EPDM glazing rubber and dense perimeter pile",
    settingDetail:
      "contemporary apartment dining area in San Borja with large wall-to-wall window opening and travertine sill",
    cameraDetail:
      "three-quarter framing focusing on thick reinforced central overlap profile and clean specular glass reflections",
  },
  {
    id: "ventana-vco-043",
    serviceSlug: "ventana",
    serviceLabel: "Ventana",
    systemName: "Corrediza VCO 043",
    resumenTecnico:
      "Ventana corrediza de 60.00 mm en configuración triple corrediza, compatible con vidrio monolítico o insulado.",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "wide 3-track triple-sliding aluminum window (60mm three-rail frame) with three equal glass panels staggered smoothly on three parallel tracks for 66% clear opening",
    hardwareDetail:
      "three parallel anodized bottom sill tracks, dual-wheel smooth carriages under each sash, flush automatic jamb latches and tight EPDM perimeter seals",
    settingDetail:
      "wide balcony or garden-view living room wall in La Molina allowing broad two-thirds breeze opening",
    cameraDetail:
      "wide 28mm architectural photograph clearly showing the three stepped sliding sashes stacked neatly to one side",
  },
  {
    id: "ventana-vpr-036",
    serviceSlug: "ventana",
    serviceLabel: "Ventana",
    systemName: "Proyectante VPR 036",
    resumenTecnico:
      "Proyectante hermética de 49.20 mm con contramarco, travesaño y junquillo para vidrio simple o insulado hasta 24 mm.",
    aspectRatio: "4:3",
    usesAluminumFrame: true,
    visualSubject:
      "architectural facade-ready projecting window (49.2mm flush subframe and transom grid) with lower awning sash open 35 degrees beneath a fixed glass transom, fitted with insulated 24mm DVH glass",
    hardwareDetail:
      "concealed stainless steel projection arms, sleek quarter-turn cam handle on bottom rail, snap-on square glazing beads and double EPDM seals",
    settingDetail:
      "modern minimalist office suite or high-rise apartment facade overlooking city skyline in San Isidro",
    cameraDetail:
      "interior three-quarter view emphasizing flush curtain-wall-style transom grid and double-pane glass edge thickness",
  },
  {
    id: "ventana-vpr-042",
    serviceSlug: "ventana",
    serviceLabel: "Ventana",
    systemName: "Proyectante VPR 042",
    resumenTecnico:
      "Proyectante hermética de 49.20 mm con marco de hoja dedicado y junquillos intercambiables para vidrio simple o insulado.",
    aspectRatio: "4:3",
    usesAluminumFrame: true,
    visualSubject:
      "standalone heavy projecting awning window (49.2mm dedicated sash profile) opened outward 35 degrees in a deep concrete architectural recess, holding thick insulated glass",
    hardwareDetail:
      "robust stainless projection friction arms, solid architectural cam lever handle, clean interior glazing bead lines and double EPDM gaskets",
    settingDetail:
      "serene modern bedroom in Miraflores with smooth matte concrete walls and natural oak furnishings",
    cameraDetail:
      "sharp three-quarter interior shot with crisp natural daylight illuminating deep sash shadow lines",
  },
  {
    id: "ventana-serie-80",
    serviceSlug: "ventana",
    serviceLabel: "Ventana",
    systemName: "Serie 80",
    resumenTecnico:
      "Ventana corrediza perimetral europea de 80 mm con cortaviento y cierre multipunto para vanos de gran altura (1.50 × 3.00 m).",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "monumental European heavy-duty sliding window (80mm mitered sash frame, tall ceiling-height panels up to 3.0m) in clean architectural geometry",
    hardwareDetail:
      "sleek multipoint cremona lever handle, central vertical windbreak block (cortaviento), concealed heavy-load nylon rollers, silicone F-15 pile and EPDM seals",
    settingDetail:
      "tall double-height staircase or luxury penthouse living facade in San Isidro with travertine stone walls",
    cameraDetail:
      "wide architectural shot using vertical shift correction, crisp sunlight reflections across tall monolithic glass panes",
  },

  // ================= MAMPARA (9) =================
  {
    id: "mampara-nova",
    serviceSlug: "mampara",
    serviceLabel: "Mampara",
    systemName: "Nova",
    resumenTecnico:
      "Sistema modular corredizo para divisiones interiores y vanos livianos protegidos, con garrucha y seguro pasante o de aleta.",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "tall interior sliding glass partition screen (1 fixed panel + 1 sliding door panel) with ultra-slim edge channels separating dining room from study",
    hardwareDetail:
      "low-profile floor guide track, compact wing latch along central vertical edge and clean glazed silicone joints",
    settingDetail:
      "bright contemporary apartment loft in Miraflores with warm hardwood flooring and indoor plants",
    cameraDetail:
      "wide interior editorial photograph with natural diffused window light passing cleanly through clear interior partition",
  },
  {
    id: "mampara-serie-25",
    serviceSlug: "mampara",
    serviceLabel: "Mampara",
    systemName: "Serie 25",
    resumenTecnico:
      "Corrediza intermedia de 66 mm en dos carriles con zócalo inferior robusto para hojas medianas hasta 1.50 × 2.20 m.",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "2-panel floor-to-ceiling patio sliding glass door (66mm 2-track frame) featuring a wider structural aluminum bottom kick rail and 6mm clear safety glass",
    hardwareDetail:
      "ergonomic black nylon recessed pull handle, parrot-beak mortised terrace lock, clean dual bottom sill tracks and dense 5.5mm pile weatherstripping",
    settingDetail:
      "cozy modern living room opening onto covered wooden pergola patio in Surco",
    cameraDetail:
      "wide interior-to-exterior shot at eye height showing taller bottom kick rail proportion and smooth sliding opening",
  },
  {
    id: "mampara-serie-7038",
    serviceSlug: "mampara",
    serviceLabel: "Mampara",
    systemName: "Serie 7038",
    resumenTecnico:
      "Mampara corrediza perimetral con hojas tubulares de gran tamaño (hasta 2.00 m × 2.80 m) en fijo-corrediza o doble corrediza.",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "wide-span tubular-sash sliding glass patio door (2.0m wide per leaf × 2.8m tall, fixed + sliding layout) with crisp bold rectangular tubular stiles",
    hardwareDetail:
      "heavy-duty needle-bearing tandem rollers concealed inside tubular bottom rail, flush keyed terrace latch with strike plate and 6mm black glazing rubber",
    settingDetail:
      "spacious residential family room opening to sunlit poolside stone terrace in La Molina",
    cameraDetail:
      "wide 24mm architectural photography capturing expansive 2.0m glass span without central mullions",
  },
  {
    id: "mampara-serie-80",
    serviceSlug: "mampara",
    serviceLabel: "Mampara",
    systemName: "Serie 80",
    resumenTecnico:
      "Mampara corrediza europea silenciosa para hojas de gran formato hasta 1.50 m × 3.00 m con riel de desagüe y cremona.",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "floor-to-ceiling European heavy sliding glass patio door (Serie 80, 3.0m tall monolithic panes) partially slid open linking living room and garden terrace",
    hardwareDetail:
      "sleek European cremona handle with multipoint concealed lock, flush recessed anodized drainage floor track, windbreak interlock and EPDM perimeter seals",
    settingDetail:
      "luxury contemporary residence in La Molina or San Isidro with smooth microcement interior floor flowing onto stone patio",
    cameraDetail:
      "editorial architectural wide shot, 24mm tilt-shift rectilinear perspective, bright natural daylight",
  },
  {
    id: "mampara-mco-042",
    serviceSlug: "mampara",
    serviceLabel: "Mampara",
    systemName: "Corrediza MCO 042",
    resumenTecnico:
      "Mampara corrediza de 67.10 mm adaptable de 2 hojas hasta 4 hojas (fija-corrediza-corrediza-fija) con traslape y zócalo reforzado.",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "4-panel wide architectural sliding patio door system in symmetrical fixed-sliding-sliding-fixed (OXXO) configuration with central double meeting stiles pulled wide open",
    hardwareDetail:
      "67.1mm structural track depth, reinforced lower sash rail, flush recessed automatic latches on central meeting stiles and clean EPDM glazing seals",
    settingDetail:
      "wide contemporary living-dining facade opening completely onto lush suburban terrace lawn in La Molina",
    cameraDetail:
      "symmetrical wide 24mm architectural view showcasing expansive centered 4-panel OXXO terrace opening",
  },
  {
    id: "mampara-mco-043",
    serviceSlug: "mampara",
    serviceLabel: "Mampara",
    systemName: "Corrediza MCO 043",
    resumenTecnico:
      "Mampara corrediza robusta de 90.00 mm con adaptador de marco triple y hoja apta para vidrio grueso 8–10 mm o insulado.",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "heavy architectural 3-track sliding patio door (90mm deep triple-rail aluminum frame) with thick 10mm monolithic or insulated glass panels gliding effortlessly",
    hardwareDetail:
      "flush low-profile 3-rail floor threshold, heavy dual-wheel carriages, manual flush safety latch and thick continuous EPDM gaskets",
    settingDetail:
      "upscale penthouse terrace overlooking city skyline in San Isidro with travertine terrace deck",
    cameraDetail:
      "dramatic wide three-quarter angle highlighting 90mm triple-rail depth and thick heavy glass reflections",
  },
  {
    id: "mampara-mco-044",
    serviceSlug: "mampara",
    serviceLabel: "Mampara",
    systemName: "Corrediza MCO 044",
    resumenTecnico:
      "Mampara corrediza de gran sección (109.80 mm) diseñada para hojas monumentales de 6 u 8 mm.",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "extra-heavy monumental architectural sliding glass wall (massive 109.8mm structural frame depth) with oversized floor-to-ceiling panels framing a double-height garden view",
    hardwareDetail:
      "high-capacity structural bottom rollers, crisp deep interlock stiles, heavy-duty terrace latch and continuous EPDM perimeter gaskets",
    settingDetail:
      "architectural designer home in La Molina with exposed concrete beams, warm wood ceiling and wide garden opening",
    cameraDetail:
      "grand wide-angle architectural editorial photograph, crisp natural daylight, bold profile depth",
  },
  {
    id: "mampara-mbt-035",
    serviceSlug: "mampara",
    serviceLabel: "Mampara",
    systemName: "Batiente MBT 035",
    resumenTecnico:
      "Mampara batiente de 41.30 mm con junquillos a 45° por ambos lados para vanos de poco espesor.",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "double-leaf inward-swinging French-style aluminum glass terrace door (slim 41.3mm architectural profile) with crisp 45-degree mitered glazing beads on both faces",
    hardwareDetail:
      "six architectural butt hinges, slim vertical lever handle cylinder lockset, flush top/bottom shoot bolt on passive leaf and neat EPDM gasket",
    settingDetail:
      "intimate courtyard terrace or balcony access in Miraflores framed by warm plaster walls and potted olive trees",
    cameraDetail:
      "interior eye-level shot with one French glass leaf swung inward at 60 degrees catching soft daylight",
  },
  {
    id: "mampara-mbt-036",
    serviceSlug: "mampara",
    serviceLabel: "Mampara",
    systemName: "Batiente MBT 036",
    resumenTecnico:
      "Mampara batiente de 80.00 mm con bordes redondeados compatible con vidrio simple de 6 mm o insulado hasta 20 mm.",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "robust 80mm deep European-style hinged glass patio door (single swing door beside fixed glass sidelight) featuring softly rounded aluminum sash edges and thick 20mm insulated glass",
    hardwareDetail:
      "heavy-duty barrel hinges, stainless architectural lever lockset, deep perimeter weather-stop center rebate and dense EPDM acoustic seals",
    settingDetail:
      "quiet garden-facing home studio or terrace lounge in San Borja with oak flooring and minimalist decor",
    cameraDetail:
      "three-quarter architectural shot clearly showing soft rounded 80mm aluminum profile contour and double-glass depth",
  },

  // ================= BOX DE DUCHA (4) =================
  {
    id: "ducha-sistema-corredizo",
    serviceSlug: "ducha",
    serviceLabel: "Box de Ducha",
    systemName: "Sistema Corredizo",
    resumenTecnico:
      "Riel superior aéreo cromado con hojas en vidrio templado de 6 u 8 mm para baños frontales o esquineros.",
    aspectRatio: "4:3",
    usesAluminumFrame: false,
    visualSubject:
      "frameless 8mm tempered clear glass sliding shower enclosure spanning wall-to-wall with a sleek square/round overhead chrome glide rail and zero perimeter aluminum frame",
    hardwareDetail:
      "chrome-finish top gliding rail, triangular smooth roller carriages, subtle bottom floor guide, round chrome finger knob and clear vertical splash seal",
    settingDetail:
      "bright contemporary Lima bathroom with large-format stone porcelain tile walls, matte shower mixer and linear drain",
    cameraDetail:
      "straight-on three-quarter bathroom architectural photograph, warm skylight illuminating crisp glass edge",
  },
  {
    id: "ducha-kit-1-hoja",
    serviceSlug: "ducha",
    serviceLabel: "Box de Ducha",
    systemName: "Kit de ducha de 1 hoja",
    resumenTecnico:
      "Box frontal de 1 paño fijo y 1 hoja corrediza sobre riel de 1.80 m en acabado cromado o acero inoxidable.",
    aspectRatio: "4:3",
    usesAluminumFrame: false,
    visualSubject:
      "frameless wall-to-wall 1.80m sliding glass shower screen (1 stationary panel + 1 sliding door) with exposed cylindrical stainless steel rollers riding smoothly along a polished round top bar",
    hardwareDetail:
      "round 304 stainless steel top tubular rail mounted into side tiles, two exposed circular roller wheels, round pull knob, wall U-channel and clear anti-splash vinyl seal",
    settingDetail:
      "minimalist modern bathroom in Miraflores with matte light-gray porcelain wall tiles and warm wood floating vanity beside the shower",
    cameraDetail:
      "three-quarter interior shot focusing cleanly on exposed stainless roller rail and crisp frameless tempered glass edge",
  },
  {
    id: "ducha-kit-corredizo",
    serviceSlug: "ducha",
    serviceLabel: "Box de Ducha",
    systemName: "Kit de ducha corredizo",
    resumenTecnico:
      "Box frontal con 2 hojas corredizas en riel de 1.80 m para vanos que requieren acceso amplio por ambos lados.",
    aspectRatio: "4:3",
    usesAluminumFrame: false,
    visualSubject:
      "double-sliding frameless 8mm tempered glass shower enclosure (both glass panels sliding independently on dual-track top chrome rail for left or right shower entry)",
    hardwareDetail:
      "slim dual-channel chrome overhead bar, double roller hangers, two polished chrome finger knobs (one on each door leaf), dual floor guides and vertical vinyl sweeps",
    settingDetail:
      "modern family bathroom in San Borja with large beige travertine-look wall tiles and recessed shower niche",
    cameraDetail:
      "eye-level three-quarter bathroom shot showing both sliding doors staggered slightly open from center",
  },
  {
    id: "ducha-kit-esquinero",
    serviceSlug: "ducha",
    serviceLabel: "Box de Ducha",
    systemName: "Kit de ducha esquinero",
    resumenTecnico:
      "Box en escuadra de 2 paños fijos y 2 hojas corredizas en 1.20 m o 1.50 m con acceso por el vértice.",
    aspectRatio: "4:3",
    usesAluminumFrame: false,
    visualSubject:
      "90-degree L-shaped corner frameless glass shower enclosure (2 fixed wall panels + 2 sliding corner-meeting doors opening from the front corner) in clear 6–8mm tempered glass",
    hardwareDetail:
      "continuous L-shaped corner overhead chrome rail with mitered corner bracket, dual sliding rollers, two chrome door knobs and magnetic corner meeting seal",
    settingDetail:
      "compact contemporary en-suite bathroom in Surco with white marble-vein tile and warm indirect mirror light",
    cameraDetail:
      "three-quarter corner perspective looking directly toward the open 90-degree corner entrance of the shower",
  },

  // ================= FRENO HIDRÁULICO (4) =================
  {
    id: "freno-piso-estandar",
    serviceSlug: "frenos-hidraulicos",
    serviceLabel: "Freno Hidráulico",
    systemName: "Freno Hidráulico de Piso",
    resumenTecnico:
      "Mecanismo empotrado en piso de dos velocidades con retención a 90° y herrajes superior e inferior mate.",
    aspectRatio: "4:3",
    usesAluminumFrame: false,
    visualSubject:
      "low three-quarter close-up architectural photograph of a frameless 10mm tempered glass swing door resting on a flush brushed stainless steel rectangular floor closer cover plate recessed seamlessly into stone flooring",
    hardwareDetail:
      "brushed stainless/matte corner bottom patch fitting gripping the glass edge, concealed floor hydraulic closer plate flush with tile, matching corner floor lock and upper pivot patch",
    settingDetail:
      "bright upscale office lobby or clinic entrance in San Isidro with honed travertine stone floor",
    cameraDetail:
      "low architectural detail shot angled toward the floor pivot hardware with door held crisply open at 90 degrees",
  },
  {
    id: "freno-bisagra-aerea",
    serviceSlug: "frenos-hidraulicos",
    serviceLabel: "Freno Hidráulico",
    systemName: "Bisagra Aérea Hidráulica",
    resumenTecnico:
      "Cierrapuertas hidráulico aéreo instalado en cabezal y hoja para puertas de hasta 65 kg sin perforar el piso.",
    aspectRatio: "4:3",
    usesAluminumFrame: false,
    visualSubject:
      "upper header detail shot of a frameless glass or aluminum interior entry door fitted with a compact overhead hydraulic door closer body mounted neatly at the top lintel without any floor cutout",
    hardwareDetail:
      "compact architectural overhead hydraulic closer unit with articulated or slide-channel arm, clean mounting bracket and continuous unbroken floor tile beneath the door",
    settingDetail:
      "modern commercial office hallway or medical consultation room in Miraflores with hardwood or radiant floor",
    cameraDetail:
      "slightly upward three-quarter architectural view emphasizing clean overhead closer hardware and intact floor below",
  },
  {
    id: "freno-sevax",
    serviceSlug: "frenos-hidraulicos",
    serviceLabel: "Freno Hidráulico",
    systemName: "Freno hidráulico de piso alto tránsito (Línea europea)",
    resumenTecnico:
      "Freno hidráulico de piso para puertas de vidrio de alto tránsito con herraje inferior reforzado acabado mate.",
    aspectRatio: "4:3",
    usesAluminumFrame: false,
    visualSubject:
      "commercial high-traffic entrance featuring heavy 10mm tempered glass double swing doors mounted over flush heavy-duty stainless floor closer plates and reinforced bottom rail patch fittings",
    hardwareDetail:
      "long vertical tubular stainless pull handles, heavy brushed matte reinforced lower patch fittings, precision flush floor closer cover plates embedded in granite",
    settingDetail:
      "modern boutique corporate lobby or showroom entrance in San Isidro with warm architectural stone walls",
    cameraDetail:
      "architectural entrance perspective highlighting symmetric floor closer hardware and crisp door gap alignment",
  },
  {
    id: "freno-dorma",
    serviceSlug: "frenos-hidraulicos",
    serviceLabel: "Freno Hidráulico",
    systemName: "Freno hidráulico de piso reforzado (Hasta 180 kg / 1250 mm)",
    resumenTecnico:
      "Freno hidráulico reforzado para hojas anchas hasta 1250 mm y 180 kg, fuerza regulable 2–5 y retención 90°.",
    aspectRatio: "4:3",
    usesAluminumFrame: false,
    visualSubject:
      "extra-wide monumental 1250mm frameless tempered glass entrance door held cleanly at a 90-degree hold-open angle over an architectural heavy-duty stainless steel floor closer plate",
    hardwareDetail:
      "heavy-duty brushed stainless top and bottom pivot patch fittings, tall vertical stainless push/pull handle, flush wide stainless steel floor closer box cover",
    settingDetail:
      "premium corporate tower reception lobby in San Isidro with dark basalt floor and warm timber soffit lighting",
    cameraDetail:
      "three-quarter architectural shot balancing wide 1.25m door proportion and crisp lower floor-closer engineering",
  },

  // ================= BARANDA (3) =================
  {
    id: "baranda-minimalista",
    serviceSlug: "baranda",
    serviceLabel: "Baranda",
    systemName: "Sistema Baranda Minimalista",
    resumenTecnico:
      "Baranda con mínima obstrucción visual en vidrio templado 10–12 mm o laminado, fijada en canal base U o botones.",
    aspectRatio: "16:9",
    usesAluminumFrame: false,
    visualSubject:
      "frameless architectural glass balcony railing in thick 12mm laminated tempered glass anchored continuously into a sleek recessed aluminum U-base shoe channel with zero vertical posts",
    hardwareDetail:
      "extruded aluminum U-channel base trim cleanly flush with terrace floor edge, optional slim circular aluminum top cap rail and polished green-tint glass edges",
    settingDetail:
      "sunlit residential ocean-view or park-view terrace balcony in Miraflores with porcelain deck tiles",
    cameraDetail:
      "wide diagonal architectural shot along terrace edge showcasing uninterrupted glass line",
  },
  {
    id: "baranda-pasamanos-tubular",
    serviceSlug: "baranda",
    serviceLabel: "Baranda",
    systemName: "Sistema Baranda con Pasamanos Tubular",
    resumenTecnico:
      "Baranda con parantes y pasamanos tubulares continuos más paños de vidrio sujetos mediante abrazaderas mecánicas.",
    aspectRatio: "16:9",
    usesAluminumFrame: false,
    visualSubject:
      "architectural residential staircase and upper mezzanine landing balustrade with round brushed stainless steel vertical posts, continuous round top handrail and 8mm tempered glass infill panels",
    hardwareDetail:
      "cylindrical glass clamp brackets (D-clamps) gripping glass cleanly between tubular posts, round floor base flange covers (canoplas) bolted to stair stringer",
    settingDetail:
      "modern open-plan double-height home in La Molina with warm floating wood stair treads and natural skylight",
    cameraDetail:
      "angled three-quarter staircase shot following handrail slope cleanly upward",
  },
  {
    id: "baranda-acero-inox",
    serviceSlug: "baranda",
    serviceLabel: "Baranda",
    systemName: "Baranda de acero inoxidable",
    resumenTecnico:
      "Baranda armada con accesorios tubulares (bridas, codos, tees, terminales y canoplas) y vidrio templado 6–8 mm.",
    aspectRatio: "16:9",
    usesAluminumFrame: false,
    visualSubject:
      "clean coastal terrace guardrail constructed with 304 brushed stainless steel tubular stanchions, modular elbow/tee/end-cap fittings and clear 8mm tempered glass panels",
    hardwareDetail:
      "precision stainless steel elbow corners, articulated glass clamps, round floor base flanges (canoplas) and seamless tubular end caps",
    settingDetail:
      "bright second-floor residential balcony in Surco overlooking residential treetops",
    cameraDetail:
      "eye-level three-quarter exterior photograph highlighting crisp stainless joints and modular elbow transitions",
  },

  // ================= PARAPETO (3) =================
  {
    id: "parapeto-panoramico",
    serviceSlug: "parapeto",
    serviceLabel: "Parapeto",
    systemName: "Sistema Parapeto Panorámico",
    resumenTecnico:
      "Cerramiento continuo sobre antepecho o borde de losa en cristal templado/laminado con fijaciones simples y pasamanos adaptable.",
    aspectRatio: "16:9",
    usesAluminumFrame: false,
    visualSubject:
      "elevated terrace safety parapet in continuous 10.76mm laminated glass panels mounted above a crisp architectural concrete half-wall (antepecho) with discrete aluminum/stainless point clamps",
    hardwareDetail:
      "clean 2-glass corner union clips, simple floor/wall clamp brackets, optional slim aluminum top cap and crystal clear polished vertical silicone joints",
    settingDetail:
      "rooftop terrace pergola lounge in Miraflores overlooking sunny afternoon sky and coastal neighborhood trees",
    cameraDetail:
      "wide architectural panorama along concrete parapet ledge, golden afternoon sunlight",
  },
  {
    id: "parapeto-stick",
    serviceSlug: "parapeto",
    serviceLabel: "Parapeto",
    systemName: "Sistema Muro Cortina Stick",
    resumenTecnico:
      "Fachada flotante armada en obra con montantes verticales, travesaños y cristales enmarcados con silicona estructural.",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "modern commercial building exterior curtain wall facade built on crisp architectural vertical mullions and horizontal transoms with flush structural silicone glazed glass grid and integrated projecting vents",
    hardwareDetail:
      "clean dark structural silicone weather joints between glass modules, subtle exposed aluminum pressure caps or flush structural glazing lines and crisp slab-edge anchors behind spandrel glass",
    settingDetail:
      "modern boutique corporate building exterior on an avenue in San Isidro against clear blue sky",
    cameraDetail:
      "exterior architectural upward three-quarter shot with tilt-shift rectilinear verticals",
  },
  {
    id: "parapeto-unitizado",
    serviceSlug: "parapeto",
    serviceLabel: "Parapeto",
    systemName: "Sistema Muro Cortina Frame / Unitizado",
    resumenTecnico:
      "Fachada modular con paneles de aluminio y cristal preensamblados para anclaje rápido a losa y junta continua.",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "precision unitized architectural curtain wall facade showing crisp uniform repeating modular glass-and-aluminum cassettes with clean shadow-gap perimeter interlocks across multiple stories",
    hardwareDetail:
      "crisp recessed continuous perimeter expansion gaskets between pre-glazed modular panels, dark spandrel band hiding concrete slab edges and sleek flush solar-control glass",
    settingDetail:
      "contemporary multi-story mixed-use office building exterior in San Isidro or Miraflores under clean daylight",
    cameraDetail:
      "sharp architectural facade elevation detail highlighting precision repeating unitized module shadow lines",
  },

  // ================= PUERTA EN SERIE (3) =================
  {
    id: "pserie-sistema-puerta",
    serviceSlug: "pserie",
    serviceLabel: "Puerta en Serie",
    systemName: "Sistema Puerta Serie",
    resumenTecnico:
      "Puerta batiente enmarcada en aluminio con junquillos a presión y sellado perimetral completo (Serie 35 o Serie 36).",
    aspectRatio: "4:3",
    usesAluminumFrame: true,
    visualSubject:
      "single-leaf hinged architectural aluminum-and-glass full-lite door framed neatly in a crisp rectangular door jamb with pressure-fit glazing beads and clean intermediate kick plate rail",
    hardwareDetail:
      "four precision matching aluminum hinges, clean architectural lever lockset with cylinder, subtle bottom sweep and continuous perimeter EPDM seals",
    settingDetail:
      "modern home laundry patio access or interior terrace entry in Surco with smooth porcelain floor",
    cameraDetail:
      "vertical architectural framing at eye level showing full height of door frame and crisp lever hardware",
  },
  {
    id: "pserie-35",
    serviceSlug: "pserie",
    serviceLabel: "Puerta en Serie",
    systemName: "Serie 35",
    resumenTecnico:
      "Puerta batiente hasta 0.80 × 2.10 m con vidrio de 4 mm, chapa de serie, 4 bisagras y picaporte empotrado.",
    aspectRatio: "4:3",
    usesAluminumFrame: true,
    visualSubject:
      "interior single-leaf aluminum hinged door (0.80m × 2.10m standard proportions) glazed with frosted/obscure or clear 4mm safety glass and lower solid aluminum kick panel",
    hardwareDetail:
      "four sleek matching butt hinges, slim Serie 35 mortise lever handle with cylinder lock, 10-inch flush shoot bolt detail and neat perimeter brush seal",
    settingDetail:
      "clean contemporary utility room, service hallway or interior study access in San Borja",
    cameraDetail:
      "interior three-quarter vertical composition with door slightly ajar at 25 degrees showing hinge side cleanly",
  },
  {
    id: "pserie-36",
    serviceSlug: "pserie",
    serviceLabel: "Puerta en Serie",
    systemName: "Serie 36",
    resumenTecnico:
      "Puerta o mampara batiente clásica de bordes redondeados, de 2 a 4 hojas, hasta 1.00 × 2.40 m con vidrio 6 mm.",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "double-leaf exterior French hinged aluminum glass door (rounded-edge Serie 36 stile contours, 2.4m tall doors beside matching fixed sidelights) with 6mm glass and sturdy middle horizontal rail",
    hardwareDetail:
      "heavy 4x4 hooded architectural hinges, brass/stainless mortise handle lockset, clean black 6mm EPDM rubber gasket and perimeter brush seal",
    settingDetail:
      "sunny suburban garden porch in La Molina with stone threshold and outdoor planter pots",
    cameraDetail:
      "wide symmetrical shot with double doors opened partially outward onto garden patio",
  },

  // ================= PUERTA DE VIDRIO (2) =================
  {
    id: "pvidrio-pivotante-freno",
    serviceSlug: "pvidrio",
    serviceLabel: "Puerta de Vidrio",
    systemName: "Sistema Pivotante con Freno de Piso",
    resumenTecnico:
      "Puerta de cristal templado 8–10 mm sobre eje pivotante superior y freno hidráulico empotrado en piso con retención 90°.",
    aspectRatio: "4:3",
    usesAluminumFrame: false,
    visualSubject:
      "frameless 10mm clear tempered glass architectural pivot entry door framed inside a glass transom and sidelight opening, hinged on top/bottom corner patch pivots",
    hardwareDetail:
      "flush brushed floor closer cover plate under bottom pivot patch, upper transom pivot patch fitting, sleek round or tubular pull handle and floor strike bolt",
    settingDetail:
      "clean boutique commercial storefront or modern office reception entrance in San Isidro",
    cameraDetail:
      "three-quarter architectural vertical shot showing full glass portal from transom to flush floor plate",
  },
  {
    id: "pvidrio-templado-batiente",
    serviceSlug: "pvidrio",
    serviceLabel: "Puerta de Vidrio",
    systemName: "Puerta de vidrio templado",
    resumenTecnico:
      "Puerta batiente o pivotante en vidrio templado 6–10 mm con juego completo de herrajes en acabado mate o negro.",
    aspectRatio: "4:3",
    usesAluminumFrame: false,
    visualSubject:
      "frameless 8–10mm tempered glass interior office swing door with optional slim anodized bottom rail (zócalo) and crisp matching corner hardware fittings",
    hardwareDetail:
      "high/low rotation pivot fittings or hydraulic hinges, floor/rail lock cylinder with strike plate, sleek vertical tubular or circular pull handle",
    settingDetail:
      "light-filled contemporary clinic or architectural studio suite in Miraflores with warm timber walls",
    cameraDetail:
      "interior three-quarter shot capturing clean glass edge transparency and metallic patch hardware reflection",
  },

  // ================= BALCÓN (1) =================
  {
    id: "balcon-panoramico",
    serviceSlug: "balcones",
    serviceLabel: "Balcón",
    systemName: "Sistema Panorámico",
    resumenTecnico:
      "Cerramiento o protección de balcón armada con perfiles de aluminio y cristal templado/laminado con opción de hojas corredizas.",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "panoramic balcony glass enclosure combining clear laminated glass upper sliding panels (to open for breeze or close against wind/rain) seamlessly aligned over a structural lower glass balcony balustrade",
    hardwareDetail:
      "clean corner and T-union support profiles, smooth bottom track rollers, corner safety latches, continuous EPDM weatherstripping and neat perimeter silicone seals",
    settingDetail:
      "coastal high-rise apartment balcony in Miraflores enjoying wide terrace view with comfortable outdoor armchair",
    cameraDetail:
      "wide interior-to-balcony three-quarter photograph balancing cozy balcony seating with clear panoramic sky view",
  },

  // ================= CELOSÍA (1) =================
  {
    id: "celosia-fija-movil",
    serviceSlug: "celosias",
    serviceLabel: "Celosía",
    systemName: "Sistema Celosía Fija y Móvil",
    resumenTecnico:
      "Celosía de lamas fijas de aluminio 6063-T5/T6 para ventilación y protección solar o paletas móviles de vidrio.",
    aspectRatio: "4:3",
    usesAluminumFrame: true,
    visualSubject:
      "architectural ventilation louver screen (celosía) built with crisp parallel angled extruded aluminum slats mounted inside a clean perimeter frame, blocking rain while letting daylight filter through",
    hardwareDetail:
      "precision-angled extruded louver blades, rigid perimeter channel stop frame, concealed stainless fasteners and clean architectural shadow spacing",
    settingDetail:
      "contemporary laundry utility facade or exterior service stairwell in Surco bathed in crisp directional sunlight",
    cameraDetail:
      "angled architectural close-up showcasing rhythmic parallel louver blades and clean geometric light strips",
  },

  // ================= ESPEJO (1) =================
  {
    id: "espejo-flotante",
    serviceSlug: "espejos",
    serviceLabel: "Espejo",
    systemName: "Espejo Flotante a Medida",
    resumenTecnico:
      "Espejo flotante con reflexión >95 % adherido sin marco visible sobre porcelanato, mayólica o muro plano en 2–4 mm (o 6 mm).",
    aspectRatio: "4:3",
    usesAluminumFrame: false,
    visualSubject:
      "large custom wall-mounted frameless architectural float mirror with crisp diamond-polished bevel edges mounted cleanly flush over stone porcelain tile above a minimalist floating basin",
    hardwareDetail:
      "zero visible frame clips — mirror edges cleanly polished and subtly floating with whisper-thin neutral silicone perimeter reveal and subtle indirect warm LED halo behind wall",
    settingDetail:
      "serene contemporary powder room in San Isidro with matte limestone tile wall and brushed faucet",
    cameraDetail:
      "three-quarter architectural bathroom shot avoiding direct camera reflection in the mirror while showing crystal-clear depth",
  },

  // ================= TECHO (1) =================
  {
    id: "techo-cobertura-aluminio",
    serviceSlug: "techo",
    serviceLabel: "Techo",
    systemName: "Sistema Cobertura Aluminio",
    resumenTecnico:
      "Cobertura en tubos rectangulares de aluminio 6063-T5 y policarbonato 6–8 mm UV con perfiles U/F/H y canaleta pluvial.",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "sleek architectural patio pergola roof constructed from crisp rectangular structural aluminum beams (6063-T5) supporting translucent architectural polycarbonate roofing sheets in opal/clear tint",
    hardwareDetail:
      "clean H-profile sheet joiners, snap cap F/U perimeter trim profiles, concealed aluminum rainwater gutter along front fascia and discreet downspout",
    settingDetail:
      "sunlit residential backyard terrace and outdoor dining patio in La Molina with warm brick/stucco wall and garden greenery",
    cameraDetail:
      "upward three-quarter patio view capturing crisp structural aluminum beam grid and soft diffused daylight passing through roofing",
  },

  // ================= MANTENIMIENTO (1) =================
  {
    id: "mantenimiento-preventivo",
    serviceSlug: "mantenimiento",
    serviceLabel: "Mantenimiento",
    systemName: "Mantenimiento Preventivo y Correctivo",
    resumenTecnico:
      "Revisión mecánica, limpieza técnica, regulación de herrajes y reemplazo de garruchas, guías, felpas y burletes cada 12–18 meses.",
    aspectRatio: "16:9",
    usesAluminumFrame: true,
    visualSubject:
      "close-up editorial scene of a skilled architectural technician's hands using a precision hex key and lint-free cloth to adjust bottom carriage rollers and replace fresh weatherstrip pile along an aluminum sliding patio door track",
    hardwareDetail:
      "clean anodized dual floor rail being restored, fresh black EPDM gasket corner, stainless roller carriage adjustment and zero clutter",
    settingDetail:
      "bright sunlit residential terrace threshold in Miraflores with spotless travertine interior floor",
    cameraDetail:
      "shallow depth-of-field editorial documentary photograph, natural daylight, zero uniform logos or text",
  },
];
