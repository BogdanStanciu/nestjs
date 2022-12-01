import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    type: AuthResponseDto,
    description: 'JWT Token',
  })
  @Post('login')
  async login(
    @Body() authCredentials: AuthCredentialsDto,
  ): Promise<AuthResponseDto> {
    return this.authService.login(authCredentials);
  }
}
