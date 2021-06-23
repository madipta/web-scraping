import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { catchError, filter, map } from "rxjs/operators";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

export type WsReturnType<T = unknown> = { event: string; data: T };
export type JobCountType = {
  domain: number;
  content: number;
  created: number;
  loadingError: number;
  scrapingError: number;
  success: number;
};

@Injectable({
  providedIn: "root",
})
export class WsService {
  private socket$: WebSocketSubject<WsReturnType>;
  private endpoint = "ws://localhost:8000";

  get connection() {
    if (
      !this.socket$ ||
      this.socket$.closed ||
      this.socket$.isStopped ||
      this.socket$.hasError
    ) {
      this.socket$ = webSocket(this.endpoint);
    }
    return this.socket$.pipe(
      catchError((error) => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  get jobCount$() {
    return this.connection.pipe(
      filter((v) => v.data && v.event === "jobCount"),
      map<WsReturnType<JobCountType>, JobCountType>((v) => v.data)
    );
  }

  close() {
    this.socket$.unsubscribe();
    this.socket$ = null;
  }
}
