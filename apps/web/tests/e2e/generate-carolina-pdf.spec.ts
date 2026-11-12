import { test } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";

test("flujo completo de Carolina Rivas generando presupuesto formal A4", async ({ page }) => {
  // 1. Ingresar a la página principal
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // 2. Navegar a través del Footer hacia el cotizador
  const footerLink = page.locator('footer a[href="/presupuesto"]');
  await footerLink.scrollIntoViewIfNeeded();
  await footerLink.click();
  await page.waitForLoadState("networkidle");

  // 3. Llenar datos de contacto de Carolina
  await page.locator('input[placeholder*="Carlos"]').fill("Carolina Rivas");
  await page.locator('input[placeholder*="974"]').fill("987654321");

  // 4. Configurar dimensiones de la ventana
  await page.getByRole("textbox", { name: "Ancho (en metros)" }).fill("1,80");
  await page.getByRole("textbox", { name: "Alto (en metros)" }).fill("1,40");

  // 5. Seleccionar vidrio templado
  const selectVidrio = page.locator("select").first();
  await selectVidrio.selectOption("templado");

  // 6. Agregar al presupuesto
  await page.getByRole("button", { name: "Agregar al presupuesto" }).click();
  await page.waitForTimeout(500);

  // 7. Click en PREVISUALIZAR PRESUPUESTO
  await page.getByRole("button", { name: "PREVISUALIZAR PRESUPUESTO" }).click();
  await page.waitForTimeout(1000);

  const targetDir = path.resolve(process.cwd(), "../../docs/presupuestos_generados/carolina");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 8. Screenshot de la hoja formal
  const sheet = page.locator(".print-sheet").first();
  await sheet.screenshot({ path: path.join(targetDir, "presupuesto_formal_a4_carolina_rivas.png") });

  // 9. Generar PDF formal A4
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: path.join(targetDir, "presupuesto_formal_a4_carolina_rivas.pdf"),
    format: "A4",
    printBackground: true,
    margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
  });
});
