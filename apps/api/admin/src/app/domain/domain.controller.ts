import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { DomainService } from "@web-scraping/data-access";
import {
  DomainCreateInput,
  DomainListQuery,
  DomainUpdateInput,
} from "@web-scraping/dto";

@Controller("domain")
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

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

  @Get("list")
  list(@Query() dto: DomainListQuery) {
    const take = 20;
    const { skip, search } = dto;
    const orderBy = {};
    orderBy[dto.sortBy] = dto.sortOrder;
    return this.domainService.findMany({
      skip,
      take,
      orderBy,
      where: {
        name: { contains: search },
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
