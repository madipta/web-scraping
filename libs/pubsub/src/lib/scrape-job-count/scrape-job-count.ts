import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ScrapeJobCount {
  @Field(() => Number)
  content: number;

  @Field(() => Number)
  created: number;

  @Field(() => Number)
  loadingError: number;

  @Field(() => Number)
  scrapingError: number;

  @Field(() => Number)
  success: number;
}
