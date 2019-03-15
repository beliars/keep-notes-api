import { Controller, Get, Req, Param, Res, HttpStatus, HttpException } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  
  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  @Get(':id')
  async getUserById(@Req() req: any, @Param('id') id: string, @Res() res: any) {
    if (req.user && req.user._id.toString() === id) {
      return res.status(HttpStatus.OK).send(req.user);
    }
    throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
  }
  
}
