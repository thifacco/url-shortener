import { IsString } from 'class-validator';

export class CreateUrlDto {

  @IsString()
  readonly longUrl: string;
}
