import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // TODO: hash password
    this.userRepository.update({ id }, updateUserDto).then(() => {
      return this.userRepository.findOneBy({ id });
    });
  }
}
