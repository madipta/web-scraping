import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@web-scraping/orm";
import { Repository } from "typeorm";
import { AllowedRoles } from "../decorators/role.decorator";
import { JwtService } from "../jwt/jwt.service";

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}
  async canActivate(context: ExecutionContext) {
    if(context.getType().toString() !== "graphql") {
      return true;
    }
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const token = gqlContext.req.headers.authorization;
    if (token) {
      const decoded = this.jwtService.verify(token.toString());
      const payloadId = this.config.get("jwt_payload_id");
      if (typeof decoded === "object" && decoded[payloadId]) {
        const user = await this.userRepo.findOne(decoded[payloadId]);
        if (user) {
          gqlContext['user'] = user;
          if (roles.includes("any")) {
            return true;
          }
          return roles.includes(user.role);
        }
      }
    }
    return false;
  }
}
