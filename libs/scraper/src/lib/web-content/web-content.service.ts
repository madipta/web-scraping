import { Browser, chromium } from "playwright";
import { Injectable } from "@nestjs/common";
import { ContentDataAccess, LinkDataAccess } from "@web-scraping/data-access";
import { LinkWithRef } from "@web-scraping/dto";

@Injectable()
export class WebContentService {
  constructor(
    private contentDb: ContentDataAccess,
    private linkDb: LinkDataAccess
  ) {}

  async scrap(browser: Browser, link: LinkWithRef) {
    const contentPath = link.domain.contentPath;
    const page = await browser.newPage();

    console.time(`${link.id}`);

    const pageResponse = await page.goto(link.url, {
      waitUntil: "domcontentloaded",
    });

    if (pageResponse.status() === 404) {
      this.linkDb.update({
        where: { id: link.id },
        data: { scraped: true, broken: true },
      });
      throw new Error("Not found!");
    }
    if (!pageResponse.ok) {
      throw new Error(pageResponse.statusText());
    }
    this.linkDb.update({ where: { id: link.id }, data: { broken: false } });
    const pageContent = await page.$eval(contentPath, (tc) =>
      tc ? tc.textContent : ""
    );
    if (pageContent) {
      this.contentDb.upsert(link.id, pageContent.replace(/\s\s+/g, " "));
      this.linkDb.update({
        where: { id: link.id },
        data: { scraped: true },
      });
      console.log(link.id, link.url);
      console.timeEnd(`${link.id}`);
      await page.waitForTimeout(500);
      return { ok: true, result: pageContent };
    }
    throw new Error("No content!");
  }

  async scrapContent(link: LinkWithRef) {
    const browser = await chromium.launch();
    try {
      return await this.scrap(browser, link);
    } catch (error) {
      console.error(link.id, error);
      return { ok: false, error };
    } finally {
      await browser.close();
    }
  }

  async scrapAllContent(domainId: number) {
    console.time(`${domainId}`);
    const browser = await chromium.launch();
    const res = [];
    const links = await this.linkDb.unscrapedDomainLinks({ domainId });
    for (let i = 0; i < links.length && i < 100; i++) {
      console.log(i);
      res.push(await this.scrap(browser, links[i]));
    }
    await browser.close();
    console.timeEnd(`${domainId}`);
    return res;
  }
}
