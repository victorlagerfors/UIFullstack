import { test, expect } from "@playwright/test";

test("Test sign in", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("What's your name?").click();
  await page.getByLabel("What's your name?").fill("Testbot");
  await page.getByRole("button", { name: "Continue" }).click();
  expect(await page.getByText("Welcome Testbot").count()).toEqual(1);
});

test("Test create list", async ({ page }) => {
  const rand = String(Math.floor(Math.random() * 1000000));
  await page.goto("http://localhost:5173/");
  await page.getByLabel("What's your name?").click();
  await page.getByLabel("What's your name?").fill("Testbot");
  await page.getByRole("button", { name: "Continue" }).click();
  await page
    .locator("span")
    .filter({ hasText: "Create ListAdd" })
    .getByRole("textbox")
    .fill(rand);
  await page
    .locator("span")
    .filter({ hasText: "Create ListAdd" })
    .getByRole("button")
    .click();
  expect(await page.getByText(rand).count()).toEqual(1);
});

test("Test create note", async ({ page }) => {
  const listRand = String(Math.floor(Math.random() * 1000000));
  const noteRand = String(Math.floor(Math.random() * 1000000));
  await page.goto("http://localhost:5173/");
  await page.getByLabel("What's your name?").click();
  await page.getByLabel("What's your name?").fill("Testbot");
  await page.getByRole("button", { name: "Continue" }).click();
  await page
    .locator("span")
    .filter({ hasText: "Create ListAdd" })
    .getByRole("textbox")
    .fill(listRand);
  await page
    .locator("span")
    .filter({ hasText: "Create ListAdd" })
    .getByRole("button")
    .click();
  await page.getByTestId("add-new-input").last().fill(noteRand);
  await page.getByTestId("add-new-button").last().click();
  expect(await page.getByText(noteRand).count()).toEqual(1);
});

test("Test create child note", async ({ page }) => {
  const listRand = String(Math.floor(Math.random() * 1000000));
  const noteRand = String(Math.floor(Math.random() * 1000000));
  const childRand = String(Math.floor(Math.random() * 1000000));
  await page.goto("http://localhost:5173/");
  await page.getByLabel("What's your name?").click();
  await page.getByLabel("What's your name?").fill("Testbot");
  await page.getByRole("button", { name: "Continue" }).click();
  await page
    .locator("span")
    .filter({ hasText: "Create ListAdd" })
    .getByRole("textbox")
    .fill(listRand);
  await page
    .locator("span")
    .filter({ hasText: "Create ListAdd" })
    .getByRole("button")
    .click();
  await page.getByTestId("add-new-input").last().fill(noteRand);
  await page.getByTestId("add-new-button").last().click();
  await page.getByTestId("add-button").last().click();
  await page.getByTestId("add-new-input").last().fill(childRand);
  await page.getByTestId("add-new-button").last().click();
  expect(await page.getByText(childRand).count()).toEqual(1);
});

test("Test cost display", async ({ page }) => {
  const listRand = String(Math.floor(Math.random() * 1000000));
  const noteRand = String(Math.floor(Math.random() * 1000000));
  const childRand = String(Math.floor(Math.random() * 1000000));
  const randCost = String(Math.floor(Math.random() * 10000));
  await page.goto("http://localhost:5173/");
  await page.getByLabel("What's your name?").click();
  await page.getByLabel("What's your name?").fill("Testbot");
  await page.getByRole("button", { name: "Continue" }).click();
  await page
    .locator("span")
    .filter({ hasText: "Create ListAdd" })
    .getByRole("textbox")
    .fill(listRand);
  await page
    .locator("span")
    .filter({ hasText: "Create ListAdd" })
    .getByRole("button")
    .click();
  await page.getByTestId("add-new-input").last().fill(noteRand);
  await page.getByTestId("add-new-button").last().click();
  await page.getByTestId("add-button").last().click();
  await page.getByTestId("add-new-input").last().fill(childRand);
  await page.getByTestId("add-new-button").last().click();
  await page.getByTestId("edit-button").last().click();
  await page.locator("input").last().fill(randCost);
  await page.getByTestId("done-button").last().click();
  expect(
    await page
      .getByText(`Total Cost: ${randCost}, Own Cost: ${randCost}`)
      .count()
  ).toEqual(1);
  expect(
    await page.getByText(`Total Cost: ${randCost}, Own Cost: 0`).count()
  ).toEqual(1);
});

test("Test simultaneous editing", async ({ browser }) => {
  const firstUserPage = await (await browser.newContext()).newPage();
  const secondUserPage = await (await browser.newContext()).newPage();
  const listRand = String(Math.floor(Math.random() * 1000000));
  const noteRand = String(Math.floor(Math.random() * 1000000));
  await firstUserPage.goto("http://localhost:5173/");
  await firstUserPage.getByLabel("What's your name?").click();
  await firstUserPage.getByLabel("What's your name?").fill("Testbot");
  await firstUserPage.getByRole("button", { name: "Continue" }).click();
  await secondUserPage.goto("http://localhost:5173/");
  await secondUserPage.getByLabel("What's your name?").click();
  await secondUserPage.getByLabel("What's your name?").fill("Testbot2");
  await secondUserPage.getByRole("button", { name: "Continue" }).click();
  await firstUserPage.getByTestId("add-new-input").first().fill(listRand);
  await firstUserPage.getByTestId("add-new-button").first().click();
  await firstUserPage.getByTestId("add-new-input").last().fill(noteRand);
  await firstUserPage.getByTestId("add-new-button").last().click();
  expect(await firstUserPage.getByText(noteRand).count()).toEqual(1);
  expect(await secondUserPage.getByText(noteRand).count()).toEqual(1);
});
