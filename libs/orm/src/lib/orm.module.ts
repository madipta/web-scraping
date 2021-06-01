import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
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
  providers: [],
})
export class OrmModule {}
