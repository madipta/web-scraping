import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DomainUpdateInput } from "@web-scraping/dto";

@Injectable({
  providedIn: "root",
})
export class DomainUpdateService {
  domainCreateUrl = "http://localhost:3333/api/domain/create";
  domainUpdateUrl = "http://localhost:3333/api/domain/update";

  constructor(private http: HttpClient) {}

  async createOrUpdate(body: DomainUpdateInput) {
    const url = body.id ? this.domainUpdateUrl : this.domainCreateUrl;
    console.log(await this.http.post(url, body).toPromise());
  }
}
