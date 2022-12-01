import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUser } from 'src/user/user.decorator';
import { User } from './schemas/user.schema';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Roles } from './roles.decorator';
import { UserType } from 'src/shared/userType.enum';
import { RolesGuard } from 'src/guard/role.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: User,
    isArray: false,
    description: 'Create user',
  })
  @ApiProperty({
    type: CreateUserDto,
    isArray: false,
  })
  @Post()
  @Roles(UserType.ADMIN)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    type: User,
    isArray: true,
  })
  async findAll(
    @GetUser() user: User,
    @Query('username') username: string,
  ): Promise<User[]> {
    return this.userService.find(username);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Boolean })
  @Roles(UserType.ADMIN)
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.userService.delete(id);
  }
}
