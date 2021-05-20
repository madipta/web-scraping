import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  ContentListResult,
  IdNumber,
  PromiseResponse,
} from "@web-scraping/dto";

@Injectable({
  providedIn: "root",
})
export class ContentService {
  private apiUrl = "http://localhost:3333/api/";
  private contentGetUrl = this.apiUrl + "content";
  private contentListUrl = this.apiUrl + "content/list";

  constructor(private http: HttpClient) {}

  fetchList(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    search: string | null
  ): Observable<ContentListResult> {
    sortField = sortField ?? "Link.title";
    sortOrder = sortOrder ?? "asc";
    const params = new HttpParams()
      .append("pageIndex", `${pageIndex}`)
      .append("pageSize", `${pageSize}`)
      .append("sortBy", `${sortField}`)
      .append("sortOrder", `${sortOrder}`)
      .append("search", search);
    return this.http.get<ContentListResult>(`${this.contentListUrl}`, {
      params,
    });
  }

  async get(dto: IdNumber) {
    return this.http
      .get<PromiseResponse>(this.contentGetUrl, {
        params: { id: `${dto.id}` },
      })
      .toPromise();
  }
}
