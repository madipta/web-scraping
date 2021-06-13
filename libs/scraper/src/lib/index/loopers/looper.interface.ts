import { IndexManagerService } from "../index-manager";

export interface ILooper {
  manager: IndexManagerService;
  run(): Promise<boolean>;
}
