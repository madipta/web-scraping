import { Inject, Injectable } from "@nestjs/common";
import { RedisClient } from "redis";
import { PUBSUB_EVENTS } from "../pub-sub.constants";

@Injectable()
export class ScrapeJobFinishService {
  constructor(
    @Inject("REDIS_PUB")
    private readonly redisPubsub: RedisClient
  ) {}

  async scrapeIndexJobFinished() {
    return this.redisPubsub.emit(PUBSUB_EVENTS.JOB, {
      event: "scrapeIndexJobFinished",
      data: { finishedAt: Date.now() },
    });
  }

  async scrapeContentJobFinished() {
    return this.redisPubsub.emit(PUBSUB_EVENTS.JOB, {
      event: "scrapeContentJobFinished",
      data: { finishedAt: Date.now() },
    });
  }

  async scrapeDomainContentJobFinished() {
    return this.redisPubsub.emit(PUBSUB_EVENTS.JOB, {
      event: "scrapeDomainContentJobFinished",
      data: { finishedAt: Date.now() },
    });
  }
}
