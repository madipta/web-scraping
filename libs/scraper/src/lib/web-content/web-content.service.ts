import { Browser, chromium, Response } from "playwright";
import { Injectable } from "@nestjs/common";
import {
  ContentService,
  LinkDataAccess,
  LinkWithRef,
} from "@web-scraping/data-access";

@Injectable()
export class WebContentService {
  constructor(
    private contentDb: ContentService,
    private linkDb: LinkDataAccess
  ) {}

  async scrap(browser: Browser, link: LinkWithRef) {
    const contentPath = link.domain.contentPath;
    let pageResponse: Response;
    try {
      const page = await browser.newPage();
      pageResponse = await page.goto(link.url, {
        waitUntil: "domcontentloaded",
      });
      if (!pageResponse.ok) {
        throw new Error(pageResponse.statusText());
      }
      this.linkDb.update({ where: { id: link.id }, data: { broken: false } });
      const pageContent = await page.$eval(contentPath, (tc) =>
        tc ? tc.textContent : ""
      );
      if (pageContent) {
        await Promise.all([
          this.contentDb.upsert(link.id, pageContent.replace(/\s\s+/g, " ")),
          this.linkDb.update({
            where: { id: link.id },
            data: { scraped: true },
          }),
        ]);
        return { ok: true, result: pageContent };
      }
      throw new Error("No content!");
    } catch (error) {
      console.error(error);
      if (!pageResponse) {
        this.linkDb.update({ where: { id: link.id }, data: { broken: true } });
        return { ok: false, error: "Broken link or server not connected!" };
      }
      return { ok: false, error };
    }
  }

  async scrapContent(link: LinkWithRef) {
      const browser = await chromium.launch();
      const res = await this.scrap(browser, link);
      await browser.close();
      return res;
  }
}
