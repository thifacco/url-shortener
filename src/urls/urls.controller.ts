import { Controller, Get, Post, Body, Param, Patch, Res } from '@nestjs/common';
import { UrlsService } from './shared/urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecreateUrlDto } from './dto/recreate-url.dto';
import { DisableUrlDto } from './dto/disable-url.dto';
import { response } from 'express';

@Controller('urls')
export class UrlsController {

  constructor(
    private readonly urlsService: UrlsService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Encurtar link' })
  @ApiResponse({ status: 201, description: 'Url criada.' })
  @ApiResponse({ status: 400, description: 'Url inválida.' })
  @ApiResponse({ status: 400, description: 'Url já existe.' })
  @ApiResponse({ status: 400, description: 'Hash code já existe.' })
  @ApiTags('urls')
  async create(@Body() createUrlDto: CreateUrlDto, @Res() res) {
    return this.urlsService.create(createUrlDto, res);
  }

  @Post('recreate')
  @ApiOperation({ summary: 'Recriar link' })
  @ApiTags('urls')
  async recreate(@Body() recreateUrlDto: RecreateUrlDto) {
    return this.urlsService.recreate(recreateUrlDto);
  }

  @Get()
  @ApiTags('urls')
  findAll() {
    return this.urlsService.findAll();
  }

  @Get(':hashCode')
  @ApiTags('urls')
  findOne(@Param('hashCode') hashCode: string) {
    return this.urlsService.findByHashCode(hashCode);
  }

  @Patch('disable')
  @ApiResponse({ status: 200, description: 'Url desabilitada.' })
  @ApiResponse({ status: 404, description: 'Url não encontrada.' })
  @ApiTags('urls')
  disable(@Body() disableUrlDto: DisableUrlDto, @Res() res) {
    this.urlsService.disable(disableUrlDto, res);
  }
}
