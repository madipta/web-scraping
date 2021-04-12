import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { LinkService } from "@web-scraping/data-access";
import {
  LinkCreateInput,
  LinkListQuery,
  LinkUpdateInput,
} from "@web-scraping/dto";

@Controller("link")
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post("create")
  async create(@Body() dto: LinkCreateInput) {
    const { domainId, ...values } = dto;
    return this.linkService.create({
      ...values,
      domain: {
        connect: {
          id: +domainId,
        },
      },
    });
  }

  @Post("update")
  async update(@Body() dto: LinkUpdateInput) {
    const { id, ...data } = dto;
    return this.linkService.update({
      data,
      where: { id: +id },
    });
  }

  @Get("list")
  list(@Query() dto: LinkListQuery) {
    const take = 20;
    const { skip, search } = dto;
    const orderBy = {};
    orderBy[dto.sortBy] = dto.sortOrder;
    return this.linkService.findMany({
      skip,
      take,
      orderBy,
      where: {
        OR: [
          { url: { contains: search } },
          { title: { contains: search } },
          { description: { contains: search } },
        ],
      },
    });
  }

  @Get()
  getOne(@Query("id") id: number) {
    return this.linkService.findOne({
      id: +id,
    });
  }
}
