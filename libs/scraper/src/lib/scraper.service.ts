import { Injectable, NotImplementedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Link, Content, ILink } from "@web-scraping/orm";
import { Repository } from "typeorm";
import { ISetting } from "./common/setting.interface";
import { ContentService } from "./content/content.service";

@Injectable()
export class ScraperService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>,
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>
  ) {}

  async index() {
    throw new NotImplementedException();
  }

  async allContent(domainId: number) {
    try {
      const links = await this.getLinksByDomain(domainId);
      for (let i = 0; i < links.length; i++) {
        await this.content(links[i].id);
      }
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "Scrap domain content error!" };
    }
  }

  async content(linkId: number) {
    try {
      const setting = await this.getSetting(linkId);
      if (!setting) {
        throw new Error("Setting not found!");
      }
      const cs = new ContentService(setting);
      const res = await cs.load(setting.url);
      if (!res.ok) {
        this.linkRepo.update({ id: setting.id }, { scraped: true, broken: true });
        throw new Error("Error loading page content!");
      }
      this.linkRepo.update({ id: setting.id }, { scraped: true, broken: false });
      const data = await cs.scrap(res.text);
      if (!data) {
        throw new Error("Error scraping content!");
      }
      if (await this.contentRepo.count({ id: linkId })) {
        await this.contentRepo.update({ id: data.id }, data);
      } else {
        await this.contentRepo.save(data);
      }
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "Scrap content failed!" };
    }
  }

  private getSetting(linkId: number) {
    return this.linkRepo
      .createQueryBuilder("Link")
      .innerJoin("Link.domain", "Domain")
      .innerJoin("Domain.setting", "Setting")
      .select("Link.id", "id")
      .addSelect("Link.url", "url")
      .addSelect("Setting.scrap_index_method", "scrapIndexMethod")
      .addSelect("Setting.scrap_index_format", "scrapIndexFormat")
      .addSelect("Setting.index_url", "indexUrl")
      .addSelect("Setting.index_feed_url", "indexFeedUrl")
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
