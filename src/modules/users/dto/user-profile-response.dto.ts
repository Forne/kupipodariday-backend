import { Expose, Type } from 'class-transformer';
import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { WishResponseDto } from '../../wishes/dto/wish-response.dto';

export class UserProfileResponseDto extends PickType(User, [
  'id',
  'username',
  'about',
  'avatar',
  'email',
  'createdAt',
  'updatedAt',
]) {
  @Expose()
  email: string;
}
