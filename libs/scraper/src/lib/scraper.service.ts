import { Injectable, NotImplementedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILinkSetting } from "@web-scraping/dto";
import { Link, Content, IContent, ILink } from "@web-scraping/orm";
import * as cheerio from "cheerio";
import * as sanitizeHtml from "sanitize-html";
import { Repository } from "typeorm";
import { ContentService } from "./content/content.service";

@Injectable()
export class ScraperService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>,
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>,
    private readonly cs: ContentService
  ) {}

  async index() {
    throw new NotImplementedException();
  }

  async allContent(domainId: number) {
    try {
      const links = await this.domainLinkQuery(domainId);
      for (let i = 0; i < links.length; i++) {
        await this.content(links[i].id);
      }
    } catch (e) {
      console.error(e);
      return { ok: false, error: "Scrap domain content error!" };
    }
  }

  async content(linkId: number) {
    try {
      const link = await this.linkQuery(linkId);
      if (!link) {
        throw new Error("Link not found!");
      }
      const res = await this.cs.loadHtmlPage(link);
      if (!res.ok) {
        this.linkRepo.update({ id: link.id }, { scraped: true, broken: true });
        throw new Error("Error loading page content!");
      }
      this.linkRepo.update({ id: link.id }, { scraped: true, broken: false });
      const responseHtmlText = res.text;
      const $ = cheerio.load(responseHtmlText);
      const data: IContent = { id: linkId };
      data.text = this.getText($, link.contentPath);
      data.html = $(link.contentPath).html();
      data.imageHtml = this.getImage($, link.imagePath);
      data.title = this.getText($, link.headerPath);
      data.category = this.getText($, link.categoryPath);
      data.publishDate = this.getTimestamp($, link.publishDatePath);
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

  removeAllHtmlTags(html: string) {
    return sanitizeHtml(html, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
  }

  removeNonText(html: string) {
    return sanitizeHtml(html, {
      allowedTags: false,
      allowedAttributes: false,
      nonTextTags: ["style", "script", "textarea", "option", "noscript"],
    }).trim();
  }

  getText($: cheerio.CheerioAPI, path: string) {
    if (path) {
      const el = $(path);
      if (el.length) {
        return this.removeAllHtmlTags($.text(el.first()));
      }
    }
    return null;
  }

  getTimestamp($: cheerio.CheerioAPI, path: string) {
    if (path) {
      const el = $(path).first();
      if (el.length) {
        const dtAttr = el.attr("datetime");
        if (dtAttr) {
          const dtAttrVal = new Date(dtAttr);
          if (dtAttrVal) {
            return dtAttrVal;
          }
        }
        const dtText = new Date($.text(el));
        if (dtText) {
          return dtText;
        }
      }
    }
    return null;
  }

  getImage($: cheerio.CheerioAPI, path: string) {
    if (path) {
      const imageEl = $(path).first();
      if (imageEl.length) {
        imageEl.removeAttr("width").removeAttr("height").removeAttr("class");
        return $.html(imageEl);
      }
    }
    return null;
  }

  private linkQuery(linkId: number) {
    return this.linkRepo
      .createQueryBuilder("Link")
      .innerJoin("Link.domain", "Domain")
      .innerJoin("Domain.setting", "Setting")
      .select("Link.id", "id")
      .addSelect("Link.url", "url")
      .addSelect("Setting.indexing_type", "indexingType")
      .addSelect("Setting.load_index_type", "loadIndexType")
      .addSelect("Setting.index_url", "indexUrl")
      .addSelect("Setting.index_feed_url", "indexFeedUrl")
      .addSelect("Setting.index_path", "indexPath")
      .addSelect("Setting.next_path", "nextPath")
      .addSelect("Setting.content_path", "contentPath")
      .addSelect("Setting.header_path", "headerPath")
      .addSelect("Setting.category_path", "categoryPath")
      .addSelect("Setting.publish_date_path", "publishDatePath")
      .addSelect("Setting.image_path", "imagePath")
      .where({ id: linkId })
      .getRawOne<ILinkSetting>();
  }

  private domainLinkQuery(domainId: number) {
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
