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

  async search(searchText: string, page = 1) {
    const pagesize = 20;
    const builder = this.contentRepo
      .createQueryBuilder("C")
      .select("C.id", "id")
      .addSelect("C.title", "title")
      .addSelect("C.image_html", "image_html")
      .leftJoin("C.link", "L")
      .addSelect("L.url", "url")
      .leftJoin("L.domain", "D")
      .addSelect("D.home", "homeUrl");

    builder.where("search_vector @@ to_tsquery('simple', :search)", {
      search: `${searchText}:*`,
    });
    builder.orderBy(
      `ts_rank(search_vector, to_tsquery('simple', :search))`,
      "DESC"
    );
    builder.offset(page * pagesize - pagesize);
    builder.limit(pagesize);

    return builder.getRawMany();
  }
}
