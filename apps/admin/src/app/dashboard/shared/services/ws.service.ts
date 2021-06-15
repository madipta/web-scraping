import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { catchError } from "rxjs/operators";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

export type WsReturnType = { event: string; data: unknown };

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

  close() {
    this.socket$.unsubscribe();
    this.socket$ = null;
  }
}
