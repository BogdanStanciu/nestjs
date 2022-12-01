import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { UserType } from 'src/shared/userType.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty()
  @Prop({ required: true })
  username: string;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  surname: string;

  @ApiProperty()
  @Prop({ default: true, required: true })
  enabled: boolean;

  @ApiProperty()
  @Prop({ default: UserType.EMPLOYEE, required: true })
  type: UserType;

  @ApiProperty()
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ username: 1, password: 1 });
UserSchema.index({ name: 'text', surname: 'text' });
