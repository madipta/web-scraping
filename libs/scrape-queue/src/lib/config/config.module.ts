import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

const env = process.env;

const config = () => ({
  redis_queue_host: env.REDIS_QUEUE_HOST,
  redis_queue_port: +env.REDIS_QUEUE_PORT,
});

const schema = Joi.object({
  REDIS_QUEUE_HOST: Joi.string().default("127.0.0.1"),
  REDIS_QUEUE_PORT: Joi.number().default(6379),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema: schema,
    }),
  ],
})
export class ScrapeQueueConfigModule {}
