import { Field, InputType, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import type { IDomain, IDomainSetting, ILink } from "../interfaces";
import { DomainSetting } from "./domain-setting.entity";
import { Link } from "./link.entity";

@InputType('DomainCreateInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Domain implements IDomain {
  @Field(() => Number)
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Field(() => String, { nullable: false })
  @Column({ unique: true, type: "character varying", length: 2048 })
  home: string;

  @Field(() => String, { nullable: true })
  @Column({
    name: "admin_email",
    nullable: true,
    type: "character varying",
    length: 150,
  })
  adminEmail?: string | null;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true })
  active?: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true })
  disabled?: boolean;

  @Field(() => Date)
  @CreateDateColumn({ name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt?: Date;

  @Field(() => [Link])
  @OneToMany(() => Link, (link) => link.domain)
  links: ILink[];

  @Field(() => DomainSetting)
  @OneToOne(() => DomainSetting, (setting) => setting.domain, {
    nullable: true,
    onDelete: "CASCADE",
  })
  setting: IDomainSetting;
}
