import { ApiProperty } from '@nestjs/swagger';

export class UserPublicProfileResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  about: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
