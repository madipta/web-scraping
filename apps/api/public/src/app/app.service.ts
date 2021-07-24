import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Content } from "@web-scraping/orm";
import { Repository } from "typeorm";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>
  ) {}

  async search(searchText: string) {
    const builder = this.contentRepo
      .createQueryBuilder("C")
      .select("C.id", "id")
      .addSelect("C.title", "title")
      .addSelect("C.image_html", "image_html")
      .leftJoin("C.link", "L")
      .addSelect("L.url", "url")
      .leftJoin("L.domain", "D")
      .addSelect("D.home", "homeUrl");

    const tsWhere = "search_vector @@ to_tsquery('simple', :search)";
    builder.where(tsWhere, { search: `${searchText}:*` });
    builder.orderBy(
      `ts_rank(search_vector, to_tsquery('simple', :search))`,
      "DESC"
    );
    builder.offset(0);
    builder.limit(20);

    return builder.getRawMany();
  }
}
