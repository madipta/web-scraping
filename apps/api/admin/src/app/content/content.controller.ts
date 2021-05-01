import { Controller, Get, Query } from "@nestjs/common";
import { ContentService } from "@web-scraping/data-access";
import { ContentListResult, PageListQuery } from "@web-scraping/dto";

@Controller("content")
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

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
  async list(@Query() dto: PageListQuery): Promise<ContentListResult> {
    const { pageIndex, pageSize, search, sortBy, sortOrder } = dto;
    const orderBy = this.refineSortOrderQueryParam(sortBy, sortOrder);
    const where = {};
    if (search) {
      where["content"] = { contains: search };
    }
    const total = await this.contentService.count({ where });
    const result = await this.contentService.pageList({
      pageIndex,
      pageSize,
      orderBy,
      where,
    });
    return { result, total };
  }

  @Get()
  getOne(@Query("linkId") linkId: number) {
    return this.contentService.findOne({
      linkId: +linkId,
    });
  }
}
