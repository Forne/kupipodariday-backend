import { Body, Req, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SigninUserResponseDto } from './dto/signin-user-response';
import { SignupUserResponseDto } from './dto/signup-user-response';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { SigninUserDto } from './dto/signin-user';
import { ApiException } from '../../common/dto/api-exception';

@ApiTags('auth')
@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: SigninUserDto })
  @ApiCreatedResponse({ type: SigninUserResponseDto })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiUnauthorizedResponse({ type: ApiException })
  @UseGuards(LocalGuard)
  @Post('signin')
  signIn(@Req() req) {
    return this.authService.auth(req.user);
  }

  @ApiCreatedResponse({ type: SignupUserResponseDto })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiConflictResponse()
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
