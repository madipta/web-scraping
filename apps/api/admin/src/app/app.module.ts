import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GqlModule } from "@web-scraping/gql";

@Module({
  imports: [GqlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
