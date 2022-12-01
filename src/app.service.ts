/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UserType } from './shared/userType.enum';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UserService } from './user/user.service';

const admin = 'admin.admin';
const james = 'james.bond';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly userService: UserService) {}

  /**
   * Exec method before start listening on port and insert admin user
   * @returns {Promise<any>}
   */
  async onApplicationBootstrap(): Promise<any> {
    // check if exits admin, james bond if no insert
    if ((await this.userService.find(admin))[0]?.username !== admin) {
      // Insert admin
      const dto: CreateUserDto = {
        username: admin,
        name: 'admin',
        surname: 'admin',
        password: '1234',
        type: UserType.ADMIN,
      };
      await this.userService.create(dto);
    }

    if ((await this.userService.find(james))[0]?.username !== james) {
      // Insert james
      const dto: CreateUserDto = {
        username: james,
        name: 'James',
        surname: 'Bond',
        password: '1234',
        type: UserType.EMPLOYEE,
      };
      await this.userService.create(dto);
    }
  }
}
