import { Field, InputType, ObjectType } from "@nestjs/graphql";
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

export type ScrapIndexMethodType = "web" | "spa";
export type ScrapIndexPagingType = "single" | "paging";
export type ScrapIndexFormatType = "html";
export type ScrapArticleMethodType = "web" | "spa";
export type ScrapArticleFormatType = "html";

@InputType("DomainSettingEntity", { isAbstract: true })
@ObjectType()
@Entity()
export class DomainSetting implements IDomainSetting {
  @Field(() => Number)
  @PrimaryColumn({ type: "int" })
  id: number;

  @Field(() => String)
  @Column({
    name: "scrap_index_method",
    default: "web",
    type: "character varying",
    length: 10,
  })
  scrapIndexMethod: ScrapIndexMethodType;

  @Field(() => String)
  @Column({
    name: "scrap_index_paging",
    default: "single",
    type: "character varying",
    length: 10,
  })
  scrapIndexPaging: ScrapIndexPagingType;

  @Field(() => String)
  @Column({
    name: "scrap_index_format",
    default: "html",
    type: "character varying",
    length: 10,
  })
  scrapIndexFormat: ScrapIndexFormatType;

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

  @Field(() => String)
  @Column({
    name: "scrap_article_method",
    default: "web",
    type: "character varying",
    length: 10,
  })
  scrapArticleMethod: ScrapArticleMethodType;

  @Field(() => String)
  @Column({
    name: "scrap_article_format",
    default: "html",
    type: "character varying",
    length: 10,
  })
  scrapArticleFormat: ScrapArticleFormatType;

  @Field(() => String, { nullable: true })
  @Column({
    name: "article_path",
    nullable: true,
    type: "character varying",
    length: 250,
  })
  articlePath?: string | null;

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
