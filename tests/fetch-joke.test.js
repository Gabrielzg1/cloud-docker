const { test, expect } = require("@playwright/test");

test.describe("Página de Listar Piadas", () => {
  test.beforeEach(async ({ page }) => {
    // Navegar até a página inicial
    await page.goto("http://localhost:8080/");
  });

  test("Deve buscar e exibir uma piada aleatória", async ({ page }) => {
    // Interceptar a requisição para retornar uma piada fictícia
    await page.route("http://localhost:3000/piada", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          setup: "O que é um pontinho vermelho no jardim?",
          punchline: "É uma cereja espiã!",
        }),
        headers: { "Content-Type": "application/json" },
      });
    });

    // Clicar no botão para buscar uma piada
    const jokeButton = page.locator("#jokeButton");
    await jokeButton.click();

    // Verificar que a piada foi exibida
    const setup = page.locator("#setup");
    const punchline = page.locator("#punchline");
    await expect(setup).toHaveText("O que é um pontinho vermelho no jardim?");
    await expect(punchline).toHaveText("É uma cereja espiã!");
  });

  test("Deve exibir mensagem de erro ao falhar na busca de piada", async ({
    page,
  }) => {
    // Interceptar a requisição para simular um erro
    await page.route("http://localhost:3000/piada", (route) => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: "Erro ao buscar piada" }),
        headers: { "Content-Type": "application/json" },
      });
    });

    // Clicar no botão para buscar uma piada
    const jokeButton = page.locator("#jokeButton");
    await jokeButton.click();

    // Verificar que a mensagem de erro foi exibida
    const setup = page.locator("#setup");
    const punchline = page.locator("#punchline");
    await expect(setup).toHaveText("Error");
    await expect(punchline).toHaveText("Nao foi possivel buscar a piada");
  });
});
