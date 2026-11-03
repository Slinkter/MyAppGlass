import { test, expect } from "@playwright/test";

test.describe("F7.2 Contacto / cotización", () => {
  test("formulario vacío no se envía y muestra validación", async ({ page }) => {
    await page.goto("/contacto");
    await expect(page.getByPlaceholder("Ej. Juan Pérez")).toBeVisible();
    await page.getByRole("button", { name: /ENVIAR SOLICITUD/i }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.getByPlaceholder("Ej. Juan Pérez")).toBeVisible();
  });

  test("correo inválido se rechaza en cliente", async ({ page }) => {
    await page.goto("/contacto");
    const email = page.getByPlaceholder("tu@email.com");
    await email.fill("no-es-correo");
    await email.blur();
    await page.getByRole("button", { name: /ENVIAR SOLICITUD/i }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("página de presupuesto responde", async ({ page }) => {
    const res = await page.goto("/presupuesto");
    expect(res?.status()).toBe(200);
  });
  // Envío válido llama a submitContacto (Firebase real): NO ejecutado por diseño.
});
