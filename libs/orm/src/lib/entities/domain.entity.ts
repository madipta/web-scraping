import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import type { IDomain, ILink } from "../interfaces";
import { Link } from "./link.entity";

@ObjectType()
@Entity({
  name: "Domain",
})
export class Domain implements IDomain {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  home: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "index_url", nullable: true })
  indexUrl?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ name: "index_path", nullable: true })
  indexPath?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ name: "next_path", nullable: true })
  nextPath?: string | null;

  @Field(() => Boolean, { nullable: true })
  @Column({ name: "scroll_more", nullable: true })
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
  @Column({ name: "admin_email", nullable: true })
  adminEmail?: string | null;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true })
  active?: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true })
  disabled?: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true })
  broken?: boolean;

  @Field(() => Date)
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Field(() => [Link])
  @OneToMany(() => Link, (link) => link.domain)
  links: ILink[];
}
