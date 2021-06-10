import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  Content,
  Domain,
  DomainSetting,
  Link,
  ScrapeJob,
  User,
} from "./entities";
import { OrmConfigModule } from "./config/orm-config.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [OrmConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("host"),
        port: configService.get("port"),
        username: configService.get("user"),
        password: configService.get("password"),
        database: configService.get("database"),
        synchronize: configService.get("synchronize"),
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class OrmModule {
  static Register() {
    return TypeOrmModule.forFeature([
      Content,
      Domain,
      DomainSetting,
      Link,
      ScrapeJob,
      User,
    ]);
  }
}
