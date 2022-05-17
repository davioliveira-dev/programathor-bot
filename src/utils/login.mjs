import "dotenv/config";
import puppeteer from "puppeteer";

/**
 * @param {puppeteer.Page} page
 */

export default async function login(page) {
  const EMAIL = process.env.EMAIL;
  const PASSWORD = process.env.PASSWORD;

  await page.goto("https://programathor.com.br/users/sign_in");
  await page.waitForSelector("input[type='email']");
  await page.waitForSelector("input[type='password']");
  await page.type("input[type='email']", EMAIL);
  await page.type("input[type='password']", PASSWORD);
  await page.click("input[type='submit']");

  return;
}
