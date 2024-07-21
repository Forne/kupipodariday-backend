import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from '../../../common/entities/core.entity';
import { IsUrl, Length } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity('wishlists')
export class Wishlist extends CoreEntity {
  @ApiProperty()
  @Length(1, 250)
  name: string;

  @ApiProperty()
  @Length(0, 1500)
  description: string;

  @ApiProperty()
  @IsUrl()
  image: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @ApiProperty()
  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];
}
