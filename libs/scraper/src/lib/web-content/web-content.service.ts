import { chromium } from "playwright";
import { Injectable } from "@nestjs/common";
import { ContentService, LinkWithRef } from "@web-scraping/data-access";

@Injectable()
export class WebContentService {
  constructor(private contentService: ContentService) {}

  async linkContent(link: LinkWithRef) {
    const contentPath = link.domain.contentPath;
    const browser = await chromium.launch();
    let content = "";
    try {
      const page = await browser.newPage();
      await page.goto(link.url);
      content = await page.$eval(contentPath, (tc) => (tc ? tc.textContent : ""));
    } catch (e) {
      console.error(e);
    } finally {
      await browser.close();
    }
    if (content) {
      this.contentService.upsert(link.id, content);
    }
    return link;
  }
}
