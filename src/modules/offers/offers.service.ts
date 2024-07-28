import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  create(createOfferDto: CreateOfferDto) {
    const offer = this.offerRepository.create(createOfferDto);
    // TODO offer.user =
    return this.offerRepository.save(offer).then((res) => {
      res.user = null;
      return res;
    });
  }

  findAll() {
    return this.offerRepository.find({});
  }

  findOne(id: number) {
    return this.offerRepository.findOneBy({ id });
  }
}
