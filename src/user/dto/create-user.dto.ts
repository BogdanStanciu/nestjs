import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserType } from 'src/shared/userType.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  surname: string;

  @IsEnum(UserType)
  @IsOptional()
  @ApiProperty({ enum: ['ADMIN', 'RECEPTIONIST', 'EMPLOYEE'] })
  type: UserType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
