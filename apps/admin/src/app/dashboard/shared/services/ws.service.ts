import { Injectable } from "@angular/core";
import { EMPTY, Observable, of, Subject, Subscription } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

type WsReturnType = { event: string; data: unknown };

@Injectable({
  providedIn: "root",
})
export class WsService {
  private jobCount$ = new Subject();
  private jobCountSubscripion: Subscription;
  private socket$: WebSocketSubject<WsReturnType>;
  private endpoint = "ws://localhost:8000";

  private get connection() {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(this.endpoint);
    }
    return this.socket$.pipe(
      catchError((error) => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  get JobCount$() {
    if (!this.jobCountSubscripion || this.jobCountSubscripion.closed) {
      this.jobCountSubscripion = this.connection
        .pipe(
          tap((obs) => {
            if (obs.event === "jobCount") {
              this.jobCount$.next(obs);
            }
          })
        )
        .subscribe();
    }
    return this.jobCount$.asObservable();
  }

  close() {
    if (this.jobCountSubscripion) {
      this.jobCountSubscripion.unsubscribe();
    }
    this.socket$.complete();
  }
}
