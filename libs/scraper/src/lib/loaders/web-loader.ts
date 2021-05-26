import { chromium, Response  } from "playwright";
import { IContentLoader } from "./content-loader.interface";

export class WebLoader implements IContentLoader {
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
      const ok = response.ok();
      console.timeEnd(url);
      await page.waitForTimeout(200);
      return { ok, text };
    } catch (e) {
      console.error(e);      
      return { ok: false, error: `[NOT LOADED] ${url}` };
    } finally {
      await browser.close();
    }
  }
}
