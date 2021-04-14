import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { DomainService, LinkService } from "@web-scraping/data-access";
import {
  DomainCreateInput,
  DomainLinksQuery,
  DomainListQuery,
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
        home: { contains: search },
      },
    });
  }

  @Get("links")
  links(@Query() dto: DomainLinksQuery) {
    const take = 20;
    const { skip, domainId } = dto;
    console.log(domainId)
    const orderBy = {};
    orderBy[dto.sortBy] = dto.sortOrder;
    return this.linkService.findMany({
      skip,
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
