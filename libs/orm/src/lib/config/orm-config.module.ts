import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

const env = process.env;

const config = () => ({
  host: env.DB_MAIN_HOST,
  port: +env.DB_MAIN_PORT,
  user: env.DB_MAIN_USER,
  password: env.DB_MAIN_PASSWORD,
  database: env.DB_MAIN_DATABASE,
  synchronize: env.DB_MAIN_SYNCHRONIZE.toLowerCase() === "true",
});

const schema = Joi.object({
  DB_MAIN_HOST: Joi.string().default("127.0.0.1"),
  DB_MAIN_PORT: Joi.number().default(5432),
  DB_MAIN_USER: Joi.string(),
  DB_MAIN_PASSWORD: Joi.string(),
  DB_MAIN_DATABASE: Joi.string(),
  DB_MAIN_SYNCHRONIZE: Joi.string().default("false"),
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
export class OrmConfigModule {}
