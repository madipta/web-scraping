import {
  Args,
  Field,
  InputType,
  Mutation,
  ObjectType,
  OmitType,
  PickType,
  Query,
  Resolver,
} from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@web-scraping/orm";
import { Repository } from "typeorm";
import { BaseResult } from "../core/base-result";

@ObjectType()
export class UserResult extends BaseResult {
  @Field(() => User, { nullable: true })
  result?: User;
}

@InputType()
export class UserCreateInput extends OmitType(User, [
  "createdAt",
  "updatedAt",
]) {}

@InputType()
export class GetByUserNameInput extends PickType(User, ["userName"]) {}

@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  @Mutation(() => UserResult)
  async createUser(@Args("input") dto: UserCreateInput): Promise<UserResult> {
    try {
      let { userName } = dto;
      userName = userName.toLowerCase();
      const data = { ...dto, userName };
      if (
        await this.userRepo.count({ select: ["userName"], where: { userName } })
      ) {
        return { ok: false, error: "User exists!" };
      }
      const result = await this.userRepo.save(this.userRepo.create(data));
      return { ok: true, result };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "Create user failed!" };
    }
  }

  @Mutation(() => UserResult)
  async updateUser(@Args("input") dto: UserCreateInput): Promise<UserResult> {
    try {
      let { userName } = dto;
      userName = userName.toLowerCase();
      const user = await this.userRepo.findOne(userName);
      if (!user) {
        return {
          ok: false,
          error: "User not found!",
        };
      }
      user.password = dto.password;
      const result = await this.userRepo.save(user);
      return { ok: true, result };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "Update user failed!" };
    }
  }

  @Mutation(() => UserResult)
  async deleteUser(@Args("input") dto: UserCreateInput): Promise<UserResult> {
    try {
      let { userName } = dto;
      userName = userName.toLowerCase();
      const result = await this.userRepo.delete({ userName });
      return { ok: result.affected === 1 };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "Delete user failed!" };
    }
  }

  @Query(() => UserResult)
  async getUserById(
    @Args("input") dto: GetByUserNameInput
  ): Promise<UserResult> {
    try {
      let { userName } = dto;
      userName = userName.toLowerCase();
      const result = await this.userRepo.findOne({ userName });
      return { ok: true, result };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "Get User failed!" };
    }
  }

  @Query(() => UserResult)
  async userLogin(@Args("input") dto: UserCreateInput): Promise<UserResult> {
    try {
      let { userName } = dto;
      userName = userName.toLowerCase();
      const result = await this.userRepo.findOne({ userName });
      return { ok: true, result };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "User login failed!" };
    }
  }
}
