import { Body, Controller, Get, Post } from "@nestjs/common";
import { DomainService, LinkService, LinkWithRef } from "@web-scraping/data-access";
import { WebContentService, WebIndexService } from "@web-scraping/scraper";

@Controller("scraping")
export class ScrapingController {
  constructor(
    private readonly domainService: DomainService,
    private readonly linkService: LinkService,
    private readonly indexService: WebIndexService,
    private readonly contentService: WebContentService
  ) {}

  @Get()
  async activeDomains() {
    const domains = await this.domainService.findMany({
      where: {
        active: true,
      },
    });
    return domains;
  }

  @Post("index")
  async domainIndex(@Body() dto: { domainId: number }) {
    const domain = await this.domainService.findOne({ id: +dto.domainId });
    return await this.indexService.domainIndexing(domain);
  }

  @Post("content")
  async pageContent(@Body() dto: { linkId: number }) {
    const link = await this.linkService.findOne({
      id: +dto.linkId,
    }) as LinkWithRef;
    return await this.contentService.linkContent(link);
  }
}
