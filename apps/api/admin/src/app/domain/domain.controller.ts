import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { DomainService } from "@web-scraping/data-access";
import {
  DomainCreateInput,
  DomainListResult,
  DomainUpdateInput,
  IdNumber,
  PageListQuery,
} from "@web-scraping/dto";

@Controller("domain")
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Get()
  async get(@Query() dto: IdNumber) {
    try {
      const id = +dto.id;
      const result = await this.domainService.findOne({ id });
      return { ok: true, result };
    } catch (error) {
      return { ok: false, error };
    }
  }

  @Post("create")
  async create(@Body() dto: DomainCreateInput) {
    try {
      let { home } = dto;
      home = home.toLowerCase();
      if (home.substr(home.length - 1) !== "/") {
        home = home + "/";
      }
      const data = { ...dto, home };
      const result = await this.domainService.create(data);
      return { ok: true, result };
    } catch (error) {
      return { ok: false, error };
    }
  }

  @Post("update")
  async update(@Body() dto: DomainUpdateInput) {
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
      const result = await this.domainService.update({
        data,
        where: { id },
      });
      return { ok: true, result };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  @Post("delete")
  async delete(@Body() dto: IdNumber) {
    try {
      const result = await this.domainService.delete({ id: +dto.id });
      return { ok: true, result };
    } catch (error) {
      return { ok: false, error };
    }
  }

  refineSortOrderQueryParam(sortBy: string, sortOrder: string) {
    sortBy = sortBy ?? "home";
    if (sortOrder && sortOrder.toLowerCase().startsWith("desc")) {
      sortOrder = "desc";
    } else {
      sortOrder = "asc";
    }
    const sort = {};
    sort[sortBy] = sortOrder;
    return sort;
  }

  @Get("list")
  async list(@Query() dto: PageListQuery): Promise<DomainListResult> {
    const { pageIndex, pageSize, search, sortBy, sortOrder } = dto;
    const orderBy = this.refineSortOrderQueryParam(sortBy, sortOrder);
    const where = { home: { contains: search } };
    const total = await this.domainService.count({ where });
    const result = await this.domainService.pageList({
      pageIndex,
      pageSize,
      orderBy,
      where,
    });
    console.log(result)
    return { result, total };
  }

  @Get()
  getOne(@Query("id") id: number) {
    return this.domainService.findOne({
      id: +id,
    });
  }
}
