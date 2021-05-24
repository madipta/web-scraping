import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BaseResponse,
  DomainListResult,
  DomainUpdateInput,
  IdNumber,
} from "@web-scraping/dto";
import { Apollo } from "apollo-angular";
import { map, take } from "rxjs/operators";
import {
  CREATE_DOMAIN_QUERY,
  DELETE_DOMAIN_QUERY,
  DOMAIN_PAGE_LIST_QUERY,
  GET_DOMAIN_QUERY,
  UPDATE_DOMAIN_QUERY,
} from "../gql/domain";

@Injectable({
  providedIn: "root",
})
export class DomainService {
  private apiUrl = "http://localhost:3333/api/";
  private domainScrapUrl = this.apiUrl + "scraping/index";

  constructor(private http: HttpClient, private apollo: Apollo) {}

  async fetchList(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    search: string | null
  ) {
    return this.apollo
      .query<DomainListResult>({
        query: DOMAIN_PAGE_LIST_QUERY,
        variables: { pageIndex, pageSize, sortField, sortOrder, search },
        fetchPolicy: "no-cache",
      })
      .pipe(
        take(1),
        map((obj) => obj.data["domainPagelist"])
      )
      .toPromise();
  }

  async get(dto: IdNumber) {
    return this.apollo
      .query<DomainListResult>({
        query: GET_DOMAIN_QUERY,
        variables: { id: dto.id },
        fetchPolicy: "no-cache",
      })
      .pipe(
        take(1),
        map((obj) => obj.data["getDomainById"])
      )
      .toPromise();
  }

  async create(dto: DomainUpdateInput) {
    return this.apollo
      .mutate({
        mutation: CREATE_DOMAIN_QUERY,
        variables: { ...dto },
      })
      .pipe(
        take(1),
        map((obj) => obj.data["createDomain"])
      )
      .toPromise();
  }

  async update(dto: DomainUpdateInput) {
    return this.apollo
      .mutate({
        mutation: UPDATE_DOMAIN_QUERY,
        variables: { ...dto },
      })
      .pipe(
        take(1),
        map((obj) => obj.data["updateDomain"])
      )
      .toPromise();
  }

  async createOrUpdate(body: DomainUpdateInput) {
    if (body.id) {
      return this.update(body);
    }
    return this.create(body);
  }

  async delete(dto: IdNumber) {
    return this.apollo
      .mutate({
        mutation: DELETE_DOMAIN_QUERY,
        variables: { ...dto },
      })
      .pipe(
        take(1),
        map((obj) => obj.data["deleteDomain"])
      )
      .toPromise();
  }

  async scrapIndex(domainId: string) {
    return this.http
      .post<BaseResponse>(this.domainScrapUrl, { domainId })
      .toPromise();
  }
}
