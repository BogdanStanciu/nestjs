import { UserType } from 'src/shared/userType.enum';

export interface JwtPaylaod {
  userId: string;
  type: UserType;
}
