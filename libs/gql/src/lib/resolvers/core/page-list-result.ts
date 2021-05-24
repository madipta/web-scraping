import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PageListResult {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => Int, { nullable: true })
  total?: number;
}