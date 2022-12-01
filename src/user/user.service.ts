import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
  private salt_rounds = 10;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Create and return a new user
   * @param {CreateUserDto} createUserDto
   * @returns {Promise<User>}
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);

    const salt = bcrypt.genSaltSync(this.salt_rounds);
    createdUser.password = bcrypt.hashSync(createUserDto.password, salt);

    return createdUser.save().catch(err => {
      if (err.code == 11000) {
        throw new BadRequestException('Duplicate value entry', err.keyValue);
      }
      throw new InternalServerErrorException(err.toString());
    });
  }

  /**
   * Search user in db with username if passed 
   * @param {string} username
   * @returns {Promise<User[]>}
   */
  async find(username?: string): Promise<User[]> {
    if (username) {
      return this.userModel
        .find({
          username: username,
        })
        .exec();
    }
    return this.userModel.find().exec();
  }

  /**
   * Delete a user by id
   * @param {string} id
   * @returns {Promise<boolean>}
   */
  async delete(id: string): Promise<boolean> {
    const check = await this.userModel.findByIdAndRemove(id);
    return !!check;
  }
}
