import { Browser, chromium } from "playwright";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Content, Link } from "@web-scraping/orm";
import { LinkWithRef } from "@web-scraping/dto";

@Injectable()
export class WebContentService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>,
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>
  ) {}

  async scrap(browser: Browser, link: LinkWithRef) {
    const contentPath = link.domain.contentPath;
    const page = await browser.newPage();
    console.time(`${link.id}`);
    const pageResponse = await page.goto(link.url, {
      waitUntil: "domcontentloaded",
    });
    if (pageResponse.status() === 404) {
      this.linkRepo.update({ id: link.id }, { scraped: true, broken: true });
      throw new Error("Not found!");
    }
    if (!pageResponse.ok) {
      throw new Error(pageResponse.statusText());
    }
    this.linkRepo.update({ id: link.id }, { broken: false });
    const pageContent = await page.$eval(contentPath, (tc) =>
      tc ? tc.textContent : ""
    );
    if (pageContent) {
      this.contentRepo.save({
        linkId: link.id,
        content: pageContent.replace(/\s\s+/g, " "),
      });
      this.linkRepo.update({ id: link.id }, { scraped: true });
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
    try {
      const res = [];
      const links = await this.linkRepo.find({
        where: { domainId, scraped: false },
        relations: ["domain"],
      });
      for (let i = 0; i < links.length && i < 100; i++) {
        res.push(await this.scrap(browser, links[i]));
      }
      await browser.close();
      console.timeEnd(`${domainId}`);
      return res;
    } catch (error) {
      console.error(domainId, error);
      return { ok: false, error };
    } finally {
      await browser.close();
    }
  }
}
