import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RecreateUrlDto {

  @ApiProperty()
  @IsString()
  readonly longUrl: string;
}
