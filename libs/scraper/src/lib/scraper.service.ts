import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Link, Content, DomainSetting, ScrapeJob } from "@web-scraping/orm";
import { Subscription } from "rxjs";
import { Repository } from "typeorm";
import { ISetting } from "./common/setting.interface";
import { ContentManager } from "./content/content-manager";
import { IndexManager } from "./index/index-manager";
import { IIndexScrapResult } from "./index/scrapers/index-scrap.interface";

@Injectable()
export class ScraperService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>,
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>,
    @InjectRepository(DomainSetting)
    private readonly settingRepo: Repository<DomainSetting>,
    @InjectRepository(ScrapeJob)
    private readonly scrapeJobRepo: Repository<ScrapeJob>
  ) {}

  async index(domainId: number) {
    let subs: Subscription;
    try {
      const setting = await this.getSetting(domainId);
      if (!setting) {
        throw new Error("Setting not found!");
      }
      const cs = new IndexManager(setting);
      subs = cs.linksAdd$.subscribe(async (links) => {
        await Promise.all(
          links.map(async (link) => {
            this.linkUpsert(link);
          })
        );
      });
      await cs.manage();
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "Scrap index failed!" };
    } finally {
      if (subs && !subs.closed) {
        subs.unsubscribe();
      }
    }
  }

  async linkUpsert(link: IIndexScrapResult) {
    const count = await this.linkRepo.count({ url: link.url });
    if (!count) {
      this.linkRepo.save({ ...link });
    }
  }

  async content(linkId: number, jobId: string) {
    try {
      const setting = await this.getSettingByLink(linkId);
      if (!setting) {
        throw new Error("Setting not found!");
      }
      const cs = new ContentManager(setting);
      cs.errorLoading$.subscribe(async () => {
        await this.errorLoading(linkId, jobId);
      });
      cs.errorScraping$.subscribe(async () => {
        await this.errorScraping(linkId, jobId);
      });
      cs.successLoading$.subscribe(async () => {
        await this.successLoading(linkId);
      });
      cs.contentAdd$.subscribe(async (data) => {
        await this.contentAdd(linkId, jobId, data);
      });
      await cs.manage();
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "Scrap content failed!" };
    }
  }

  private async contentAdd(linkId, jobId, data) {
    if (await this.contentRepo.count({ id: linkId })) {
      await this.contentRepo.update({ id: linkId }, data);
    } else {
      await this.contentRepo.save({ ...data, id: linkId });
    }
    await this.scrapeJobRepo
      .createQueryBuilder()
      .update()
      .set({
        status: "success",
        finishedAt: () => "Now()",
      })
      .where(`id=:id`, { id: jobId })
      .execute();
  }

  private async errorLoading(linkId, jobId) {
    this.linkRepo.update({ id: linkId }, { scraped: false, broken: true });
    await this.scrapeJobRepo.update(
      { id: jobId },
      { status: "loading failed" }
    );
    throw new Error("Error loading page content!");
  }

  private async errorScraping(linkId, jobId) {
    this.linkRepo.update({ id: linkId }, { scraped: false, broken: false });
    await this.scrapeJobRepo.update(
      { id: jobId },
      { status: "scraping failed" }
    );
    throw new Error("Error scraping content!");
  }

  private async successLoading(linkId) {
    await this.linkRepo.update(
      { id: linkId },
      { scraped: true, broken: false }
    );
  }

  private getSettingByLink(linkId: number) {
    return this.linkRepo
      .createQueryBuilder("Link")
      .innerJoin("Link.domain", "Domain")
      .innerJoin("Domain.setting", "Setting")
      .select("Link.id", "linkId")
      .addSelect("Link.url", "url")
      .addSelect("Link.domainId", "domainId")
      .addSelect("Setting.scrap_index_method", "scrapIndexMethod")
      .addSelect("Setting.scrap_index_paging", "scrapIndexPaging")
      .addSelect("Setting.scrap_index_format", "scrapIndexFormat")
      .addSelect("Setting.index_path", "indexPath")
      .addSelect("Setting.next_path", "nextPath")
      .addSelect("Setting.article_path", "articlePath")
      .addSelect("Setting.scrap_article_method", "scrapArticleMethod")
      .addSelect("Setting.scrap_article_format", "scrapArticleFormat")
      .addSelect("Setting.header_path", "headerPath")
      .addSelect("Setting.category_path", "categoryPath")
      .addSelect("Setting.publish_date_path", "publishDatePath")
      .addSelect("Setting.image_path", "imagePath")
      .where({ id: linkId })
      .getRawOne<ISetting>();
  }

  private getSetting(id: number) {
    return this.settingRepo
      .createQueryBuilder()
      .innerJoin("DomainSetting.domain", "Domain")
      .select("Domain.id", "domainId")
      .addSelect("Domain.home", "domainHome")
      .addSelect("scrap_index_method", "scrapIndexMethod")
      .addSelect("scrap_index_paging", "scrapIndexPaging")
      .addSelect("scrap_index_format", "scrapIndexFormat")
      .addSelect("concat(Domain.home,index_url)", "url")
      .addSelect("index_path", "indexPath")
      .addSelect("next_path", "nextPath")
      .addSelect("article_path", "articlePath")
      .addSelect("scrap_article_method", "scrapArticleMethod")
      .addSelect("scrap_article_format", "scrapArticleFormat")
      .addSelect("header_path", "headerPath")
      .addSelect("category_path", "categoryPath")
      .addSelect("publish_date_path", "publishDatePath")
      .addSelect("image_path", "imagePath")
      .where({ id })
      .getRawOne<ISetting>();
  }
}
