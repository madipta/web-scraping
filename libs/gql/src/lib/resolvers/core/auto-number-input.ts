import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class AutoNumberInput {
  @Field(() => Int, { nullable: false })
  id: number;
}