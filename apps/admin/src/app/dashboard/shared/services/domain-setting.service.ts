import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BaseResponse,
  DomainSettingUpdateInput,
  DomainSettingWithRef,
  IdNumber,
} from "@web-scraping/dto";

@Injectable({
  providedIn: "root",
})
export class DomainSettingService {
  private apiUrl = "http://localhost:3333/api/";
  private domainSettingGetUrl = this.apiUrl + "domain-setting";
  private domainSettingUpdateUrl = this.apiUrl + "domain-setting/update";

  constructor(private http: HttpClient) {}

  async get(dto: IdNumber) {
    return this.http
      .get<BaseResponse<DomainSettingWithRef>>(this.domainSettingGetUrl, {
        params: { id: `${dto.id}` },
      })
      .toPromise();
  }

  async update(body: DomainSettingUpdateInput) {
    return await this.http
      .post<BaseResponse<DomainSettingWithRef>>(this.domainSettingUpdateUrl, body)
      .toPromise();
  }
}
