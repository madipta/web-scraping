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
import { Role } from "@web-scraping/auth";
import { Content, Domain, RefineSortParam } from "@web-scraping/orm";
import { Repository } from "typeorm";
import { AutoNumberInput } from "../core/auto-number-input";
import { BaseResult } from "../core/base-result";
import { PageListInput } from "../core/page-list-input";
import { PageListResult } from "../core/page-list-result";

@ObjectType()
export class ContentWithRef extends Content {
  @Field(() => String, { nullable: true })
  linkUrl?: string;
  @Field(() => String, { nullable: true })
  linkTitle?: string;
  @Field(() => String, { nullable: true })
  domainHome?: string;
}

@ObjectType()
export class ContentResult extends BaseResult {
  @Field(() => ContentWithRef, { nullable: true })
  result?: ContentWithRef;
}

@ObjectType()
export class ContentPageListResult extends PageListResult {
  @Field(() => [ContentWithRef], { nullable: true })
  result?: ContentWithRef[];
}

@Resolver(() => Content)
export class ContentResolver {
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepo: Repository<Domain>,
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>
  ) {}

  @Role("any")
  @Query(() => ContentResult)
  async getContentById(
    @Args("input") dto: AutoNumberInput
  ): Promise<ContentResult> {
    try {
      const result = await this.contentRepo
        .createQueryBuilder("Content")
        .leftJoin("Content.link", "Link")
        .leftJoin("Link.domain", "Domain")
        .where({ id: dto.id })
        .select("Content.id", "id")
        .addSelect("text")
        .addSelect("Link.url", "linkUrl")
        .addSelect("Link.title", "linkTitle")
        .addSelect("Domain.home", "domainHome")
        .getRawOne();
      return { ok: true, result };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  @Role("any")
  @Query(() => ContentPageListResult)
  async contentPagelist(
    @Args("input") dto: PageListInput
  ): Promise<ContentPageListResult> {
    const { pageIndex, pageSize, search, sortBy, sortOrder } = dto;
    const orderBy = RefineSortParam(sortBy ?? "Link.title", sortOrder);
    const queryBuilder = () => {
      const builder = this.contentRepo
        .createQueryBuilder("Content")
        .select("Content.id", "id");
      if (search) {
        builder.where("search_vector @@ to_tsquery('simple', :search)", { search: `${search}:*` });
      }
      return builder;
    };
    try {
      const totalBuilder = queryBuilder();
      const total = await totalBuilder.getCount();
      const resultBuilder = queryBuilder();
      resultBuilder
        .leftJoin("Content.link", "Link")
        .addSelect("Link.url", "linkUrl")
        .addSelect("Link.title", "linkTitle")
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
  async getContentCount(): Promise<number> {
    return this.contentRepo.count({ select: ["id"] });
  }

  @ResolveField()
  async link(@Parent() content: Content) {
    return this.domainRepo.findOne({ id: content.domainId });
  }

  @ResolveField()
  async domain(@Parent() content: Content) {
    return this.domainRepo.findOne({ id: content.domainId });
  }
}
