import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { DomainService, LinkService } from "@web-scraping/data-access";
import {
  DomainCreateInput,
  DomainLinksQuery,
  DomainListQuery,
  DomainListResult,
  DomainUpdateInput,
} from "@web-scraping/dto";

@Controller("domain")
export class DomainController {
  constructor(
    private readonly domainService: DomainService,
    private readonly linkService: LinkService
  ) {}

  @Post("create")
  async create(@Body() dto: DomainCreateInput) {
    return this.domainService.create(dto);
  }

  @Post("update")
  async update(@Body() dto: DomainUpdateInput) {
    const { id, ...data } = dto;
    return this.domainService.update({
      data,
      where: { id },
    });
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
  async list(@Query() dto: DomainListQuery): Promise<DomainListResult> {
    const take = 20;
    const { skip, search, sortBy, sortOrder } = dto;
    const orderBy = this.refineSortOrderQueryParam(sortBy, sortOrder);
    const where = { home: { contains: search } };
    const rowCount = await this.domainService.count({ where });
    const pageCount = Math.floor(rowCount / take) + 1;
    const result = await this.domainService.findMany({
      skip: +skip,
      take,
      orderBy,
      where,
    });
    return { result, pageCount, rowCount };
  }

  @Get("links")
  links(@Query() dto: DomainLinksQuery) {
    const take = 20;
    const { skip, domainId } = dto;
    const orderBy = {};
    orderBy[dto.sortBy] = dto.sortOrder;
    return this.linkService.findMany({
      skip: +skip,
      take,
      orderBy,
      where: {
        domainId: +domainId,
      },
    });
  }

  @Get()
  getOne(@Query("id") id: number) {
    return this.domainService.findOne({
      id: +id,
    });
  }
}
