import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  search(searchText: string): { message: string } {
    return { message: searchText };
  }
}
