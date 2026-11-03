-- ====================================================================
-- G&A Company S.A.C. - Vistas Analíticas BI en BigQuery
-- Dataset: gya_bi (Location: us-central1)
-- Costo: $0.00 (Vistas lógicas calculadas al vuelo sin duplicar datos)
-- ====================================================================

-- 1. Análisis de Solicitudes de Presupuesto y Demanda de Cristalería
CREATE OR REPLACE VIEW `gya-app-4c8a9.gya_bi.vw_presupuestos_analitica` AS
SELECT
  document_name AS doc_id,
  timestamp AS sync_timestamp,
  JSON_VALUE(data, '$.number') AS correlativo,
  JSON_VALUE(data, '$.fullName') AS cliente_nombre,
  JSON_VALUE(data, '$.district') AS distrito,
  JSON_VALUE(data, '$.phone') AS telefono,
  JSON_VALUE(data, '$.status') AS estado,
  CAST(JSON_VALUE(data, '$.total') AS FLOAT64) AS total_solicitado,
  JSON_VALUE(data, '$.params.sistema') AS sistema_vidrio,
  JSON_VALUE(data, '$.params.colorAluminio') AS color_aluminio,
  JSON_VALUE(data, '$.params.tipoVidrio') AS tipo_vidrio,
  JSON_VALUE(data, '$.params.colorVidrio') AS color_vidrio,
  CAST(JSON_VALUE(data, '$.params.ancho') AS FLOAT64) AS ancho_mm,
  CAST(JSON_VALUE(data, '$.params.alto') AS FLOAT64) AS alto_mm,
  TIMESTAMP_MILLIS(CAST(JSON_VALUE(data, '$.createdAt._seconds') AS INT64) * 1000) AS fecha_creacion
FROM `gya-app-4c8a9.gya_bi.presupuestos_solicitados_raw_latest`;

-- 2. Análisis de Reclamos y Tiempos de Resolución Legal (INDECOPI)
CREATE OR REPLACE VIEW `gya-app-4c8a9.gya_bi.vw_reclamos_analitica` AS
SELECT
  document_name AS doc_id,
  timestamp AS sync_timestamp,
  JSON_VALUE(data, '$.numeroReclamo') AS numero_reclamo,
  JSON_VALUE(data, '$.tipoReclamo') AS tipo_incidencia,
  JSON_VALUE(data, '$.status') AS estado,
  JSON_VALUE(data, '$.consumidor.nombreCompleto') AS consumidor_nombre,
  JSON_VALUE(data, '$.consumidor.documentoIdentidad') AS consumidor_dni_ruc,
  JSON_VALUE(data, '$.bienContratado.tipo') AS bien_tipo,
  CAST(JSON_VALUE(data, '$.bienContratado.montoReclamado') AS FLOAT64) AS monto_reclamado,
  JSON_VALUE(data, '$.adminNotes') AS notas_administracion,
  TIMESTAMP_MILLIS(CAST(JSON_VALUE(data, '$.createdAt._seconds') AS INT64) * 1000) AS fecha_registro,
  TIMESTAMP_MILLIS(CAST(JSON_VALUE(data, '$.updatedAt._seconds') AS INT64) * 1000) AS fecha_actualizacion
FROM `gya-app-4c8a9.gya_bi.libro_de_reclamaciones_raw_latest`;

-- 3. Análisis de Oportunidades Comerciales (Contacto y Cotizaciones)
CREATE OR REPLACE VIEW `gya-app-4c8a9.gya_bi.vw_contactos_analitica` AS
SELECT
  document_name AS doc_id,
  timestamp AS sync_timestamp,
  JSON_VALUE(data, '$.fullName') AS nombre,
  JSON_VALUE(data, '$.email') AS email,
  JSON_VALUE(data, '$.phone') AS telefono,
  JSON_VALUE(data, '$.service') AS servicio_interes,
  JSON_VALUE(data, '$.status') AS estado_lead,
  TIMESTAMP_MILLIS(CAST(JSON_VALUE(data, '$.createdAt._seconds') AS INT64) * 1000) AS fecha_contacto
FROM `gya-app-4c8a9.gya_bi.contact_submissions_raw_latest`;

-- 4. Análisis de Ventas y Pedidos Online (Tienda Virtual)
CREATE OR REPLACE VIEW `gya-app-4c8a9.gya_bi.vw_pedidos_analitica` AS
SELECT
  document_name AS doc_id,
  timestamp AS sync_timestamp,
  JSON_VALUE(data, '$.orderNumber') AS numero_orden,
  JSON_VALUE(data, '$.customerName') AS cliente_nombre,
  JSON_VALUE(data, '$.customerPhone') AS cliente_telefono,
  CAST(JSON_VALUE(data, '$.total') AS FLOAT64) AS monto_total,
  JSON_VALUE(data, '$.status') AS estado_pedido,
  ARRAY_LENGTH(JSON_EXTRACT_ARRAY(data, '$.items')) AS total_items,
  TIMESTAMP_MILLIS(CAST(JSON_VALUE(data, '$.createdAt._seconds') AS INT64) * 1000) AS fecha_pedido
FROM `gya-app-4c8a9.gya_bi.pedidos_raw_latest`;
