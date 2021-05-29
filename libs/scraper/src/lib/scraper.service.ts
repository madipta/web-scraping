import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Link, Content, ILink, DomainSetting } from "@web-scraping/orm";
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
    private readonly settingRepo: Repository<DomainSetting>
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

  async allContent(domainId: number) {
    let errorCount = 0;
    let totalErrorCount = 0;
    const maxErrorCount = 10;
    const maxTotalErrorCount = 100;
    try {
      const links = await this.getLinksByDomain(domainId);
      for (let i = 0; i < links.length; i++) {
        const response = await this.content(links[i].id);
        if (response.ok) {
          errorCount = 0;
        } else {
          errorCount++;
          totalErrorCount++;
        }
        if (errorCount > maxErrorCount) {
          throw "[SCRAPP ALL CONTENT ERROR] too many errors in a row.";
        }
        if (totalErrorCount > maxTotalErrorCount) {
          throw "[SCRAPP ALL CONTENT ERROR] max total errors reached.";
        }
      }
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "Scrap domain content error!" };
    }
  }

  async content(linkId: number) {
    try {
      const setting = await this.getSettingByLink(linkId);
      if (!setting) {
        throw new Error("Setting not found!");
      }
      const cs = new ContentManager(setting);
      cs.errorLoading$.subscribe(() => {
        this.linkRepo.update(
          { id: setting.id },
          { scraped: true, broken: true }
        );
        throw new Error("Error loading page content!");
      });
      cs.successLoading$.subscribe(() => {
        this.linkRepo.update(
          { id: setting.id },
          { scraped: true, broken: false }
        );
      });
      cs.errorScraping$.subscribe(() => {
        throw new Error("Error scraping content!");
      });
      cs.contentAdd$.subscribe(async (data) => {
        if (await this.contentRepo.count({ id: linkId })) {
          await this.contentRepo.update({ id: linkId }, data);
        } else {
          await this.contentRepo.save({ ...data, id: linkId });
        }
      });
      await cs.manage();
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "Scrap content failed!" };
    }
  }

  private getSettingByLink(linkId: number) {
    return this.linkRepo
      .createQueryBuilder("Link")
      .innerJoin("Link.domain", "Domain")
      .innerJoin("Domain.setting", "Setting")
      .select("Link.id", "id")
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
      .select("Domain.id", "id")
      .addSelect("scrap_index_method", "scrapIndexMethod")
      .addSelect("scrap_index_paging", "scrapIndexPaging")
      .addSelect("scrap_index_format", "scrapIndexFormat")
      .addSelect("Domain.home", "domainHome")
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

  private getLinksByDomain(domainId: number) {
    return this.linkRepo
      .createQueryBuilder("Link")
      .innerJoin("Link.domain", "Domain")
      .select("Link.id", "id")
      .addSelect("Link.domain_id", "domainId")
      .addSelect("Link.scraped", "scraped")
      .where({ domainId, scraped: false })
      .getRawMany<ILink>();
  }
}
