import { ApiProperty } from "@nestjs/swagger";
import * as moment from 'moment';

export class Url {

  constructor() {
    this.longUrl = '';
    this.hashCode = '';
    this.active = true;
    this.expirationDate = moment().add({ days: 7 }).toString()
  }
  
  @ApiProperty({ 
    example: 'https://twitter.com', 
    description: 'O link que será encurtado'
  })
  longUrl: string;

  @ApiProperty({ 
    example: 'xqls2', 
    description: 'O hash que será gerado'
  })
  hashCode: string;
  
  @ApiProperty({ 
    example: 'true', 
    description: 'Status da URL encurtada'
  })
  active: boolean;

  @ApiProperty({ 
    example: '2022-09-27T04:49:18.000Z', 
    description: 'Data de expiração da URL'
  })
  expirationDate: String;
}