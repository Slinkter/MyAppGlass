import { test } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";

test("generar PDF formal de 4 hojas con previsualizacion completa", async ({ page }) => {
  await page.goto("/presupuesto");
  await page.waitForLoadState("networkidle");

  await page.locator('input[placeholder*="Carlos"]').fill("Carlos Alberto Mendoza");
  await page.locator('input[placeholder*="974"]').fill("974278303");

  await page.getByRole("textbox", { name: "Ancho (en metros)" }).fill("2,40");
  await page.getByRole("textbox", { name: "Alto (en metros)" }).fill("1,40");

  const select = await page.locator("select").first();
  await select.selectOption("templado");

  await page.getByRole("button", { name: "Agregar al presupuesto" }).click();
  await page.waitForTimeout(500);

  await page.getByRole("button", { name: "PREVISUALIZAR PRESUPUESTO" }).click();
  await page.waitForTimeout(800);

  const targetDir = path.resolve(process.cwd(), "docs/presupuestos_generados");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const sheet = page.locator(".print-sheet").first();
  await sheet.screenshot({ path: path.join(targetDir, "hoja_presupuesto_4_hojas_carlos_mendoza.png") });

  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: path.join(targetDir, "presupuesto_formal_4_hojas_carlos_mendoza.pdf"),
    format: "A4",
    printBackground: true,
    margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
  });
});
