import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import type { IContent, ILink } from "../interfaces";
import { Link } from "./link.entity";

@ObjectType()
@Entity()
export class Content implements IContent {
  @Field(() => Number)
  @PrimaryColumn()
  linkId: number;

  @Field(() => String)
  @Column()
  content: string;

  @OneToOne(() => Link)
  @JoinColumn({
    name: "linkId",
    referencedColumnName: "id",
  })
  link: ILink;
}
