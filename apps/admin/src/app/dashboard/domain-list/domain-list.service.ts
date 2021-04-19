import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DomainListResult } from "@web-scraping/dto";

@Injectable({
  providedIn: "root",
})
export class DomainListService {
  domainListUrl = "http://localhost:3333/api/domain/list";

  constructor(private http: HttpClient) {}

  fetchDomainList(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>
  ): Observable<DomainListResult> {
    sortField = sortField ?? "home";
    sortOrder = sortOrder ?? "asc";
    const params = new HttpParams()
      .append("skip", `0`)
      .append("sortBy", `${sortField}`)
      .append("sortOrder", `${sortOrder}`)
      .append("search", filters.length === 0 ? "" : filters[0].value[0]);
    return this.http.get<DomainListResult>(
      `${this.domainListUrl}`,
      { params }
    );
  }
}
