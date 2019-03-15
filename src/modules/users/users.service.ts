import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../core/interfaces/user.interface';
import { SignupDto } from '../core/dto/signup.dto';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {
  
  }
  
  async create(user: SignupDto): Promise<User> {
    const newUser: SignupDto = new SignupDto(user);
    const createdUser = new this.userModel(newUser);
    return await createdUser.save();
  }
  
  async findById(id: string): Promise<User> {
    return this.userModel
    .findById(id)
    .select('-password')
    .lean()
    .then((user: User): User => user);
  }
  
}
