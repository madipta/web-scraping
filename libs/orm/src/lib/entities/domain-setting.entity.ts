import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
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
  @PrimaryColumn()
  id: number;

  @Field(() => String)
  @Column({
    name: "indexing_type",
    default: ContentIndexingType.WEB,
  })
  indexingType: ContentIndexingType;

  @Field(() => String)
  @Column({
    name: "load_index_type",
    default: LoadIndexType.FULL,
  })
  loadIndexType: LoadIndexType;

  @Field(() => String, { nullable: true })
  @Column({ name: "index_url", nullable: true })
  indexUrl?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ name: "index_path", nullable: true })
  indexPath?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ name: "next_path", nullable: true })
  nextPath?: string | null;

  @Field(() => Boolean)
  @Column({ name: "scroll_more", default: false })
  scrollMore?: boolean;

  @Field(() => String, { nullable: true })
  @Column({ name: "content_path", nullable: true })
  contentPath?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ name: "header_path", nullable: true })
  headerPath?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ name: "category_path", nullable: true })
  categoryPath?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ name: "publish_date_path", nullable: true })
  publishDatePath?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ name: "image_path", nullable: true })
  imagePath?: string | null;

  @Field(() => Date)
  @CreateDateColumn({ name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;

  @OneToOne(() => Domain, (domain) => domain.setting)
  domain: IDomain;
}
