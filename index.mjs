import puppeteer from "puppeteer";
import login from "./src/utils/login.mjs";
import opportunities from "./src/utils/opportunities.mjs";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 720 },
    waitForInitialPage: true,
  });
  const page = await browser.newPage();
  await login(page);

  console.log("PAGE URL DASHBOARD:", page.url());

  await page.waitForSelector(".bloc-dashboard-match.text-center p");
  await page.click(".bloc-dashboard-match.text-center p");

  console.log("PAGE URL OPPORTUNITIES:", page.url());

  await page.waitForSelector(".candidate-matching-header span");
  await opportunities(page);

  await browser.close();
})();
