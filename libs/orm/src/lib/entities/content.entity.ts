import { Field, InputType, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import type { IContent, IDomain, ILink } from "../interfaces";
import { Domain } from "./domain.entity";
import { Link } from "./link.entity";

@InputType("ContentEntity", { isAbstract: true })
@ObjectType()
@Entity()
export class Content implements IContent {
  @Field(() => Number)
  @PrimaryColumn({ type: "bigint" })
  id: number;

  @Field(() => Number)
  @Column({ name: "domain_id", type: "int" })
  domainId: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "character varying", length: 2048 })
  title?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "text" })
  text?: string | null;

  @Column({
    name: "search_vector",
    nullable: true,
    type: "tsvector",
    select: false,
  })
  searchVector?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ name: "image_html", nullable: true, type: "text" })
  imageHtml?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "character varying", length: 2048 })
  header?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "character varying", length: 2048 })
  category?: string | null;

  @Field(() => Date, { nullable: true })
  @Column({ name: "publish_date", nullable: true })
  publishDate?: Date | null;

  @Field(() => Date)
  @CreateDateColumn({ name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt?: Date;

  @Field(() => Link, { nullable: true })
  @OneToOne(() => Link, (link) => link.content)
  @JoinColumn({
    name: "id",
    referencedColumnName: "id",
  })
  link: ILink;

  @Field(() => Domain, { nullable: true })
  @ManyToOne(() => Domain, (domain) => domain.contents)
  @JoinColumn({ name: "domain_id", referencedColumnName: "id" })
  domain: IDomain;
}
