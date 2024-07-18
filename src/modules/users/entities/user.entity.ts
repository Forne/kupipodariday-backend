import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from '../../../common/entities/core.entity';
import { Column, Entity } from 'typeorm';
import { IsEmail, IsUrl, Length } from 'class-validator';

@Entity('users')
export class User extends CoreEntity {
  @ApiProperty()
  @Length(2, 30)
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Length(0, 200)
  @Column({ unique: true })
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
}
