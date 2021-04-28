import { Body, Controller, Post } from "@nestjs/common";
import {
  DomainDataAccess,
  LinkDataAccess,
  LinkWithRef,
} from "@web-scraping/data-access";
import { WebContentService, WebIndexService } from "@web-scraping/scraper";

@Controller("scraping")
export class ScrapingController {
  constructor(
    private readonly domainDb: DomainDataAccess,
    private readonly linkDb: LinkDataAccess,
    private readonly indexService: WebIndexService,
    private readonly contentService: WebContentService
  ) {}

  @Post("index")
  async pageIndex(@Body() dto: { domainId: number }) {
    try {
      const domain = await this.domainDb.get({ id: +dto.domainId });
      const result = await this.indexService.domainIndexing(domain);
      return { ok: true, result: result.length };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  @Post("content")
  async pageContent(@Body() dto: { linkId: number }) {
    const link = (await this.linkDb.findOne({
      id: +dto.linkId,
    })) as LinkWithRef;
    return await this.contentService.scrapContent(link);
  }

  @Post("all-content")
  async allContent(@Body() dto: { linkId: number }) {
    const link = (await this.linkDb.findOne({
      id: +dto.linkId,
    })) as LinkWithRef;
    return await this.contentService.scrapContent(link);
  }
}
