import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

const env = process.env;

const config = () => ({
  jwt_private_key: env.JWT_PRIVATE_KEY,
  jwt_header_key: env.JWT_HEADER_KEY,
  jwt_payload_id: env.JWT_PAYLOAD_ID,
});

const schema = Joi.object({
  JWT_PRIVATE_KEY: Joi.string().required(),
  JWT_HEADER_KEY: Joi.string().default("Authorization"),
  JWT_PAYLOAD_ID: Joi.string().default("userName"),
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
export class AuthConfigModule {}
