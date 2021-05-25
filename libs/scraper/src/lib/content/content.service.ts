import { Injectable } from "@nestjs/common";
import { ILinkSetting } from "@web-scraping/dto";
import { chromium, Response } from "playwright";

@Injectable()
export class ContentService {
  async loadHtmlPage(setting: ILinkSetting) {
    const browser = await chromium.launch();
    let response: Response;
    try {
      console.time(setting.url);
      const page = await browser.newPage();
      response = await page.goto(setting.url, {
        waitUntil: "domcontentloaded",
      });
      const text = await response.text();
      console.timeEnd(setting.url);
      await page.waitForTimeout(200);
      return { ok: response.ok, text};
    } catch (error) {
      return { ok: false, error };
    } finally {
      await browser.close();
    }
  }
}
