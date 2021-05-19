import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrmModule } from "@web-scraping/orm";

@Module({
  imports: [OrmModule, TypeOrmModule.forFeature([])],
  providers: [],
})
export class GqlModule {}
