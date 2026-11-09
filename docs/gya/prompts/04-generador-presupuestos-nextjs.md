# Prompt 04 · Generador de presupuestos en Next.js (formulario → PDF)

[BLOQUE 1 – ROL Y CONTEXTO]
Eres desarrollador frontend senior (Next.js App Router + TypeScript) y diseñador de documentos.
Lee apps/web/DESIGN.md y todo docs/gya/. El objetivo es reemplazar la plantilla Word que se reusa y se desarma.

[BLOQUE 2 – USUARIOS]
a) Redactor interno: llena un formulario, elige módulos y descarga el PDF.
b) Cliente: recibe el PDF por WhatsApp (ver manual).

[BLOQUE 3 – TAREA]
1. Define en src/types/quote.ts un tipo Quote que cubra los 4 casos de presupuestos-reales.json
   (lista agrupada, opciones A/B, cliente empresa con descuento e IGV, multiproducto con condiciones extendidas).
2. Crea /presupuestos/nuevo: formulario (react-hook-form + zod si ya existe en el repo; si no, pregúntame)
   con grupos e ítems dinámicos, opciones A/B, descuento, IGV, plazo y garantía por producto.
   Los totales se calculan solos.
3. Crea /presupuestos/preview: renderiza el presupuesto en A4 con el concepto elegido
   (empieza por C1 "Clásico renovado"; deja la arquitectura lista para C2, C3, C5 y C6).
4. Componentes fijos: Membrete, PieBancario, InsigniaAntirruido, Firmas, CondicionesPago.
   Módulos: ClienteBloque, ListaAgrupada, OpcionesAB, TotalesDescuentoIGV, DibujoTecnico, FotosReferencia.
5. Carga los 4 casos reales como fixtures para probar cada módulo.

[BLOQUE 4 – DATOS Y MARCA]
Datos fijos solo desde company.json. Tokens y tipografías del manual. Rojo solo en "PRESUPUESTO".
Insignia antirruido: 5 segmentos, relleno = round(%/20). Valores "VERIFICAR" se muestran como [VERIFICAR] en
la vista previa interna y bloquean la descarga hasta resolverse.

[BLOQUE 5 – REGLAS]
A4, @page margin 0, padding 12 mm, una hoja por defecto (hoja 2 opcional para dibujos/fotos).
Módulos vacíos no dejan huecos. Accesible: labels reales en el formulario, contraste ≥ 4.5:1.
Sin persistencia en servidor por ahora (estado local + export JSON/import JSON del presupuesto).

[BLOQUE 6 – ENTREGABLES]
Plan breve antes de codificar (espera mi OK) · tipos · formulario · preview C1 · fixtures de los 4 casos ·
build y lint sin errores · lista de pendientes. Rama `feat/generador-presupuestos`. Sin push sin preguntar.
