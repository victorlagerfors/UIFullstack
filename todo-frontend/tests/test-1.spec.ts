import { test, expect } from "@playwright/test";

test("Test sign in", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("What's your name?").click();
  await page.getByLabel("What's your name?").fill("Testbot");
  await page.getByRole("button", { name: "Continue" }).click();
  expect(page.getByText("Welcome Tester")).toBeTruthy();
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
  expect(page.getByText(rand)).toBeTruthy();
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
  expect(page.getByText(noteRand)).toBeTruthy();
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
  expect(page.getByText(childRand)).toBeTruthy();
});
