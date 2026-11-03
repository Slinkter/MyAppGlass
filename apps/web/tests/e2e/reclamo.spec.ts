import { test, expect } from "@playwright/test";

test.describe("F7.1 Libro de reclamaciones", () => {
  test("carga el formulario y valida campos obligatorios sin enviar", async ({ page }) => {
    await page.goto("/libro-de-reclamacion");
    await expect(page.getByText("Nombre Completo").first()).toBeVisible();
    await expect(page.getByText("Detalle de la Solicitud").first()).toBeVisible();

    const submit = page.locator('button[type="submit"]');
    await expect(submit).toBeVisible();
    await submit.click();

    // La validación cliente (Zod) debe bloquear el envío: sigue en la misma página y sin modal de éxito.
    await expect(page).toHaveURL(/libro-de-reclamacion/);
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
  // Registro real (submitReclamo) escribe en Firestore: NO ejecutado por diseño.
});
