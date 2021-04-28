import { chromium } from "playwright";
import { Injectable } from "@nestjs/common";
import { LinkDataAccess } from "@web-scraping/data-access";
import { Domain, ScrapIndexLink } from "@web-scraping/dto";

@Injectable()
export class WebIndexService {
  constructor(private linkService: LinkDataAccess) {}

  async getHyperlink(indexPage: string, indexPath: string) {
    const browser = await chromium.launch();
    let urls: ScrapIndexLink[];
    try {
      const page = await browser.newPage();
      await page.goto(indexPage, { waitUntil: "domcontentloaded" });
      urls = await page.$$eval(indexPath, (els) =>
        els.map((el) => {
          const url = el.getAttribute("href");
          const start = url.lastIndexOf("/") + 1;
          let end = url.lastIndexOf(".");
          if (end < start) {
            end = url.length;
          }
          const snug = decodeURIComponent(url.substring(start, end));
          let title = el.textContent.trim();
          if (title.length - snug.length < -10) {
            title = snug.replace(/-/g, " ");
          }
          return { title, url };
        })
      );
    } catch (e) {
      console.error(e);
    } finally {
      await browser.close();
    }
    return urls;
  }

  async domainIndexing(domain: Domain) {
    let { home } = domain;
    if (home.substr(home.length - 1) !== "/") {
      home = home + "/";
    }
    const { indexUrl, indexPath } = domain;
    const indexPage = home + indexUrl;
    const urls = await this.getHyperlink(indexPage, indexPath);
    if (urls && urls.length) {
      this.upsertData(domain.id, urls, home, indexUrl);
    }
    return urls;
  }

  async upsertData(
    domainId: number,
    urls: ScrapIndexLink[],
    home: string,
    indexPage: string
  ) {
    const unique = [...new Set(urls)];
    const filtered = unique.filter(
      (a) =>
        a.url &&
        a.url !== home &&
        !a.url.startsWith(home + "#") &&
        a.url !== indexPage &&
        !a.url.startsWith(indexPage + "#") &&
        a.url.startsWith(home)
    );
    await Promise.all(
      filtered.map(async (link) => {
        this.linkService.upsert({
          url: link.url,
          title: link.title,
          domainId,
        });
      })
    );
  }
}
