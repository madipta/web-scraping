import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GqlModule } from "@web-scraping/gql";
import { PubSubWsModule } from './pub-sub-ws/pub-sub-ws.module';

@Module({
  imports: [GqlModule, PubSubWsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
