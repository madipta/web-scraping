import { Field, InputType, ObjectType } from "@nestjs/graphql";
import * as bcrypt from "bcrypt";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { IUser } from "../interfaces";

@InputType("UserInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class User implements IUser {
  @Field(() => String, { nullable: false })
  @PrimaryColumn({ name: "user_name", type: "character varying", length: 25 })
  userName: string;

  @Field(() => String, { nullable: false })
  @Column({ type: "char", length: 60 })
  password: string;

  @Field(() => Date)
  @CreateDateColumn({ name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
