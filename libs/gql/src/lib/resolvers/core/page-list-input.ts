import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class PageListInput {
  @Field(() => Int, { defaultValue: 1 })
  pageIndex: number;

  @Field(() => Int, { defaultValue: 20 })
  pageSize: number;

  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => String, { nullable: true })
  sortBy: string;

  @Field(() => String, { nullable: true })
  sortOrder: string;
}
