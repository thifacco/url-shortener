import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DisableUrlDto {

  @ApiProperty()
  @IsString()
  readonly hashCode: string;
}
