import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/user.decorator';
import { JwtPayloadDto } from '../auth/dto/jwt-payload';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: UserProfileResponseDto })
  @Get('me')
  async findOwnProfile(@CurrentUser() user: JwtPayloadDto) {
    return this.usersService.findOne(user.id);
  }

  @ApiOkResponse({ type: UserProfileResponseDto })
  @ApiBadRequestResponse()
  @Patch('me')
  updateOwnProfile(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: JwtPayloadDto,
  ) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @ApiOkResponse()
  @Get('me/wishes')
  findOwnWishes() {
    // TODO
    return [{}];
  }

  @ApiOkResponse({ type: UserPublicProfileResponseDto })
  @ApiNotFoundResponse()
  @Get(':username')
  async findUser(@Param('username') username: string) {
    const result = await this.usersService.findOneByUsername(username);
    if (!result) {
      throw new NotFoundException(`Object with ${username} does not exist.`);
    }
    return result;
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':username/wishes')
  findUserWishes(@Param('username') username: string) {
    // TODO
    return [{}];
  }

  @ApiOkResponse({
    /* тип UserProfileResponseDto из доки тут неуместен
     * если скрывать email от других юзеров, то везде */
    type: UserPublicProfileResponseDto,
    isArray: true,
  })
  @Post('find')
  findUsersByQuery(@Body() findUsersDto: FindUsersDto) {
    // TODO
    return [{}];
  }
}
