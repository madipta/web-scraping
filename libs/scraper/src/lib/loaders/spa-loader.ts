import { chromium, devices } from "playwright";
import { IScrapeLoader } from "./loader.interface";

export class SpaLoader implements IScrapeLoader<string> {
  async load(url: string) {
    const browser = await chromium.launch();
    try {
      console.time(url);
      const device = devices["Galaxy S5"];
      const context = await browser.newContext({
        ...device,
      });
      const page = await context.newPage();
      await page.goto(url, {
        waitUntil: "networkidle"
      });
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
      await page.waitForTimeout(500);
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
