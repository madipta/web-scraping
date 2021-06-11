import { Module } from "@nestjs/common";
import { OrmModule } from "@web-scraping/orm";
import { JwtModule } from "./jwt/jwt.module";
import { AuthConfigModule } from "./config/config.module";

@Module({
  providers: [],
  exports: [],
  imports: [OrmModule, OrmModule.Register(), JwtModule, AuthConfigModule],
})
export class AuthModule {}
