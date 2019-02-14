import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';

import { SignupDto } from '../core/dto/signup.dto';

@Controller()
export class AuthController {
  
  constructor() {
  }
  
  @Post('signup')
  async signup(@Req() req: any, @Res() res: any, @Body() body: SignupDto,
  ) {
    console.log(body);
    res.status(HttpStatus.OK).send(body);
  }
  
}
