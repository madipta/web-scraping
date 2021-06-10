import { Inject, Injectable } from "@nestjs/common";
import { RedisClient } from "redis";

@Injectable()
export class ScrapeJobFinishService {
  readonly JOB_NAME = "PUBSUB_JOB";
  
  constructor(
    @Inject("REDIS_PUB")
    private readonly redisPubsub: RedisClient
  ) {}

  async scrapeIndexJobFinished() {
    return this.redisPubsub.emit(this.JOB_NAME);
  }

  async scrapeContentJobFinished() {
    return this.redisPubsub.emit(this.JOB_NAME);
  }

  async scrapeDomainContentJobFinished() {
    return this.redisPubsub.emit(this.JOB_NAME);
  }
}
