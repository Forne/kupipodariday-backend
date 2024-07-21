import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from '../../../common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IsEmail, IsUrl, Length } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User extends CoreEntity {
  @ApiProperty()
  @Length(2, 30)
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Exclude()
  @Column()
  password: string;

  @ApiProperty()
  @Length(0, 200)
  @Column()
  about: string;

  @ApiProperty()
  @IsUrl()
  @Column()
  avatar: string;

  @ApiProperty()
  @IsEmail()
  @Column({
    unique: true,
  })
  email: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: User[];

  @ApiProperty()
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @ApiProperty()
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
