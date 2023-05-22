import { Injectable, signal } from "@angular/core";
import { EMPTY } from "rxjs";
import { catchError, filter, map, tap } from "rxjs/operators";
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

  jobCount = signal<JobCountType>({
    domain: 0,
    content: 0,
    created: 0,
    loadingError: 0,
    scrapingError: 0,
    success: 0,
  });

  constructor() {
    this.connection
      .pipe(
        filter((v) => v.data && v.event === "jobCount"),
        map<WsReturnType<JobCountType>, JobCountType>((v) => v.data),
        tap((v) => this.jobCount.set(v))
      )
      .subscribe();
  }

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

  close() {
    this.socket$.unsubscribe();
    this.socket$ = null;
  }
}
