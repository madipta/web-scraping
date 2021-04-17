import { Controller, Get, Query } from "@nestjs/common";
import { ContentService } from "@web-scraping/data-access";
import { ContentListQuery } from "@web-scraping/dto";

@Controller("content")
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

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
  getOne(@Query("id") linkId: number) {
    return this.contentService.findOne({
      linkId: +linkId,
    });
  }
}
