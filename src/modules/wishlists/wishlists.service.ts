import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}

  async create(createWishlistDto: CreateWishlistDto) {
    const wishlist = this.wishlistRepository.create(createWishlistDto);
    // TODO
    //wishlist.owner = await this.userRepository.findOneBy({ id: 1 });
    return this.wishlistRepository.save(wishlist).then((res) => {
      res.owner = null;
      return res;
    });
  }

  findAll() {
    return this.wishlistRepository.find({});
  }

  findOne(id: number) {
    return this.wishlistRepository.findOneBy({ id });
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistRepository
      .update({ id }, updateWishlistDto)
      .then(() => this.wishlistRepository.findOneBy({ id }));
  }

  remove(id: number) {
    return this.wishlistRepository.delete({ id });
  }
}
