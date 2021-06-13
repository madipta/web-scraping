import { Module } from "@nestjs/common";
import { AuthModule } from "@web-scraping/auth";
import { GqlModule } from "@web-scraping/gql";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PubSubWsModule } from "./pub-sub-ws/pub-sub-ws.module";

@Module({
  imports: [AuthModule, GqlModule, PubSubWsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
