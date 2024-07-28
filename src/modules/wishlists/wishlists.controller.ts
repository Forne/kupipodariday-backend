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
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiException } from '../../common/dto/api-exception';
import { CurrentUser } from '../auth/user.decorator';
import { JwtPayloadDto } from '../auth/dto/jwt-payload';

@ApiTags('wishlists')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ type: ApiException })
@UseGuards(JwtGuard)
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  create(
    @Body() createWishlistDto: CreateWishlistDto,
    @CurrentUser() user: JwtPayloadDto,
  ) {
    return this.wishlistsService.create(createWishlistDto);
  }

  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishlistsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @CurrentUser() user: JwtPayloadDto,
  ) {
    const result = await this.wishlistsService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Object with ${id} does not exist.`);
    }
    if (result.owner.id !== user.id) {
      throw new ForbiddenException('Permission error');
    }
    return this.wishlistsService.update(+id, updateWishlistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @CurrentUser() user: JwtPayloadDto) {
    const result = await this.wishlistsService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Object with ${id} does not exist.`);
    }
    if (result.owner.id !== user.id) {
      throw new ForbiddenException('Permission error');
    }
    return this.wishlistsService.remove(+id);
  }
}
