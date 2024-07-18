import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  about: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
