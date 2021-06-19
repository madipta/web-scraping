import { Field, InputType, ObjectType } from "@nestjs/graphql";
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

@InputType("LinkEntity", { isAbstract: true })
@ObjectType()
@Entity()
export class Link implements ILink {
  @Field(() => Number)
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Field(() => Number)
  @Column({ name: "domain_id", type: "int" })
  domainId: number;

  @Field(() => String)
  @Column({ unique: true, type: "character varying", length: 2048 })
  url: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "character varying", length: 2048 })
  title?: string | null;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true, type: "boolean" })
  scraped?: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true })
  broken?: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true })
  active?: boolean;

  @Field(() => Date)
  @CreateDateColumn({ name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt?: Date;

  @Field(() => Domain)
  @ManyToOne(() => Domain, (domain) => domain.links)
  @JoinColumn({ name: "domain_id", referencedColumnName: "id" })
  domain: IDomain;

  @OneToOne(() => Content, (content) => content.link, { onDelete: "CASCADE" })
  content: IContent;
}
