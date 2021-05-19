import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import type { IDomain, IDomainSetting, ILink } from "../interfaces";
import { DomainSetting } from "./domain-setting.entity";
import { Link } from "./link.entity";

@ObjectType()
@Entity()
export class Domain implements IDomain {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  home: string;

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
  
  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;

  @Field(() => [Link])
  @OneToMany(() => Link, (link) => link.domain)
  links: ILink[];

  @OneToOne(() => DomainSetting, setting => setting.domain)
  @JoinColumn({
    name: "id",
    referencedColumnName: "id",
  })
  setting: IDomainSetting;
}
