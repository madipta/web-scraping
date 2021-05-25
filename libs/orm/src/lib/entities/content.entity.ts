import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import type { IContent, ILink } from "../interfaces";
import { Link } from "./link.entity";

@ObjectType()
@Entity()
export class Content implements IContent {
  @Field(() => Number)
  @PrimaryColumn({ type: "bigint" })
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "text" })
  text?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "text" })
  html?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ name: "image_html", nullable: true, type: "text" })
  imageHtml?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "character varying", length: 2048 })
  title?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "character varying", length: 2048 })
  category?: string | null;

  @Field(() => Date, { nullable: true })
  @Column({ name: "publish_date", nullable: true })
  publishDate?: Date | null;

  @Field(() => Date)
  @CreateDateColumn({ name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt?: Date;

  @OneToOne(() => Link, (link) => link.content)
  @JoinColumn({
    name: "id",
    referencedColumnName: "id",
  })
  link: ILink;
}
