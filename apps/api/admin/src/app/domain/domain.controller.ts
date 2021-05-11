import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import type {
  DomainCreateInput,
  DomainUpdateInput,
  IdNumber,
  PageListQuery,
  PageListResponse,
  PromiseResponse,
} from "@web-scraping/dto";
import { Domain } from "@web-scraping/orm";

@Controller("domain")
export class DomainController {
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepo: Repository<Domain>
  ) {}

  @Post("create")
  async create(@Body() dto: DomainCreateInput): PromiseResponse<Domain> {
    try {
      let { home } = dto;
      home = home.toLowerCase();
      const data = { ...dto, home };
      const result = await this.domainRepo.save(data);
      return { ok: true, result };
    } catch (error) {
      return { ok: false, error };
    }
  }

  @Post("update")
  async update(@Body() dto: DomainUpdateInput): PromiseResponse {
    let { home } = dto;
    if (home) {
      home = home.toLowerCase();
      dto.home = home;
      if (home.substr(home.length - 1) !== "/") {
        home = home + "/";
      }
    }
    const { id, ...data } = dto;
    try {
      await this.domainRepo.update({ id }, { ...data });
      return { ok: true };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  @Post("delete")
  async delete(@Body() dto: IdNumber): PromiseResponse {
    try {
      const { id } = dto;
      await this.domainRepo.delete({ id });
      return { ok: true };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  private refineSortOrderQueryParam(sortBy: string, sortOrder: string) {
    sortBy = sortBy ?? "home";
    if (sortOrder && sortOrder.toLowerCase().startsWith("desc")) {
      sortOrder = "DESC";
    } else {
      sortOrder = "ASC";
    }
    const sort = {};
    sort[sortBy] = sortOrder;
    return sort;
  }

  @Get("list")
  async list(@Query() dto: PageListQuery): PageListResponse<Domain[]> {
    const { pageIndex, pageSize, search, sortBy, sortOrder } = dto;
    const orderBy = this.refineSortOrderQueryParam(sortBy, sortOrder);
    const where = {};
    if (search) {
      where["home"] = ILike(`%${search}%`);
    }
    try {
      const total = await this.domainRepo.count(where);
      const result = await this.domainRepo.find({
        take: pageSize,
        skip: (pageIndex - 1) * pageSize,
        order: orderBy,
        where,
      });
      return { ok: true, result, total };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  @Get()
  async getOne(@Query("id") id: number): PromiseResponse<Domain> {
    try {
      const result = await this.domainRepo.findOne({ id });
      return { ok: true, result };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }
}
