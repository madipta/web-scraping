import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ScraperService } from "@web-scraping/scraper";
import { AutoNumberInput } from "../core/auto-number-input";
import { BaseResult } from "../core/base-result";

@Resolver()
export class ScraperResolver {
  constructor(private readonly scraper: ScraperService) {}

  @Mutation(() => BaseResult)
  async scrapeContent(
    @Args("input") dto: AutoNumberInput
  ): Promise<BaseResult> {
    return this.scraper.content(dto.id);
  }

  @Mutation(() => BaseResult)
  async scrapeContentByDomain(
    @Args("input") dto: AutoNumberInput
  ): Promise<BaseResult> {
    return this.scraper.allContent(dto.id);
  }
}
