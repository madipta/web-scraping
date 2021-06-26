import {
  Args,
  Field,
  InputType,
  IntersectionType,
  Mutation,
  ObjectType,
  OmitType,
  Parent,
  PartialType,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "@web-scraping/auth";
import { Domain, DomainSetting } from "@web-scraping/orm";
import { Repository } from "typeorm";
import { AutoNumberInput } from "../core/auto-number-input";
import { BaseResult } from "../core/base-result";

@InputType()
export class DomainSettingUpdateInput extends IntersectionType(
  AutoNumberInput,
  PartialType(OmitType(DomainSetting, ["createdAt", "updatedAt", "domain"]))
) {}

@ObjectType()
export class DomainSettingResult extends BaseResult {
  @Field(() => DomainSetting, { nullable: true })
  result?: DomainSetting;
}

@Resolver(() => DomainSetting)
export class DomainSettingResolver {
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepo: Repository<Domain>,
    @InjectRepository(DomainSetting)
    private readonly settingRepo: Repository<DomainSetting>
  ) {}

  @Role("admin")
  @Mutation(() => DomainSettingResult)
  async updateDomainSetting(
    @Args("input") dto: DomainSettingUpdateInput
  ): Promise<DomainSettingResult> {
    try {
      const result = await this.settingRepo.save(dto);
      return { ok: true, result };
    } catch (error) {
      return { ok: false, error };
    }
  }

  @Role("any")
  @Query(() => DomainSettingResult)
  async getDomainSettingById(
    @Args("input") dto: AutoNumberInput
  ): Promise<DomainSettingResult> {
    try {
      const result = await this.settingRepo.findOne(
        { id: dto.id },
        { relations: ["domain"] }
      );
      return { ok: true, result };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  @ResolveField()
  async domain(@Parent() setting: DomainSetting) {
    return this.domainRepo.findOne({ id: setting.id });
  }
}
