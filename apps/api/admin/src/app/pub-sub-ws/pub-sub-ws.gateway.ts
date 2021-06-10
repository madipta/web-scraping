import { Inject, OnModuleInit } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { PUBSUB_EVENTS, PUBSUB_PROVIDER } from "@web-scraping/pubsub";
import { RedisClient } from "redis";
import { Server } from "ws";

@WebSocketGateway(8000)
export class PubSubWsGateway
  implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  clients = [];

  constructor(
    @Inject(PUBSUB_PROVIDER) private readonly redisSub: RedisClient
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: unknown, ..._args: unknown[]) {
    this.clients.push(client);
  }

  handleDisconnect(client: unknown) {
    this.clients = this.clients.filter((c) => c !== client);
  }

  onModuleInit() {
    this.redisSub.on(PUBSUB_EVENTS.JOB, (data) => {
      this.clients.forEach((clien) => {
        clien.send(JSON.stringify(data));
      });
    });
  }
}
