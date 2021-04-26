import { Body, Controller, Post } from "@nestjs/common";
import {
  DomainService,
  LinkService,
  LinkWithRef,
} from "@web-scraping/data-access";
import { WebContentService, WebIndexService } from "@web-scraping/scraper";

@Controller("scraping")
export class ScrapingController {
  constructor(
    private readonly domainService: DomainService,
    private readonly linkService: LinkService,
    private readonly indexService: WebIndexService,
    private readonly contentService: WebContentService
  ) {}

  @Post("index")
  async domainIndex(@Body() dto: { domainId: number }) {
    try {
      const domain = await this.domainService.findOne({ id: +dto.domainId });
      const result = await this.indexService.domainIndexing(domain);
      return { ok: true, result: result.length };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  @Post("content")
  async pageContent(@Body() dto: { linkId: number }) {
    const link = (await this.linkService.findOne({
      id: +dto.linkId,
    })) as LinkWithRef;
    return await this.contentService.linkContent(link);
  }
}
