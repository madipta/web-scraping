import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ContentService } from "@web-scraping/data-access";
import {
  ContentCreateInput,
  ContentListQuery,
  ContentUpdateInput,
} from "@web-scraping/dto";

@Controller("content")
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post("create")
  async create(@Body() dto: ContentCreateInput) {
    const { linkId, ...values } = dto;
    return this.contentService.create({
      ...values,
      link: {
        connect: {
          id: +linkId,
        },
      },
    });
  }

  @Post("update")
  async update(@Body() dto: ContentUpdateInput) {
    const { id, ...data } = dto;
    return this.contentService.update({
      data,
      where: { id: +id },
    });
  }

  @Get("list")
  list(@Query() dto: ContentListQuery) {
    const take = 20;
    const { skip, search } = dto;
    const orderBy = {};
    orderBy[dto.sortBy] = dto.sortOrder;
    return this.contentService.findMany({
      skip,
      take,
      orderBy,
      where: {
        content: { contains: search },
      },
    });
  }

  @Get()
  getOne(@Query("id") id: number) {
    return this.contentService.findOne({
      id: +id,
    });
  }
}
