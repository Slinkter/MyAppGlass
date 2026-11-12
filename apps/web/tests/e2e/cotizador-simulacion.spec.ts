import { test, expect } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";

test.describe("Cotizador Presupuesto - Simulación E2E y PDF", () => {
  test("recorrido completo de cotización y generación de PDF/hoja de presupuesto", async ({ page }) => {
    // 1. Acceso al cotizador desde servicios con categoría y sistema preseleccionados
    await page.goto("/presupuesto?categoria=ventana&sistema=ventana_nova");
    await page.waitForLoadState("networkidle");

    // Verificar que estamos en la pantalla del formulario de ventana
    await expect(page.getByRole("heading", { name: "Datos de su ventana" })).toBeVisible();

    // 2. Ingresar medidas de ventana usando los roles accesibles
    const widthInput = page.getByRole("textbox", { name: "Ancho (en metros)" });
    const heightInput = page.getByRole("textbox", { name: "Alto (en metros)" });

    await widthInput.fill("1,50");
    await heightInput.fill("1,20");

    // Verificar cálculo en vivo de hojas (1.50 m => 2 hojas)
    await expect(page.locator("text=2 hojas")).toBeVisible();

    // 3. Agregar ventana al presupuesto
    const addButton = page.getByRole("button", { name: "Agregar al presupuesto" });
    await addButton.click();

    // Verificar que la ventana aparece en el carrito
    await expect(page.locator("text=Ventana 1")).toBeVisible();

    // 4. Pasar al cierre / formulario de cliente
    const generateBtn = page.getByRole("button", { name: "Generar presupuesto" });
    await generateBtn.click();

    // Verificar que aparece el formulario de cliente
    await expect(page.locator("text=Para generar su presupuesto")).toBeVisible();

    // 5. Llenar datos de cliente de ejemplo
    await page.locator('input[placeholder="Su nombre y apellido"]').fill("Carlos Alberto Mendoza");
    await page.locator('input[placeholder="Su celular peruano"]').fill("974278303");

    // Marcar aceptación de política de privacidad
    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.check({ force: true });

    // 6. Generar captura y PDF de la hoja de presupuesto membretada
    const targetDir = path.resolve(process.cwd(), "docs/presupuestos_generados");
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const pdfPath = path.join(targetDir, "presupuesto_simulacion_nova.pdf");
    const screenshotPath = path.join(targetDir, "presupuesto_pantalla_cotizador.png");

    await page.screenshot({ path: screenshotPath, fullPage: true });

    // Emular impresión para generar el PDF A4 nativo
    await page.emulateMedia({ media: "print" });
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "1cm", bottom: "1cm", left: "1cm", right: "1cm" },
    });

    console.log("PDF generado exitosamente en:", pdfPath);
    console.log("Captura generada exitosamente en:", screenshotPath);
  });
});
