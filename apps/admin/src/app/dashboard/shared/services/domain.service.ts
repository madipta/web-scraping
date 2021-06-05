import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map, take } from "rxjs/operators";
import {
  CREATE_DOMAIN_MUTATION,
  DELETE_DOMAIN_MUTATION,
  DOMAIN_PAGE_LIST_QUERY,
  GET_DOMAIN_COUNT_QUERY,
  GET_DOMAIN_QUERY,
  UPDATE_DOMAIN_MUTATION,
} from "../gql/domain";
import {
  GqlCreateDomainInput,
  GqlCreateDomainResult,
  GqlDeleteDomainResult,
  GqlDomainPageList,
  GqlGetDomain,
  GqlUpdateDomainInput,
  GqlUpdateDomainResult,
} from "../gql/dto/domain.dto";

@Injectable({
  providedIn: "root",
})
export class DomainService {
  constructor(private apollo: Apollo) {}

  async fetchList(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    search: string | null
  ): Promise<GqlDomainPageList> {
    return this.apollo
      .query({
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

  async get(dto: { id: number }): Promise<GqlGetDomain> {
    return this.apollo
      .query({
        query: GET_DOMAIN_QUERY,
        variables: { ...dto },
        fetchPolicy: "no-cache",
      })
      .pipe(
        take(1),
        map((obj) => obj.data["getDomainById"])
      )
      .toPromise();
  }

  async getCount(): Promise<number> {
    return this.apollo
      .query({
        query: GET_DOMAIN_COUNT_QUERY,
        fetchPolicy: "no-cache",
      })
      .pipe(
        take(1),
        map((obj) => obj.data["getDomainCount"])
      )
      .toPromise();
  }

  async create(dto: GqlCreateDomainInput): Promise<GqlCreateDomainResult> {
    return this.apollo
      .mutate({
        mutation: CREATE_DOMAIN_MUTATION,
        variables: { ...dto },
      })
      .pipe(
        take(1),
        map((obj) => obj.data["createDomain"])
      )
      .toPromise();
  }

  async update(dto: GqlUpdateDomainInput): Promise<GqlUpdateDomainResult> {
    return this.apollo
      .mutate({
        mutation: UPDATE_DOMAIN_MUTATION,
        variables: { ...dto },
      })
      .pipe(
        take(1),
        map((obj) => obj.data["updateDomain"])
      )
      .toPromise();
  }

  async createOrUpdate(body: GqlUpdateDomainInput) {
    if (body.id) {
      return this.update(body);
    }
    return this.create(body);
  }

  async delete(dto: { id: number }): Promise<GqlDeleteDomainResult> {
    return this.apollo
      .mutate({
        mutation: DELETE_DOMAIN_MUTATION,
        variables: { ...dto },
      })
      .pipe(
        take(1),
        map((obj) => obj.data["deleteDomain"])
      )
      .toPromise();
  }
}
