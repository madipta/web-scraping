import { InjectQueue } from "@nestjs/bull";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Link } from "@web-scraping/orm";
import { Queue } from "bull";
import { Repository } from "typeorm";
import { AutoNumberInput } from "../core/auto-number-input";
import { BaseResult } from "../core/base-result";

@Resolver()
export class ScraperResolver {
  constructor(
    @InjectQueue("scrape") private readonly scrapeQueue: Queue,
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>
  ) {}

  @Mutation(() => BaseResult)
  async scrapeIndex(@Args("input") dto: AutoNumberInput): Promise<BaseResult> {
    try {
      this.scrapeQueue.add("index", { id: dto.id });
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }

  @Mutation(() => BaseResult)
  async scrapeContent(
    @Args("input") dto: AutoNumberInput
  ): Promise<BaseResult> {
    try {
      this.scrapeQueue.add("content", { id: dto.id });
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }

  @Mutation(() => BaseResult)
  async scrapeContentByDomain(
    @Args("input") dto: AutoNumberInput
  ): Promise<BaseResult> {
    try {
      const links = await this.linkRepo.find({
        domainId: dto.id,
        scraped: false,
      });
      links.forEach((link) => {
        this.scrapeQueue.add("content", { id: link.id });
      });
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }
}
