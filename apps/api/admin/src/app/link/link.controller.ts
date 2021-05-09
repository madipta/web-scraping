import { Controller, Get, Post, Query } from "@nestjs/common";
import { ContentDataAccess, LinkDataAccess } from "@web-scraping/data-access";
import { IdNumber, LinkListResult, PageListQuery } from "@web-scraping/dto";

@Controller("link")
export class LinkController {
  constructor(
    private readonly linkDb: LinkDataAccess,
    private readonly contentDb: ContentDataAccess
  ) {}

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
        { url: { contains: search, mode: "insensitive" } },
        { title: { contains: search, mode: "insensitive" } },
      ];
    }
    const total = await this.linkDb.count({ where });
    const result = await this.linkDb.pageList({
      pageIndex,
      pageSize,
      orderBy,
      where,
    });
    return { result, total };
  }

  @Get()
  getOne(@Query("id") id: number) {
    return this.linkDb.findOne({
      id: +id,
    });
  }

  @Post("delete")
  async delete(dto: IdNumber) {
    try {
      await this.contentDb.remove({ linkId: +dto.id });
      const result = await this.linkDb.remove(dto);
      if (result) {
        return { ok: true, result };
      }
    } catch (error) {
      return { ok: false, error };
    }
  }
}
