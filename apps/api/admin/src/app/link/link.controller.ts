import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, ILike, Repository } from "typeorm";
import type {
  IdNumber,
  PageListQuery,
  PageListResponse,
  PromiseResponse,
} from "@web-scraping/dto";
import { Link } from "@web-scraping/orm";

@Controller("link")
export class LinkController {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>
  ) {}

  private refineSortOrderQueryParam(sortBy: string, sortOrder: string) {
    sortBy = sortBy ?? "title";
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
  async list(
    @Query() dto: { domainId: number } & PageListQuery
  ): PageListResponse<Link[]> {
    const { pageIndex, pageSize, search, sortBy, sortOrder } = dto;
    const orderBy = this.refineSortOrderQueryParam(sortBy, sortOrder);
    const queryBuilder = () => {
      const builder = this.linkRepo
        .createQueryBuilder("Link")
        .select("Link.id", "id")
        .where({ domainId: dto.domainId });
      if (search) {
        builder.andWhere(
          new Brackets((qb) => {
            qb.where({ url: ILike(`%${search}%`) }).orWhere(
              new Brackets((qb) => {
                qb.where({ title: ILike(`%${search}%`) });
              })
            );
          })
        );
      }
      return builder;
    };
    try {
      const totalBuilder = queryBuilder();
      const total = await totalBuilder.getCount();
      const resultBuilder = queryBuilder();
      const result = await resultBuilder
        .addSelect("Link.url", "url")
        .addSelect("Link.title", "title")
        .addSelect("Link.scraped", "scraped")
        .addSelect("Link.broken", "broken")
        .limit(pageSize)
        .offset((pageIndex - 1) * pageSize)
        .orderBy(orderBy)
        .getRawMany();
      return { ok: true, result, total };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  @Get()
  async getOne(@Query("id") id: number): PromiseResponse<Link> {
    try {
      const result = await this.linkRepo.findOne({ id });
      return { ok: true, result };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  @Post("delete")
  async delete(@Body() dto: IdNumber): PromiseResponse {
    try {
      const { id } = dto;
      await this.linkRepo.delete({ id });
      return { ok: true };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }
}
