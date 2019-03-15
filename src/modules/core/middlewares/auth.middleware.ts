import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../users/users.service';
import { Token } from '../interfaces/token.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async resolve(...args: any[]): Promise<MiddlewareFunction> {
    return async (req, res, next): Promise<any> => {
      const authHeader: string = req.headers.authorization;
      if (!authHeader) { return next(); }
      const token: Token = await this.authService.findToken(authHeader.split(' ')[1]);
      req.user = await this.usersService.findById(token.userId);
      delete req.user.password;
      next();
    };
  }
}
