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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/user.decorator';
import { JwtPayloadDto } from '../auth/dto/jwt-payload';

@ApiTags('wishes')
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

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
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const result = await this.wishesService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Object with ${id} does not exist.`);
    }
    return result;
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateWishDto: UpdateWishDto) {
    const result = await this.wishesService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Object with ${id} does not exist.`);
    }
    return this.wishesService.update(+id, updateWishDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.wishesService.remove(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post(':id/copy')
  copy(@Param('id') id: number) {
    //return this.wishesService.create(createWishDto);
    return '';
  }
}
