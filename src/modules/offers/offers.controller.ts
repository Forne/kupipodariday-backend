import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiException } from '../../common/dto/api-exception';
import { CurrentUser } from '../auth/user.decorator';
import { JwtPayloadDto } from '../auth/dto/jwt-payload';

@ApiTags('offers')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ type: ApiException })
@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(
    @Body() createOfferDto: CreateOfferDto,
    @CurrentUser() user: JwtPayloadDto,
  ) {
    /* TODO
     * нельзя оффер на собственный подарок
     * проверка итоговой суммы
     * на завершенный подарок (уже собраны деньги)
     */
    return this.offersService.create(createOfferDto);
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }
}
