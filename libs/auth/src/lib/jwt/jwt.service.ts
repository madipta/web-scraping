import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtService {
  constructor(private readonly config: ConfigService) {}

  sign(userName: string): string {
    return jwt.sign({ userName }, this.config.get("jwt_private_key"));
  }

  verify(token: string) {
    return jwt.verify(token, this.config.get("jwt_private_key"));
  }

  decode(token: string) {
    return jwt.decode(token);
  }
}
