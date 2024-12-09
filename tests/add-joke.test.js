import { test, expect } from "@playwright/test";

test.describe("Página de Adicionar Piada", () => {
  test.beforeEach(async ({ page }) => {
    // Navegar até a página de adicionar piada
    await page.goto("http://localhost:8080/form");
  });

  test("Deve adicionar uma nova piada com sucesso", async ({ page }) => {
    // Preencher os campos do formulário
    await page.fill("#setup", "Por que a galinha atravessou a rua?");
    await page.fill("#punchline", "Para chegar ao outro lado!");

    // Interceptar a requisição para verificar o payload enviado
    await page.route("http://localhost:3000/piada", async (route) => {
      const requestBody = JSON.parse(route.request().postData());
      // Validar o payload da requisição
      expect(requestBody).toEqual({
        setup: "Por que a galinha atravessou a rua?",
        punchline: "Para chegar ao outro lado!",
      });

      // Simular uma resposta de sucesso do backend
      await route.fulfill({
        status: 201,
        body: JSON.stringify({
          id: 1,
          setup: requestBody.setup,
          punchline: requestBody.punchline,
        }),
        headers: { "Content-Type": "application/json" },
      });
    });

    // Submeter o formulário
    await page.click('button[type="submit"]');

    // Verificar a mensagem de sucesso exibida
    const message = await page.locator("#responseMessage");
    await expect(message).toHaveText("Piada adicionada com sucesso!");
    await expect(message).toHaveCSS("color", "rgb(0, 128, 0)");
  });

  test("Deve exibir mensagem de erro ao não preencher os campos", async ({
    page,
  }) => {
    // Submeter o formulário sem preencher os campos
    await page.click('button[type="submit"]');

    // Verificar que os campos obrigatórios destacam o erro
    const setupError = await page.locator("#setup:invalid");
    const punchlineError = await page.locator("#punchline:invalid");
    await expect(setupError).toBeTruthy();
    await expect(punchlineError).toBeTruthy();
  });

  test("Deve exibir mensagem de erro se o backend falhar", async ({ page }) => {
    // Preencher os campos do formulário
    await page.fill("#setup", "Por que o tomate foi ao tribunal?");
    await page.fill("#punchline", "Porque ele foi acusado de roubo!");

    // Interceptar a requisição para simular um erro do backend
    await page.route("http://localhost:3000/piada", async (route) => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({ error: "Erro ao adicionar piada" }),
        headers: { "Content-Type": "application/json" },
      });
    });

    // Submeter o formulário
    await page.click('button[type="submit"]');

    // Verificar a mensagem de erro exibida
    const message = await page.locator("#responseMessage");
    await expect(message).toHaveText("Erro: Erro ao adicionar piada");
    await expect(message).toHaveCSS("color", "rgb(255, 0, 0)");
  });
});
