import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUrlDto {

  @ApiProperty()
  @IsString()
  readonly originalUrl: string;
}
