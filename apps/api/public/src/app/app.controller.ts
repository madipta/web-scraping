import { Controller, Get, Query } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("search")
  search(@Query("q") searchText: string) {
    return this.appService.search(searchText);
  }
}
