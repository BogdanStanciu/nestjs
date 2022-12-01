import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private logger: Logger;

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  /**
   * Login user
   * @param {AuthCredentialsDto} authCredentials
   * @returns {Promise<AuthResponseDto>}
   */
  async login(authCredentials: AuthCredentialsDto): Promise<AuthResponseDto> {
    const user = await this.userModel
      .findOne({
        username: authCredentials.username,
      })
      .exec();

    if (!user || !bcrypt.compareSync(authCredentials.password, user.password)) {
      throw new UnauthorizedException(`Credentials not valid`);
    }

    const payload = { userId: user._id, type: user.type };
    // eslint-disable-next-line @typescript-eslint/camelcase
    const access_token = await this.jwtService.sign(payload);
    // eslint-disable-next-line @typescript-eslint/camelcase
    return { access_token };
  }
}
