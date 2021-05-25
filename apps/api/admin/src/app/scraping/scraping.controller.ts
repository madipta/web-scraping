import { Body, Controller, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Domain } from "@web-scraping/orm";
import { ScraperService, WebIndexService } from "@web-scraping/scraper";

@Controller("scraping")
export class ScrapingController {
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepo: Repository<Domain>,
    private readonly indexService: WebIndexService,
    private readonly scraper: ScraperService
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
    return this.scraper.content(dto.linkId);
  }

  @Post("all-content")
  async allContent(@Body() dto: { domainId: number }) {
    return await this.scraper.allContent(dto.domainId);
  }
}
