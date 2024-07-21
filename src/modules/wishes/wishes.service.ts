import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { UsersService } from '../users/users.service';
import { JwtPayloadDto } from '../auth/dto/jwt-payload';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    private userService: UsersService,
  ) {}

  async create(createWishDto: CreateWishDto, owner: JwtPayloadDto) {
    const wish = this.wishRepository.create(createWishDto);
    wish.owner = await this.userService.findOne(owner.id);
    return this.wishRepository.save(wish).then((res) => {
      res.owner = null;
      return res;
    });
  }

  findLast() {
    return this.wishRepository.find({
      order: { created_at: 'DESC' },
      take: 40,
      cache: 60000,
    });
  }

  findTop() {
    return this.wishRepository.find({
      order: { copied: 'ASC' },
      take: 20,
      cache: 60000,
    });
  }

  findOne(id: number) {
    return this.wishRepository.findOneBy({ id });
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    this.wishRepository.update({ id }, updateWishDto).then(() => {
      return this.wishRepository.findOneBy({ id });
    });
  }

  remove(id: number) {
    return `This action removes a #${id} wish`;
  }
}
