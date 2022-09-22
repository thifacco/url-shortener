import { ApiProperty } from "@nestjs/swagger";
import * as moment from 'moment';

export class Url {

  constructor() {
    this.longUrl = '';
    this.hashCode = '';
    this.active = true;
    this.expirationDate = moment().add({ days: 7 }).toString()
  }
  
  @ApiProperty()
  longUrl: string;

  @ApiProperty()
  hashCode: string;
  
  @ApiProperty()
  active: boolean;

  @ApiProperty()
  expirationDate: String;
}