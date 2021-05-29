import { IndexManager } from "../index-manager";

export interface ILooper {
  manager: IndexManager;
  run(): Promise<boolean>;
}
