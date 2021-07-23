import { chromium, devices } from "playwright";
import { IScrapeLoader } from "./loader.interface";

export class SpaLoader implements IScrapeLoader<string> {
  async load(url: string) {
    const browser = await chromium.launch();
    try {
      console.time(url);
      const device = devices['Galaxy S5'];
      const context = await browser.newContext({
        ...device
      });
      const page = await context.newPage();
      await page.goto(url, {
        waitUntil: "domcontentloaded",
      });
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      const text = await page.innerHTML("body");
      console.timeEnd(url);
      return text;
    } catch (e) {
      console.timeEnd(url);
      console.error("[SpaLoader | load]", e);
      throw `[SpaLoader | load] loading-failed ${url}`;
    } finally {
      await browser.close();
    }
  }
}
