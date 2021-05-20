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
  @PrimaryColumn({ name: "id" })
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  feed?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ name: "feed_url", nullable: true })
  feedUrl?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  text?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  html?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ name: "image_html", nullable: true })
  imageHtml?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  title?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  category?: string | null;

  @Field(() => Date, { nullable: true })
  @Column({ name: "publish_date", nullable: true })
  publishDate?: Date | null;

  @Field(() => Date)
  @CreateDateColumn({ name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;

  @OneToOne(() => Link)
  @JoinColumn({
    name: "id",
    referencedColumnName: "id",
  })
  link: ILink;
}
