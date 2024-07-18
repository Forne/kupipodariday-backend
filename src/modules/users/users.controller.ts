import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: UserProfileResponseDto })
  @Get('me')
  async findOwnProfile() {
    // TODO
    const id = 1;
    return this.usersService.findOne(id);
  }

  @ApiOkResponse({ type: UserProfileResponseDto })
  @ApiBadRequestResponse()
  @Patch('me')
  updateOwnProfile(@Body() updateUserDto: UpdateUserDto) {
    // TODO
    const id = 1;
    return this.usersService.update(id, updateUserDto);
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
