import { Injectable } from "@angular/core";
import {
  DomainSettingUpdateInput,
  DomainSettingWithRef,
  IdNumber,
} from "@web-scraping/dto";
import { Apollo } from "apollo-angular";
import { map, take } from "rxjs/operators";
import {
  GET_DOMAIN_SETTING_QUERY,
  UPDATE_DOMAIN_SETTING_QUERY,
} from "../gql/domain-setting";

@Injectable({
  providedIn: "root",
})
export class DomainSettingService {
  constructor(private apollo: Apollo) {}

  async get(dto: IdNumber) {
    return this.apollo
      .query<DomainSettingWithRef>({
        query: GET_DOMAIN_SETTING_QUERY,
        variables: { id: dto.id },
        fetchPolicy: "no-cache",
      })
      .pipe(
        take(1),
        map((obj) => obj.data["getDomainSettingById"])
      )
      .toPromise();
  }

  async update(dto: DomainSettingUpdateInput) {
    return this.apollo
      .mutate({
        mutation: UPDATE_DOMAIN_SETTING_QUERY,
        variables: { ...dto },
      })
      .pipe(
        take(1),
        map((obj) => obj.data["updateDomainSetting"])
      )
      .toPromise();
  }
}
