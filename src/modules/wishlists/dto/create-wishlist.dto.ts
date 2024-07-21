import { ApiProperty } from '@nestjs/swagger';

export class CreateWishlistDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  itemsId: number[];
}
