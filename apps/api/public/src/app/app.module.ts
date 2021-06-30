import { Module } from "@nestjs/common";
import { OrmModule } from "@web-scraping/orm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [OrmModule, OrmModule.Register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
