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
export class ScrapeJobPagelistItem extends ScrapeJob {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  url?: string;
}

@ObjectType()
export class ScrapeJobPageListResult extends PageListResult {
  @Field(() => [ScrapeJobPagelistItem], { nullable: true })
  result?: ScrapeJobPagelistItem[];
}

@Resolver(() => ScrapeJob)
export class ScrapeJobResolver {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>,
    @InjectRepository(ScrapeJob)
    private readonly scrapJobRepo: Repository<ScrapeJob>
  ) {}

  @Query(() => ScrapeJobPageListResult)
  async scrapeJobPagelist(
    @Args("input") dto: PageListInput
  ): Promise<ScrapeJobPageListResult> {
    const { pageIndex, pageSize, search, sortBy, sortOrder } = dto;
    const orderBy = RefineSortParam(sortBy ?? "status", sortOrder);
    const queryBuilder = () => {
      const builder = this.scrapJobRepo
        .createQueryBuilder("ScrapeJob")
        .innerJoin("ScrapeJob.link", "Link")
        .select("ScrapeJob.id", "id")
        .addSelect("Link.title", "title")
        .addSelect("Link.url", "url");
      if (search) {
        builder.where("url ILIKE :search OR title ILIKE :search", {
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
        .addSelect("ScrapeJob.created_at", "createdAt")
        .addSelect("ScrapeJob.started_at", "startedAt")
        .addSelect("ScrapeJob.finishedAt", "finishedAt")
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
