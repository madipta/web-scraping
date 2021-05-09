import { Controller, Get, Query } from "@nestjs/common";
import { ContentDataAccess } from "@web-scraping/data-access";
import { ContentListResult, PageListQuery } from "@web-scraping/dto";

@Controller("content")
export class ContentController {
  constructor(private readonly contentDb: ContentDataAccess) {}

  private refineSortOrderQueryParam(sortBy: string, sortOrder: string) {
    sortBy = sortBy ?? "content";
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
    const where = { NOT: { content: undefined } };
    if (search) {
      where["content"] = { contains: search, mode: "insensitive" };
    }
    const total = await this.contentDb.count({ where });
    const result = await this.contentDb.pageList({
      pageIndex,
      pageSize,
      orderBy,
      where,
    });
    return { result, total };
  }

  @Get()
  getOne(@Query("linkId") linkId: number) {
    return this.contentDb.get({
      linkId: +linkId,
    });
  }
}
