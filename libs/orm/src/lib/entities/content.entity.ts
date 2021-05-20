import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import type { IContent, ILink } from "../interfaces";
import { Link } from "./link.entity";

@ObjectType()
@Entity()
export class Content implements IContent {
  @Field(() => Number)
  @PrimaryColumn({ name: "id" })
  id: number;

  @Field(() => String, { nullable: true })
  @Column()
  text: string;

  @Field(() => String, { nullable: true })
  @Column()
  html: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "image_url" })
  imageUrl: string;

  @Field(() => String, { nullable: true })
  @Column()
  title: string;

  @Field(() => String, { nullable: true })
  @Column()
  category: string;

  @Field(() => Date, { nullable: true })
  @Column({ name: "publish_date" })
  publishDate: Date;

  @OneToOne(() => Link)
  @JoinColumn({
    name: "id",
    referencedColumnName: "id",
  })
  link: ILink;
}
