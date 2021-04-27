import { Controller, Get, Query } from "@nestjs/common";
import { LinkDataAccess } from "@web-scraping/data-access";
import { LinkListResult, PageListQuery } from "@web-scraping/dto";

@Controller("link")
export class LinkController {
  constructor(private readonly linkService: LinkDataAccess) {}

  private refineSortOrderQueryParam(sortBy: string, sortOrder: string) {
    sortBy = sortBy ?? "title";
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
  async list(
    @Query() dto: { domainId: number } & PageListQuery
  ): Promise<LinkListResult> {
    const { pageIndex, pageSize, search, sortBy, sortOrder } = dto;
    const orderBy = this.refineSortOrderQueryParam(sortBy, sortOrder);
    const where = {
      domainId: +dto.domainId,
    };
    if (search) {
      where["OR"] = [
        { url: { contains: search } },
        { title: { contains: search } },
      ];
    }
    const total = await this.linkService.count({ where });
    const result = await this.linkService.findMany({
      pageIndex,
      pageSize,
      orderBy,
      where,
    });
    return { result, total };
  }

  @Get()
  getOne(@Query("id") id: number) {
    return this.linkService.findOne({
      id: +id,
    });
  }
}
