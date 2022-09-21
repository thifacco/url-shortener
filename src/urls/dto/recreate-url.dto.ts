import { IsString } from 'class-validator';

export class RecreateUrlDto {

  @IsString()
  readonly longUrl: string;
}
