import { ApiProperty } from '@nestjs/swagger';

export class FindUsersDto {
  @ApiProperty()
  query: string;
}
