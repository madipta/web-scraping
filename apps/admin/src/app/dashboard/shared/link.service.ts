import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NzTableFilter, LinkListResult, IdNumber } from "@web-scraping/dto";

@Injectable({
  providedIn: "root",
})
export class LinkService {
  private apiUrl = "http://localhost:3333/api/";
  private linkGetUrl = this.apiUrl + "link";
  private linkListUrl = this.apiUrl + "link/list";

  constructor(private http: HttpClient) {}

  fetchLinkList(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: NzTableFilter
  ): Observable<LinkListResult> {
    sortField = sortField ?? "title";
    sortOrder = sortOrder ?? "asc";
    const params = new HttpParams()
      .append("pageIndex", `${pageIndex}`)
      .append("pageSize", `${pageSize}`)
      .append("sortBy", `${sortField}`)
      .append("sortOrder", `${sortOrder}`)
      .append("search", filters.length === 0 ? "" : filters[0].value[0]);
    return this.http.get<LinkListResult>(`${this.linkListUrl}`, { params });
  }

  async get(dto: IdNumber) {
    return this.http
      .get(this.linkGetUrl, { params: { id: `${dto.id}` } })
      .toPromise();
  }
}
