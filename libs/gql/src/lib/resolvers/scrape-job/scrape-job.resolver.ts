import {
  Args,
  Field,
  InputType,
  ObjectType,
  Query,
  Resolver,
} from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "@web-scraping/auth";
import { RefineSortParam, ScrapeJob } from "@web-scraping/orm";
import { Repository } from "typeorm";
import { PageListInput } from "../core/page-list-input";
import { PageListResult } from "../core/page-list-result";

@InputType()
export class ScrapeJobPageListInput extends PageListInput {
  @Field(() => String, { nullable: false })
  status: string;
}

@ObjectType()
export class ScrapeJobPageListResult extends PageListResult {
  @Field(() => [ScrapeJob], { nullable: true })
  result?: ScrapeJob[];
}

@InputType()
export class GetScrapeJobCountnput {
  @Field(() => String)
  status: string;
}

@Resolver(() => ScrapeJob)
export class ScrapeJobResolver {
  constructor(
    @InjectRepository(ScrapeJob)
    private readonly scrapJobRepo: Repository<ScrapeJob>
  ) {}

  @Role("any")
  @Query(() => ScrapeJobPageListResult)
  async scrapeJobPagelist(
    @Args("input") dto: ScrapeJobPageListInput
  ): Promise<ScrapeJobPageListResult> {
    const { status, pageIndex, pageSize, search, sortBy, sortOrder } = dto;
    const orderBy = RefineSortParam(sortBy ?? "created_at", sortOrder);
    const queryBuilder = () => {
      const builder = this.scrapJobRepo
        .createQueryBuilder("ScrapeJob")
        .select("ScrapeJob.id", "id")
        .addSelect("ScrapeJob.url", "url")
        .where("status=:status", { status });        
      if (search) {
        builder.andWhere("url ILIKE :search", {
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

  @Role("any")
  @Query(() => Number)
  async getScrapeJobCount(
    @Args("input") { status }: GetScrapeJobCountnput
  ): Promise<number> {
    return this.scrapJobRepo.count({ select: ["status"], where: { status } });
  }
}
