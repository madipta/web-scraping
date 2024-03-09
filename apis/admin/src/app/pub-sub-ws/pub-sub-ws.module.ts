import { Module } from "@nestjs/common";
import { PubSubModule } from "@web-scraping/pubsub";
import { PubSubWsGateway } from "./pub-sub-ws.gateway";

@Module({
  imports: [PubSubModule],
  providers: [PubSubWsGateway],
})
export class PubSubWsModule {}
