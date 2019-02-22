import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import { SigninDto } from '../core/dto/signin.dto';
import { User } from '../core/interfaces/user.interface';
import { Token } from '../core/interfaces/token.interface';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Token') private readonly tokenModel: Model<Token>,
  ) {
  }
  
  static retrieveSafeUser(user) {
    const {password, ...restUser} = user;
    return restUser;
  }
  
  async auth(signinData: SigninDto): Promise<User> {
    if (!signinData.email) {
      throw new HttpException('Email is required', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return this.userModel
    .findOne({email: signinData.email.toLowerCase()})
    .lean()
    .then((user: any): Promise<any> => {
      if (!user) {
        throw new HttpException('Wrong email or password', HttpStatus.UNPROCESSABLE_ENTITY);
      }
      return new Promise((resolve, reject) => {
        bcrypt.compare(signinData.password, user.password, (err, match) => {
          if (err || !match) {
            return reject({ message: 'Wrong email or password', status: 422 });
          }
          return resolve(AuthService.retrieveSafeUser(user));
        });
      });
    });
  }
  
  async createToken(userId: string): Promise<Token> {
    return this.tokenModel
    .create({
      id: jwt.sign({exp: moment().unix() + parseInt(process.env.SESSION_EXPIRY, 10)}, process.env.SESSION_SECRET),
      userId,
    });
  }
  
}
