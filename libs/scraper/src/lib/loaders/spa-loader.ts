import { chromium, Response  } from "playwright";
import { IScrapeLoader } from "./loader.interface";

export class SpaLoader implements IScrapeLoader<string> {
  async load(url: string) {
    const browser = await chromium.launch();
    let response: Response;
    try {
      console.time(url);
      const page = await browser.newPage();
      response = await page.goto(url, {
        waitUntil: "domcontentloaded",
      });
      const text = await response.text();
      console.timeEnd(url);
      await page.waitForTimeout(200);
      return text;
    } catch (e) {
      console.timeEnd(url);
      throw `[SpaLoader | load] loading-failed ${url}`;
    } finally {
      await browser.close();
    }
  }
}
