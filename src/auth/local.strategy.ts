import { Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Strategy } from 'passport-local';
import { PassportStrategy } from "@nestjs/passport";
import { Client } from "src/clients/entities/client.entity";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
        clientnameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    return this.authService.getAuthenticatedClient(email, password)
  }
}