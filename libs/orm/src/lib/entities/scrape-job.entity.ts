import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { ILink, IScrapeJob } from "../interfaces";
import { Link } from "./link.entity";

export enum ScrapeJobStatus {
  created = "created",
  loadingFailed = "loading-failed",
  scrapingFailed = "scraping-failed",
  success = "success",
}

registerEnumType(ScrapeJobStatus, { name: "ScrapeJobStatus" });

@InputType("AbstractScrapeJobInputType", { isAbstract: true })
@ObjectType()
@Entity({ name: "scrape_job" })
export class ScrapeJob implements IScrapeJob {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column({ type: "character varying", length: 2048 })
  url: string;

  @Field(() => String)
  @Column({
    type: "enum",
    enum: ScrapeJobStatus,
    default: ScrapeJobStatus.created,
  })
  status: ScrapeJobStatus;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ name: "finished_at", nullable: true })
  finishedAt?: Date;
}
