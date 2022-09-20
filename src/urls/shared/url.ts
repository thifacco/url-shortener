import { ApiProperty } from "@nestjs/swagger";

export class Url {
  
  @ApiProperty({ 
    example: 'https://twitter.com', 
    description: 'O link que será encurtado'
  })
  longUrl: string;

  @ApiProperty({ 
    example: 'xqls2', 
    description: 'O hash que será gerado'
  })
  urlCode: string;
  
  @ApiProperty({ 
    example: `${process.env?.URL_APP}/xqls2`, 
    description: 'A URL encurtada que será gerada'
  })
  shortUrl: string;
  
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