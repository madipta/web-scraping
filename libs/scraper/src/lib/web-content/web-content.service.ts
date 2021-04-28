import { chromium } from "playwright";
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

  async scrapContent(link: LinkWithRef) {
    const contentPath = link.domain.contentPath;
    const browser = await chromium.launch();
    try {
      const page = await browser.newPage();
      const pageResponse = await page.goto(link.url, {
        waitUntil: "domcontentloaded",
      });
      if (!pageResponse.ok) {
        this.linkDb.update({ where: { id: link.id }, data: { broken: true } });
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
      return { ok: false, error };
    } finally {
      await browser.close();
    }
  }
}
