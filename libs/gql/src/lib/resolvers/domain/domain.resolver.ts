import {
  Args,
  Field,
  InputType,
  Int,
  IntersectionType,
  Mutation,
  ObjectType,
  OmitType,
  Parent,
  PartialType,
  PickType,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "@web-scraping/auth";
import {
  Content,
  Domain,
  DomainSetting,
  RefineSortParam,
} from "@web-scraping/orm";
import { Repository } from "typeorm";
import { AutoNumberInput } from "../core/auto-number-input";
import { BaseResult } from "../core/base-result";
import { PageListInput } from "../core/page-list-input";
import { PageListResult } from "../core/page-list-result";

@ObjectType()
export class DomainResult extends BaseResult {
  @Field(() => Domain, { nullable: true })
  result?: Domain;
}

@ObjectType()
export class DomainPageList extends Domain {
  @Field(() => Int, { nullable: true })
  linksCount?: number;
}

@ObjectType()
export class DomainPageListResult extends PageListResult {
  @Field(() => [DomainPageList], { nullable: true })
  result?: DomainPageList[];
}

@InputType()
export class DomainCreateInput extends IntersectionType(
  PickType(Domain, ["home"]),
  PartialType(
    OmitType(Domain, ["id", "createdAt", "updatedAt", "links", "setting"])
  )
) {}

@InputType()
export class DomainUpdateInput extends IntersectionType(
  AutoNumberInput,
  PartialType(DomainCreateInput)
) {}

@Resolver(() => Domain)
export class DomainResolver {
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepo: Repository<Domain>,
    @InjectRepository(DomainSetting)
    private readonly settingRepo: Repository<DomainSetting>,
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>
  ) {}

  @Role("admin")
  @Mutation(() => DomainResult)
  async createDomain(
    @Args("input") dto: DomainCreateInput
  ): Promise<DomainResult> {
    try {
      let { home } = dto;
      home = home.toLowerCase();
      const data = { ...dto, home };
      const result = await this.domainRepo.save(data);
      this.settingRepo.save({ id: result.id });
      return { ok: true, result };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "Create domain failed!" };
    }
  }

  @Role("admin")
  @Mutation(() => DomainResult)
  async updateDomain(
    @Args("input") dto: DomainUpdateInput
  ): Promise<DomainResult> {
    try {
      const { id, home } = dto;
      if (home) {
        dto.home = home.toLowerCase();
      }
      const result = await this.domainRepo.update({ id }, { ...dto });
      return { ok: result.affected === 1 };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "Create domain failed!" };
    }
  }

  @Role("admin")
  @Mutation(() => DomainResult)
  async deleteDomain(
    @Args("input") dto: AutoNumberInput
  ): Promise<DomainResult> {
    try {
      const { id } = dto;
      await this.settingRepo.delete({ id });
      const result = await this.domainRepo.delete({ id });
      if (result.affected !== 1) {
        throw "not found!";
      }
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "Delete domain failed!" };
    }
  }

  @Role("any")
  @Query(() => DomainResult)
  async getDomainById(
    @Args("input") dto: AutoNumberInput
  ): Promise<DomainResult> {
    try {
      const result = await this.domainRepo.findOne({ id: dto.id });
      return { ok: true, result };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "Get Domain failed!" };
    }
  }

  @Role("any")
  @Query(() => DomainPageListResult)
  async domainPagelist(
    @Args("input") dto: PageListInput
  ): Promise<DomainPageListResult> {
    const { pageIndex, pageSize, search, sortBy, sortOrder } = dto;
    const orderBy = RefineSortParam(sortBy ?? "home", sortOrder);
    const queryBuilder = () => {
      const builder = this.domainRepo
        .createQueryBuilder("Domain")
        .select("Domain.id", "id");
      if (search) {
        builder.where("home ILIKE :search", { search: `%${search}%` });
      }
      return builder;
    };
    try {
      const totalBuilder = queryBuilder();
      const total = await totalBuilder.getCount();
      const resultBuilder = queryBuilder();
      resultBuilder
        .leftJoin("Domain.links", "Link")
        .addSelect("Domain.home", "home")
        .addSelect("Domain.admin_email", "adminEmail")
        .addSelect("Domain.active", "active")
        .addSelect("COUNT(Link.id)", "linksCount")
        .groupBy("Domain.id")
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
  async getDomainCount(): Promise<number> {
    return this.domainRepo.count({ select: ["id"] });
  }

  @ResolveField()
  async setting(@Parent() domain: Domain) {
    return this.settingRepo.findOne({ id: domain.id });
  }

  @ResolveField()
  async contents(@Parent() domain: Domain) {
    return this.contentRepo.find({ domainId: domain.id });
  }
}
