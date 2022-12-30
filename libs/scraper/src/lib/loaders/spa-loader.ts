import { chromium, devices } from "playwright";
import { IScrapeLoader } from "./loader.interface";

const ctag = "[SpaLoader]";

export class SpaLoader implements IScrapeLoader<string> {
  async load(url: string) {
    const browser = await chromium.launch();
    try {
      console.time(`${ctag} ${url}`);
      const device = devices["Galaxy S5"];
      const context = await browser.newContext({
        ...device,
      });
      const page = await context.newPage();
      await page.goto(url, {
        waitUntil: "domcontentloaded",
      });
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
      await page.waitForTimeout(500);
      const text = await page.innerHTML("body");
      return text;
    } catch (e) {
      console.error(`${ctag} ${e}`);
      throw `${ctag} loading-failed ${url}`;
    } finally {
      console.timeEnd(`${ctag} ${url}`);
      await browser.close();
    }
  }
}
