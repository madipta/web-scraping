import { Module } from "@nestjs/common";
import { OrmModule } from "@web-scraping/orm";
import { AuthConfigModule } from "./config/config.module";
import { JwtModule } from "./jwt/jwt.module";

@Module({
  exports: [JwtModule],
  imports: [AuthConfigModule, OrmModule, OrmModule.Register(), JwtModule],
})
export class AuthModule {}
