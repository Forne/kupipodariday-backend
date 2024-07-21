import { ApiProperty } from '@nestjs/swagger';
import { Offer } from '../../offers/entities/offer.entity';
import { OmitType } from '@nestjs/mapped-types';
import { CoreEntity } from '../../../common/entities/core.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { IsUrl, Length } from 'class-validator';

@Entity('wishes')
export class Wish extends CoreEntity {
  @ApiProperty()
  @Length(1, 250)
  @Column()
  name: string;

  @ApiProperty()
  @IsUrl()
  @Column()
  link: string;

  @ApiProperty()
  @IsUrl()
  @Column()
  image: string;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @Column({
    default: 0,
  })
  raised: number;

  @ApiProperty()
  @Column({
    default: 0,
  })
  copied: number;

  @ApiProperty()
  @Length(1, 1024)
  @Column()
  description: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User; // ManyToOne

  @ApiProperty()
  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[]; // OneToMany
}

export class WishPartial extends OmitType(Wish, ['owner', 'offers']) {}
