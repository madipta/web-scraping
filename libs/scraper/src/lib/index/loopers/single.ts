import { IndexManager } from "../index-manager";
import { ILooper } from "./looper.interface";

export class SingleLooper implements ILooper {
  manager: IndexManager = null;

  constructor(manager) {
    this.manager = manager;
  }

  async run() {
    const res = await this.manager.load(this.manager.setting.url);
    const links = await this.manager.scrap(res);
    this.manager.linkAddSubject.next(links);
    return false;
  }
}
