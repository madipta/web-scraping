import { Inject, OnModuleInit } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets";
import { RedisClient } from "redis";
import { Server } from "ws";

@WebSocketGateway(8000)
export class PubSubWsGateway
  implements
    OnModuleInit,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  clients = [];

  constructor(@Inject("REDIS_PUB") private readonly redisSub: RedisClient) {}

  handleConnection(client: any, ...args: any[]) {
    console.log("handleConnection");
    this.clients.push(client);
  }

  afterInit(server: any) {
    console.log("afterInit");
  }

  handleDisconnect(client: any) {
    console.log("handleDisconnect");
    this.clients = this.clients.filter((c) => c !== client);
  }

  onModuleInit() {
    this.redisSub.on("ScrapeJobCount", (data) => {
      console.log("subcribe!!", data);
      const res = { event: "jobCount", data };
      this.clients.forEach((clien) => {
        clien.send(JSON.stringify(res));
      });
    });
  }

  @SubscribeMessage("jobCount")
  handleJobCount(data): WsResponse<string> {
    console.log("WS JOB");
    return { event: "jobCount", data };
  }
}
