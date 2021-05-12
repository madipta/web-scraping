import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  BaseResponse,
  Domain,
  DomainListResult,
  DomainUpdateInput,
  IdNumber,
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
  private domainScrapUrl = this.apiUrl + "scraping/index";

  constructor(private http: HttpClient) {}

  fetchList(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    search: string | null
  ): Observable<DomainListResult> {
    sortField = sortField ?? "home";
    sortOrder = sortOrder ?? "asc";
    const params = new HttpParams()
      .append("pageIndex", `${pageIndex}`)
      .append("pageSize", `${pageSize}`)
      .append("sortBy", `${sortField}`)
      .append("sortOrder", `${sortOrder}`)
      .append("search", search);

    return this.http.get<DomainListResult>(`${this.domainListUrl}`, { params });
  }

  async get(dto: IdNumber) {
    return this.http
      .get<BaseResponse<Domain>>(this.domainGetUrl, {
        params: { id: `${dto.id}` },
      })
      .toPromise();
  }

  async createOrUpdate(body: DomainUpdateInput) {
    const url = body.id ? this.domainUpdateUrl : this.domainCreateUrl;
    return await this.http.post<BaseResponse<Domain>>(url, body).toPromise();
  }

  async delete(body: IdNumber) {
    return this.http
      .post<BaseResponse>(this.domainDeleteUrl, body)
      .toPromise();
  }

  async scrapIndex(domainId: string) {
    return await this.http
      .post<BaseResponse>(this.domainScrapUrl, { domainId })
      .toPromise();
  }
}
