import { Body, Controller, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Domain, Link } from "@web-scraping/orm";
import { WebContentService, WebIndexService } from "@web-scraping/scraper";

@Controller("scraping")
export class ScrapingController {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>,
    @InjectRepository(Domain)
    private readonly domainRepo: Repository<Domain>,
    private readonly indexService: WebIndexService,
    private readonly contentService: WebContentService
  ) {}

  @Post("index")
  async pageIndex(@Body() dto: { domainId: number }) {
    try {
      const domain = await this.domainRepo.findOne(
        { id: +dto.domainId },
        { relations: ["setting"] }
      );
      const result = await this.indexService.domainIndexing(domain);
      return { ok: true, result: result.length };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  @Post("content")
  async pageContent(@Body() dto: { linkId: number }) {
    const link = await this.linkRepo.findOne(
      { id: dto.linkId },
      { relations: ["domain", "domain.setting"] }
    );
    return await this.contentService.scrapContent(link);
  }

  @Post("all-content")
  async allContent(@Body() dto: { domainId: number }) {
    return await this.contentService.scrapAllContent(+dto.domainId);
  }
}
