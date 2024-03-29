import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { OrmModule } from "@web-scraping/orm";
import { AuthConfigModule } from "./config/config.module";
import { GqlAuthGuard } from "./guards/gql-auth.guard";
import { JwtModule } from "./jwt/jwt.module";

@Module({
  imports: [AuthConfigModule, OrmModule, OrmModule.Register(), JwtModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
  exports: [JwtModule],
})
export class AuthModule {}
