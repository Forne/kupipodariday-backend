import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { CoreEntity } from '../../../common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('offers')
export class Offer extends CoreEntity {
  @ApiProperty()
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish; // ManyToOne

  @ApiProperty()
  @Column()
  amount: number;

  @ApiProperty()
  @Column()
  hidden: boolean;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.offers)
  user: User; // ManyToOne
}
