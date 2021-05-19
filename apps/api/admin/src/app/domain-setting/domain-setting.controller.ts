import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type {
  DomainSettingUpdateInput,
  DomainSettingWithRef,
  PromiseResponse,
} from "@web-scraping/dto";
import { DomainSetting } from "@web-scraping/orm";
import { Repository } from "typeorm";

@Controller("domain-setting")
export class DomainSettingController {
  constructor(
    @InjectRepository(DomainSetting)
    private readonly settingRepo: Repository<DomainSetting>
  ) {}

  @Get()
  async getOne(@Query("id") id: number): PromiseResponse<DomainSettingWithRef> {
    try {
      const result = await this.settingRepo.findOne(
        { id },
        { relations: ["domain"] }
      );
      return { ok: true, result };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  @Post("update")
  async update(
    @Body() dto: DomainSettingUpdateInput
  ): PromiseResponse<DomainSetting> {
    try {
      const result = await this.settingRepo.save(dto);
      return { ok: true, result };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
