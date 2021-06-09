import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

const env = process.env;

const config = () => ({
  gql_playground: env.GQL_PLAYGROUND.toLowerCase() === "true",
  gql_subcription: env.GQL_SUBCRIPTION.toLowerCase() === "true",
});

const schema = Joi.object({
  GQL_PLAYGROUND: Joi.string().default("false"),
  GQL_SUBCRIPTION: Joi.string().default("true"),
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
export class GqlConfigModule {}
