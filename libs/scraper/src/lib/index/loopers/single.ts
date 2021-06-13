import { IndexManagerService } from "../index-manager";
import { ILooper } from "./looper.interface";

export class SingleLooper implements ILooper {
  constructor(public manager: IndexManagerService) {}

  async run() {
    const res = await this.manager.load(this.manager.setting.url);
    const links = await this.manager.scrap(res);
    this.manager.addLinks(links);
    return false;
  }
}
