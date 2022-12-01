import { UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { JwtPaylaod } from './jwt-payload.interface';
import { Model } from 'mongoose';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPaylaod): Promise<any> {
    const { userId } = payload;

    // take user from mongoDB
    const user = await this.userModel.find({
      _id: userId,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  } // validate
}
