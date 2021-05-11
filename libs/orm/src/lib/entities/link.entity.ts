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
  @Column()
  domainId: number;

  @Field(() => String)
  @Column()
  url: string;

  @Field(() => String, { nullable: true })
  @Column()
  title?: string | null;

  @Field(() => Boolean, { nullable: true })
  @Column()
  scraped?: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column()
  broken?: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Domain)
  @JoinColumn({
    name: "domainId",
    referencedColumnName: "id",
  })
  domain: IDomain;

  @OneToOne(() => Content)
  content: IContent;
}
