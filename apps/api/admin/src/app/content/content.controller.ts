import { Controller, Get, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import type {
  PageListQuery,
  PageListResponse,
  PromiseResponse,
} from "@web-scraping/dto";
import { Content } from "@web-scraping/orm";

@Controller("content")
export class ContentController {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>
  ) {}

  private refineSortOrderQueryParam(sortBy: string, sortOrder: string) {
    sortBy = sortBy ?? "Link.title";
    if (sortOrder && sortOrder.toLowerCase().startsWith("desc")) {
      sortOrder = "DESC";
    } else {
      sortOrder = "ASC";
    }
    const sort = {};
    sort[sortBy] = sortOrder;
    return sort;
  }

  @Get("list")
  async list(@Query() dto: PageListQuery): PageListResponse<Content[]> {
    const { pageIndex, pageSize, search, sortBy, sortOrder } = dto;
    const orderBy = this.refineSortOrderQueryParam(sortBy, sortOrder);
    const queryBuilder = () => {
      const builder = this.contentRepo
        .createQueryBuilder("Content")
        .select("Content.link_id", "linkId");
      if (search) {
        builder.where({ pageText: ILike(`%${search}%`) });
      }
      return builder;
    };
    try {
      const totalBuilder = queryBuilder();
      const total = await totalBuilder.getCount();
      const resultBuilder = queryBuilder();
      resultBuilder
        .leftJoin("Content.link", "Link")
        .addSelect("Link.url", "linkUrl")
        .addSelect("Link.title", "linkTitle")
        .orderBy(orderBy)
        .offset((pageIndex - 1) * pageSize)
        .limit(pageSize);
      const result = await resultBuilder.getRawMany();
      return { ok: true, result, total };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  @Get()
  async getOne(@Query("linkId") linkId: number): PromiseResponse<Content> {
    try {
      const result = await this.contentRepo
        .createQueryBuilder("Content")
        .leftJoin("Content.link", "Link")
        .leftJoin("Link.domain", "Domain")
        .where({ linkId })
        .select("link_id", "linkId")
        .addSelect("page_text", "pageText")
        .addSelect("Link.url", "linkUrl")
        .addSelect("Link.title", "linkTitle")
        .addSelect("Domain.home", "domainHome")
        .getRawOne();
      return { ok: true, result };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }
}
