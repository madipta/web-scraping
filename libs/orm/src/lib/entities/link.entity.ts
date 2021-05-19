import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import type { IContent, IDomain, ILink } from "../interfaces";
import { Content } from "./content.entity";
import { Domain } from "./domain.entity";

@ObjectType()
@Entity()
export class Link implements ILink {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Number)
  @Column({ name: "domain_id" })
  domainId: number;

  @Field(() => String)
  @Column({ unique: true })
  url: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  title?: string | null;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true })
  scraped?: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true })
  broken?: boolean;

  @Field(() => Date)
  @CreateDateColumn({ name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;

  @ManyToOne(() => Domain, (domain) => domain.links)
  @JoinColumn({ name: "domain_id" })
  domain: IDomain;

  @OneToOne(() => Content)
  content: IContent;
}
