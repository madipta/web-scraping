import { Module } from "@nestjs/common";
import { OrmModule } from "@web-scraping/orm";
import { JwtModule } from "./jwt/jwt.module";
import { AuthConfigModule } from "./config/config.module";
import { JwtService } from "./jwt/jwt.service";

@Module({
  providers: [JwtService],
  exports: [JwtService],
  imports: [OrmModule, OrmModule.Register(), JwtModule, AuthConfigModule],
})
export class AuthModule {}
