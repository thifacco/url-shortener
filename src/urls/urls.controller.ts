import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UrlsService } from './shared/urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('urls')
export class UrlsController {
  
  constructor(
    private readonly urlsService: UrlsService
  ) {}

  @ApiTags('urls')
  @Post()
  @ApiOperation({ summary: 'Encurtar link' })
  @ApiResponse({ status: 201, description: 'Created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  create(@Body() createUrlDto: CreateUrlDto, @Body() res) {
    return this.urlsService.create(createUrlDto);
  }
  
  @ApiTags('urls')
  @Get()
  findAll() {
    return this.urlsService.findAll();
  }

  @ApiTags('urls')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlsService.findOne(id);
  }
}
