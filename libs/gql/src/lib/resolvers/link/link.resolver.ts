import {
  Args,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "@web-scraping/auth";
import { Content, Domain, Link, RefineSortParam } from "@web-scraping/orm";
import { Brackets, Repository } from "typeorm";
import { AutoNumberInput } from "../core/auto-number-input";
import { BaseResult } from "../core/base-result";
import { PageListInput } from "../core/page-list-input";
import { PageListResult } from "../core/page-list-result";

@ObjectType()
export class LinkResult extends BaseResult {
  @Field(() => Link, { nullable: true })
  result?: Link;
}

@ObjectType()
export class LinkPageListResult extends PageListResult {
  @Field(() => [Link], { nullable: true })
  result?: Link[];
}

@InputType()
export class LinkPageListInput extends PageListInput {
  @Field(() => Int)
  domainId: number;
}

@Resolver(() => Link)
export class LinkResolver {
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepo: Repository<Domain>,
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>,
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>
  ) {}

  @Role("admin")
  @Mutation(() => LinkResult)
  async deleteLink(@Args("input") dto: AutoNumberInput): Promise<LinkResult> {
    try {
      const { id } = dto;
      await this.contentRepo.delete({ id });
      await this.linkRepo.delete({ id });
      return { ok: true };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  @Role("any")
  @Query(() => LinkResult)
  async getLinkById(@Args("input") dto: AutoNumberInput): Promise<LinkResult> {
    try {
      const result = await this.linkRepo.findOne({ id: dto.id });
      return { ok: true, result };
    } catch (error) {
      return { ok: false, error };
    }
  }

  @Role("any")
  @Query(() => LinkPageListResult)
  async linkPagelist(
    @Args("input") dto: LinkPageListInput
  ): Promise<LinkPageListResult> {
    const { pageIndex, pageSize, search, sortBy, sortOrder } = dto;
    const orderBy = RefineSortParam(sortBy ?? "title", sortOrder);
    const queryBuilder = () => {
      const builder = this.linkRepo
        .createQueryBuilder("Link")
        .select("Link.id", "id")
        .where({ domainId: dto.domainId });
      if (search) {
        builder.andWhere(
          new Brackets((qb) => {
            qb.where("url ILIKE :search OR title ILIKE :search", {
              search: `%${search}%`,
            });
          })
        );
      }
      return builder;
    };
    try {
      const totalBuilder = queryBuilder();
      const total = await totalBuilder.getCount();
      const resultBuilder = queryBuilder();
      const result = await resultBuilder
        .addSelect("Link.domain_id", "domainId")
        .addSelect("Link.url", "url")
        .addSelect("Link.title", "title")
        .addSelect("Link.scraped", "scraped")
        .addSelect("Link.broken", "broken")
        .limit(pageSize)
        .offset((pageIndex - 1) * pageSize)
        .orderBy(orderBy)
        .getRawMany();
      return { ok: true, result, total };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  @ResolveField()
  async domain(@Parent() link: Link) {
    return this.domainRepo.findOne({ id: link.domainId });
  }
}
