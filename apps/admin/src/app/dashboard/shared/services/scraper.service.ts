import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, take } from 'rxjs/operators';
import { GqlScrapContentByDomainResult, GqlScrapContentResult } from '../gql/dto/scraper.dto';
import { SCRAP_CONTENT, SCRAP_CONTENT_BY_DOMAIN } from '../gql/scraper';

@Injectable({
  providedIn: 'root'
})
export class ScraperService {
  constructor(private apollo: Apollo) {}

  async scrapContent(id: number): Promise<GqlScrapContentResult> {
    return this.apollo
      .mutate({
        mutation: SCRAP_CONTENT,
        variables: { id },
      })
      .pipe(
        take(1),
        map((obj) => obj.data["scrapeContent"])
      )
      .toPromise();
  }

  async scrapeContentByDomain(id: number): Promise<GqlScrapContentByDomainResult> {
    return this.apollo
      .mutate({
        mutation: SCRAP_CONTENT_BY_DOMAIN,
        variables: { id },
      })
      .pipe(
        take(1),
        map((obj) => obj.data["scrapeContentByDomain"])
      )
      .toPromise();
  }
}
