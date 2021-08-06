import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Link, DomainSetting } from "@web-scraping/orm";
import { Repository } from "typeorm";
import { ISetting } from "./common/setting.interface";
import { ContentManagerService } from "./content/content-manager";
import { IndexManagerService } from "./index/index-manager";

@Injectable()
export class ScraperService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>,
    @InjectRepository(DomainSetting)
    private readonly settingRepo: Repository<DomainSetting>,
    private readonly indexManagerService: IndexManagerService,
    private readonly contentManagerService: ContentManagerService,
  ) {}

  async index(domainId: number, jobId: string) {
    try {
      const setting = await this.getSetting(domainId);
      if (!setting) {
        throw new Error("[ScraperService | index] Setting not found!");
      }
      await this.indexManagerService.manage(setting, jobId);
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "Scrap index failed!" };
    }
  }

  async content(linkId: number, jobId: string) {
    try {
      const setting = await this.getSettingByLink(linkId);
      if (!setting) {
        throw new Error("[ScraperService | content] Setting not found!");
      }
      const { url } = await this.linkRepo.findOne(linkId);
      await this.contentManagerService.manage(setting, url, jobId);
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
      .select("Link.id", "linkId")
      .addSelect("Link.url", "url")
      .addSelect("Link.domainId", "domainId")
      .addSelect("Domain.home", "domainHome")
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
