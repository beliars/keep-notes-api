import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  
  constructor() {
  }
  
  static retriveSafeUser(user) {
    const {password, ...restUser} = user;
    return restUser;
  }
  
}
