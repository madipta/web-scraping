import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { Domain } from "@prisma/client";
import { DomainService } from "@web-scraping/data-access";
import {
  DomainCreateInput,
  LinkListResult,
  DomainUpdateInput,
  IdNumber,
  PageListQuery,
  PromiseResponse,
} from "@web-scraping/dto";

@Controller("domain")
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Get()
  async get(@Query() dto: IdNumber): PromiseResponse<Domain> {
    try {
      const id = +dto.id;
      const result = await this.domainService.get({ id });
      return { ok: true, result };
    } catch (error) {
      return { ok: false, error };
    }
  }

  @Post("create")
  async create(@Body() dto: DomainCreateInput): PromiseResponse<Domain> {
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
  async update(@Body() dto: DomainUpdateInput): PromiseResponse<Domain> {
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
  async delete(@Body() dto: IdNumber): PromiseResponse<Domain> {
    try {
      const result = await this.domainService.delete({ id: +dto.id });
      return { ok: true, result };
    } catch (error) {
      return { ok: false, error };
    }
  }

  private refineSortOrderQueryParam(sortBy: string, sortOrder: string) {
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
  async list(@Query() dto: PageListQuery): Promise<LinkListResult> {
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
    return { result, total };
  }

  @Get()
  getOne(@Query("id") id: number) {
    return this.domainService.get({
      id: +id,
    });
  }
}
