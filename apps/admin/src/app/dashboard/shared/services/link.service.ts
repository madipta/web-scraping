import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseResponse, IdNumber, LinkListResult } from "@web-scraping/dto";

@Injectable({
  providedIn: "root",
})
export class LinkService {
  private apiUrl = "http://localhost:3333/api/";
  private linkGetUrl = this.apiUrl + "link";
  private linkListUrl = this.apiUrl + "link/list";
  private linkDeleteUrl = this.apiUrl + "link/delete";
  private linkScrapUrl = this.apiUrl + "scraping/content";
  private linkScrapAllUrl = this.apiUrl + "scraping/all-content";

  constructor(private http: HttpClient) {}

  fetchList(
    domainId: number,
    pageIndex: number,
    pageSize: number,
    sortField: string,
    sortOrder: string,
    search: string | null
  ): Observable<LinkListResult> {
    sortField = sortField ?? "title";
    sortOrder = sortOrder ?? "asc";
    const params = new HttpParams()
      .append("domainId", `${domainId}`)
      .append("pageIndex", `${pageIndex}`)
      .append("pageSize", `${pageSize}`)
      .append("sortBy", `${sortField}`)
      .append("sortOrder", `${sortOrder}`)
      .append("search", search);
    return this.http.get<LinkListResult>(`${this.linkListUrl}`, { params });
  }

  async get(dto: IdNumber) {
    return this.http
      .get(this.linkGetUrl, { params: { id: `${dto.id}` } })
      .toPromise();
  }

  async scrapContent(linkId: number) {
    return await this.http
      .post<BaseResponse>(this.linkScrapUrl, { linkId })
      .toPromise();
  }

  async delete(id: number) {
    return await this.http
      .post<BaseResponse>(this.linkDeleteUrl, { id: `${id}` })
      .toPromise();
  }

  async scrapAllContent(domainId: number) {
    return await this.http
      .post(this.linkScrapAllUrl, { domainId: `${domainId}` })
      .toPromise();
  }
}
