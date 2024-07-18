import { ApiProperty } from '@nestjs/swagger';

export class SigninUserResponseDto {
  @ApiProperty()
  accessToken: string;
}
