import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/user.decorator';
import { JwtPayloadDto } from '../auth/dto/jwt-payload';
import { ApiException } from '../../common/dto/api-exception';
import { plainToInstance } from 'class-transformer';
import { WishResponseDto } from './dto/wish-response.dto';

@ApiTags('wishes')
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @ApiBadRequestResponse({ type: ApiException })
  @ApiUnauthorizedResponse({ type: ApiException })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body() createWishDto: CreateWishDto,
    @CurrentUser() user: JwtPayloadDto,
  ) {
    return this.wishesService.create(createWishDto, user);
  }

  @Get('last')
  findLast() {
    return this.wishesService.findLast();
  }

  @Get('top')
  findTop() {
    return this.wishesService.findTop();
  }

  @ApiNotFoundResponse()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const result = await this.wishesService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Object with ${id} does not exist.`);
    }
    return plainToInstance(WishResponseDto, result);
  }

  @ApiBadRequestResponse({ type: ApiException })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
    @CurrentUser() user: JwtPayloadDto,
  ) {
    const result = await this.wishesService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Object with ${id} does not exist.`);
    }
    if (result.owner.id !== user.id) {
      throw new ForbiddenException('Permission error');
    }
    // TODO disable change price if offers > 0
    return this.wishesService.update(+id, updateWishDto);
  }

  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @CurrentUser() user: JwtPayloadDto) {
    const result = await this.wishesService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Object with ${id} does not exist.`);
    }
    if (result.owner.id !== user.id) {
      throw new ForbiddenException('Permission error');
    }
    return this.wishesService.remove(+id);
  }

  @ApiNotFoundResponse()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copy(@Param('id') id: number, @CurrentUser() user: JwtPayloadDto) {
    const result = await this.wishesService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Object with ${id} does not exist.`);
    }
    // TODO to CreateWishDto
    return this.wishesService.create(result, user);
  }
}
