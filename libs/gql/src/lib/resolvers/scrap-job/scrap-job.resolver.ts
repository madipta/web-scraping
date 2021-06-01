import {
  Args,
  Field,
  ObjectType,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Link, RefineSortParam, ScrapeJob } from "@web-scraping/orm";
import { Repository } from "typeorm";
import { PageListInput } from "../core/page-list-input";
import { PageListResult } from "../core/page-list-result";

@ObjectType()
export class ScrapJobPageListResult extends PageListResult {
  @Field(() => [ScrapeJob], { nullable: true })
  result?: ScrapeJob[];
}

@Resolver(() => ScrapeJob)
export class ScrapJobResolver {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>,
    @InjectRepository(ScrapeJob)
    private readonly scrapJobRepo: Repository<ScrapeJob>
  ) {}

  @Query(() => ScrapJobPageListResult)
  async scrapeJobPagelist(
    @Args("input") dto: PageListInput
  ): Promise<ScrapJobPageListResult> {
    const { pageIndex, pageSize, search, sortBy, sortOrder } = dto;
    const orderBy = RefineSortParam(sortBy ?? "status", sortOrder);
    const queryBuilder = () => {
      const builder = this.scrapJobRepo
        .createQueryBuilder("ScrapeJob")
        .innerJoin("ScrapeJob.link", "Link")
        .select("ScrapeJob.id", "id");
      if (search) {
        builder.where("Link.url ILIKE :search OR Link.title ILIKE :search", {
          search: `%${search}%`,
        });
      }
      return builder;
    };
    try {
      const totalBuilder = queryBuilder();
      const total = await totalBuilder.getCount();
      const resultBuilder = queryBuilder();
      resultBuilder
        .addSelect("ScrapeJob.status", "status")
        .addSelect("ScrapeJob.started_at", "startedAt")
        .addSelect("ScrapeJob.finishedAt", "finishedAt")
        .innerJoin("Link.title", "title")
        .innerJoin("Link.url", "url")
        .orderBy(orderBy)
        .offset((pageIndex - 1) * pageSize)
        .limit(pageSize);
      const result = await resultBuilder.getRawMany();
      return { ok: true, result, total };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  @ResolveField()
  async link(@Parent() scrapjob: ScrapeJob) {
    return this.linkRepo.findOne({ id: scrapjob.linkId });
  }
}
