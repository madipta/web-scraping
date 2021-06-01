import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { ILink, IScrapeJob, Link } from "@web-scraping/orm";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

export type ScrapeJobStatusType =
  | "created"
  | "starting"
  | "loading"
  | "scraping"
  | "loading failed"
  | "scraping failed"
  | "success";

@InputType("AbstractScrapeJobInputType", { isAbstract: true })
@ObjectType()
@Entity({ name: "scrape_job" })
export class ScrapeJob implements IScrapeJob {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => Number)
  @Column({ name: "link_id", type: "bigint" })
  linkId: number;

  @Field(() => String)
  @Column()
  status: ScrapeJobStatusType;

  @Field(() => Date)
  @CreateDateColumn({ name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ name: "started_at", nullable: true })
  startedAt?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ name: "finished_at", nullable: true })
  finishedAt?: Date;

  @Field(() => Link, { nullable: true })
  @ManyToOne(() => Link, (link) => link.id)
  @JoinColumn({ name: "link_id", referencedColumnName: "id" })
  link: ILink;
}