import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  DomainListResult,
  DomainUpdateInput,
  NzTableFilter,
} from "@web-scraping/dto";

@Injectable({
  providedIn: "root",
})
export class DomainService {
  private apiUrl = "http://localhost:3333/api/";
  private domainGetUrl = this.apiUrl + "domain";
  private domainListUrl = this.apiUrl + "domain/list";
  private domainCreateUrl = this.apiUrl + "domain/create";
  private domainUpdateUrl = this.apiUrl + "domain/update";
  private domainDeleteUrl = this.apiUrl + "domain/delete";

  constructor(private http: HttpClient) {}

  fetchDomainList(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: NzTableFilter
  ): Observable<DomainListResult> {
    sortField = sortField ?? "home";
    sortOrder = sortOrder ?? "asc";
    const skip = pageIndex * pageSize - pageSize;
    const params = new HttpParams()
      .append("skip", `${skip}`)
      .append("sortBy", `${sortField}`)
      .append("sortOrder", `${sortOrder}`)
      .append("search", filters.length === 0 ? "" : filters[0].value[0]);
    return this.http.get<DomainListResult>(`${this.domainListUrl}`, { params });
  }

  async get(dto: { id: number }) {
    return this.http
      .get(this.domainGetUrl, { params: { id: `${dto.id}` } })
      .toPromise();
  }

  async createOrUpdate(body: DomainUpdateInput) {
    const url = body.id ? this.domainUpdateUrl : this.domainCreateUrl;
    return this.http.post(url, body).toPromise();
  }

  async delete(body: DomainUpdateInput) {
    return this.http
      .post<{ ok: boolean }>(this.domainDeleteUrl, body)
      .toPromise();
  }
}
