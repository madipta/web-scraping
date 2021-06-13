import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@web-scraping/orm";
import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { JwtService } from "./jwt.service";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const headerKey = this.config.get("jwt_header_key");
    if (headerKey in req.headers) {
      const token = req.headers[headerKey];
      try {
        const payloadId = this.config.get("jwt_payload_id");
        const decoded = this.jwtService.verify(token.toString());
        if (typeof decoded === "object" && decoded[payloadId]) {
          const user = await this.userRepo.findOne(decoded[payloadId]);
          if (user) {
            req["user"] = user;
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    next();
  }
}
