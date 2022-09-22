import { Controller, Get, Post, Body, Param, Patch, Res } from '@nestjs/common';
import { UrlsService } from './shared/urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DisableUrlDto } from './dto/disable-url.dto';

@Controller('urls')
export class UrlsController {

  constructor(
    private readonly urlsService: UrlsService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Encurtar URL' })
  @ApiResponse({ status: 201, description: 'Url criada' })
  @ApiResponse({ status: 400, description: 'Url inválida. || Url já existe. || Hash code já existe.' })
  @ApiTags('urls')
  async create(@Body() createUrlDto: CreateUrlDto, @Res() res) {
    return this.urlsService.create(createUrlDto, res);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas URLs' })
  @ApiResponse({ status: 200, description: 'Sucesso.' })
  @ApiResponse({ status: 500, description: 'Ocorreu um erro.' })
  @ApiTags('urls')
  findAll() {
    return this.urlsService.findAll();
  }

  @Get(':hashCode')
  @ApiOperation({ summary: 'Buscar URL por Hash Code' })
  @ApiResponse({ status: 404, description: 'Url não encontrada.' })
  @ApiTags('urls')
  findOne(@Param('hashCode') hashCode: string, @Res() res) {
    return this.urlsService.findByHashCode(hashCode, res);
  }

  @Patch('disable')
  @ApiOperation({ summary: 'Desabilitar URL' })
  @ApiResponse({ status: 200, description: 'Url desabilitada.' })
  @ApiResponse({ status: 404, description: 'Url não encontrada.' })
  @ApiTags('urls')
  disable(@Body() disableUrlDto: DisableUrlDto, @Res() res) {
    this.urlsService.disable(disableUrlDto, res);
  }
}
