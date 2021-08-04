import {
  Args,
  Field,
  InputType,
  IntersectionType,
  Mutation,
  ObjectType,
  OmitType,
  PartialType,
  PickType,
  Query,
  Resolver,
} from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService, Role } from "@web-scraping/auth";
import { DbSetup, User, UserRole } from "@web-scraping/orm";
import { Connection, Repository } from "typeorm";
import { BaseResult } from "../core/base-result";

@ObjectType()
export class UserResult extends BaseResult {
  @Field(() => User, { nullable: true })
  result?: User;
}

@InputType()
export class UserLoginInput extends OmitType(User, [
  "role",
  "createdAt",
  "updatedAt",
]) {}

@ObjectType()
export class UserLoginResult extends BaseResult {
  @Field(() => String, { nullable: true })
  token?: string;
}

@InputType()
export class UserCreateInput extends OmitType(User, [
  "createdAt",
  "updatedAt",
]) {}

@InputType()
export class UserUpdateInput extends IntersectionType(
  PickType(User, ["userName"]),
  PartialType(UserCreateInput)
) {}

@InputType()
export class GetByUserNameInput extends PickType(User, ["userName"]) {}

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly jwtService: JwtService,
    private connection: Connection,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  @Query(() => UserLoginResult)
  async userLogin(
    @Args("input") dto: UserLoginInput
  ): Promise<UserLoginResult> {
    try {
      const { password } = dto;
      let { userName } = dto;
      userName = userName.toLowerCase();
      if ((await this.userRepo.count({})) === 0) {
        // if user table are empty create new user as admin
        await this.userRepo.save(
          this.userRepo.create({ userName, password, role: UserRole.admin })
        );
        // run initial setup
        await DbSetup.init(this.connection.createQueryRunner());
      }
      const result = await this.userRepo.findOne({ userName });
      if (!result) {
        return { ok: false, error: "User not found!" };
      }
      if (!result.checkPassword(password)) {
        return { ok: false, error: "Wrong password!" };
      }
      return { ok: true, token: this.jwtService.sign(userName) };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "User login failed!" };
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

  @Role("admin")
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

  @Role("any")
  @Mutation(() => UserResult)
  async updateUser(@Args("input") dto: UserUpdateInput): Promise<UserResult> {
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
      user.role = dto.role;
      user.password = dto.password;
      const result = await this.userRepo.save(user);
      return { ok: true, result };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "Update user failed!" };
    }
  }

  @Role("admin")
  @Mutation(() => UserResult)
  async deleteUser(
    @Args("input") dto: GetByUserNameInput
  ): Promise<UserResult> {
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
}
