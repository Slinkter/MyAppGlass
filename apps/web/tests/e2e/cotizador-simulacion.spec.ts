import { test, expect } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";

test.describe("Cotizador Presupuesto - Simulación E2E y PDF Formal", () => {
  test("recorrido completo de cotización y generación de PDF formal con detalle técnico", async ({ page }) => {
    // 1. Acceso al cotizador desde servicios con categoría y sistema preseleccionados
    await page.goto("/presupuesto?categoria=ventana&sistema=ventana_nova");
    await page.waitForLoadState("networkidle");

    // Verificar que estamos en la pantalla del formulario de ventana
    await expect(page.getByRole("heading", { name: "Datos de su ventana" })).toBeVisible();

    // 2. Ingresar medidas de ventana: 1.50 m ancho × 1.20 m alto
    const widthInput = page.getByRole("textbox", { name: "Ancho (en metros)" });
    const heightInput = page.getByRole("textbox", { name: "Alto (en metros)" });

    await widthInput.fill("1,50");
    await heightInput.fill("1,20");

    // Seleccionar vidrio templado para verificar cálculo específico
    await page.getByRole("combobox", { name: "Tipo de vidrio" }).selectOption("templado");

    // Verificar cálculo en vivo de hojas (1.50 m => 2 hojas)
    await expect(page.locator("text=2 hojas")).toBeVisible();

    // 3. Agregar ventana al presupuesto
    const addButton = page.getByRole("button", { name: "Agregar al presupuesto" });
    await addButton.click();

    // Verificar que la ventana aparece en el carrito con su descripción técnica
    await expect(page.locator("text=Ventana 1")).toBeVisible();

    // 4. Llenar los datos del cliente
    const generateBtn = page.getByRole("button", { name: "Generar presupuesto" });
    await generateBtn.click();

    await expect(page.locator("text=Para generar su presupuesto")).toBeVisible();
    await page.locator('input[placeholder="Su nombre y apellido"]').fill("Carlos Alberto Mendoza");
    await page.locator('input[placeholder="Su celular peruano"]').fill("974278303");

    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.check({ force: true });

    // 5. Asegurar directorios de destino
    const targetDir = path.resolve(process.cwd(), "docs/presupuestos_generados");
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const pdfPath = path.join(targetDir, "presupuesto_formal_a4_carlos_mendoza.pdf");
    const screenshotPath = path.join(targetDir, "hoja_presupuesto_formal_a4.png");

    // 6. Hacer visible la hoja membretada para la captura en alta resolución y el PDF
    await page.evaluate(() => {
      const sheet = document.querySelector(".print-sheet");
      if (sheet) {
        (sheet as HTMLElement).scrollIntoView();
      }
    });

    // Capturar la hoja formal con sus descripciones de producto, medidas, hojas y condiciones
    const sheetElement = page.locator(".print-sheet");
    await expect(sheetElement).toBeVisible();
    await sheetElement.screenshot({ path: screenshotPath });

    // Emular CSS print y generar el PDF A4 oficial
    await page.emulateMedia({ media: "print" });
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
    });

    console.log("PDF oficial A4 generado en:", pdfPath);
    console.log("Captura de la hoja formal en:", screenshotPath);
  });
});
