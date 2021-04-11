import { Module } from "@nestjs/common";
import { DataAccessModule } from "@web-scraping/data-access";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DomainController } from "./domain/domain.controller";
import { LinkController } from "./link/link.controller";
import { ContentController } from "./content/content.controller";

@Module({
  imports: [DataAccessModule],
  controllers: [
    AppController,
    DomainController,
    LinkController,
    ContentController,
  ],
  providers: [AppService],
})
export class AppModule {}
