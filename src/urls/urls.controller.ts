import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UrlsService } from './shared/urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecreateUrlDto } from './dto/recreate-url.dto';

@Controller('urls')
export class UrlsController {

  constructor(
    private readonly urlsService: UrlsService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Encurtar link' })
  @ApiResponse({ status: 201, description: 'Link created.' })
  @ApiResponse({ status: 400, description: 'Link já existe.' })
  @ApiTags('urls')
  async create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlsService.create(createUrlDto);
  }

  @Post()
  @ApiOperation({ summary: 'Recriar link' })
  @ApiResponse({ status: 201, description: 'Link created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
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
}
