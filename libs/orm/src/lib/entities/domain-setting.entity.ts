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
import type { IDomain, IDomainSetting } from "../interfaces";
import { Domain } from "./domain.entity";

export enum ContentIndexingType {
  API = "api",
  SPA = "spa",
  WEB = "web",
}

export enum LoadIndexType {
  FULL = "full",
  NEXT = "next",
  SCROLL = "scroll",
}

@ObjectType()
@Entity()
export class DomainSetting implements IDomainSetting {
  @Field(() => Number)
  @PrimaryColumn({ type: "int" })
  id: number;

  @Field(() => String)
  @Column({
    name: "indexing_type",
    default: ContentIndexingType.WEB,
    type: "character varying",
    length: 3,
  })
  indexingType: ContentIndexingType;

  @Field(() => String)
  @Column({
    name: "load_index_type",
    default: LoadIndexType.FULL,
    type: "character varying",
    length: 6,
  })
  loadIndexType: LoadIndexType;

  @Field(() => String, { nullable: true })
  @Column({
    name: "index_url",
    nullable: true,
    type: "character varying",
    length: 2048,
  })
  indexUrl?: string | null;

  @Field(() => String, { nullable: true })
  @Column({
    name: "index_feed_url",
    nullable: true,
    type: "character varying",
    length: 2048,
  })
  indexFeedUrl?: string | null;

  @Field(() => String, { nullable: true })
  @Column({
    name: "index_path",
    nullable: true,
    type: "character varying",
    length: 250,
  })
  indexPath?: string | null;

  @Field(() => String, { nullable: true })
  @Column({
    name: "next_path",
    nullable: true,
    type: "character varying",
    length: 250,
  })
  nextPath?: string | null;

  @Field(() => Boolean)
  @Column({ name: "scroll_more", default: false })
  scrollMore?: boolean;

  @Field(() => String, { nullable: true })
  @Column({
    name: "content_path",
    nullable: true,
    type: "character varying",
    length: 250,
  })
  contentPath?: string | null;

  @Field(() => String, { nullable: true })
  @Column({
    name: "header_path",
    nullable: true,
    type: "character varying",
    length: 250,
  })
  headerPath?: string | null;

  @Field(() => String, { nullable: true })
  @Column({
    name: "category_path",
    nullable: true,
    type: "character varying",
    length: 250,
  })
  categoryPath?: string | null;

  @Field(() => String, { nullable: true })
  @Column({
    name: "publish_date_path",
    nullable: true,
    type: "character varying",
    length: 250,
  })
  publishDatePath?: string | null;

  @Field(() => String, { nullable: true })
  @Column({
    name: "image_path",
    nullable: true,
    type: "character varying",
    length: 250,
  })
  imagePath?: string | null;

  @Field(() => Date)
  @CreateDateColumn({ name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt?: Date;

  @Field(() => Domain)
  @OneToOne(() => Domain, (domain) => domain.setting)
  @JoinColumn({ name: "id", referencedColumnName: "id" })
  domain: IDomain;
}
