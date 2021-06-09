import { Inject, OnModuleInit } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets";
import { RedisClient } from "redis";
import { Server } from "ws";

@WebSocketGateway(8000)
export class PubSubWsGateway
  implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  clients = [];

  constructor(@Inject("REDIS_PUB") private readonly redisSub: RedisClient) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: unknown, ..._args: unknown[]) {
    this.clients.push(client);
  }

  handleDisconnect(client: unknown) {
    this.clients = this.clients.filter((c) => c !== client);
  }

  onModuleInit() {
    this.redisSub.on("ScrapeJobCount", (data) => {
      const res = { event: "jobCount", data };
      this.clients.forEach((clien) => {
        clien.send(JSON.stringify(res));
      });
    });
  }

  @SubscribeMessage("jobCount")
  handleJobCount(data): WsResponse<string> {
    return { event: "jobCount", data };
  }
}
