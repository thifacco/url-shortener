import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUrlDto } from '../dto/create-url.dto';
import { Url } from './url';
import { nanoid } from 'nanoid'

@Injectable()
export class UrlsService {
  
  constructor(
    @InjectModel('Url') private readonly urlModel: Model<Url>
  ) {}

  async create(createUrlDto: CreateUrlDto) {

    const hashCode = nanoid();

    const urlObj: Url = {
      longUrl: createUrlDto.url,
      urlCode: hashCode,
      shortUrl: process.env.URL_APP + hashCode,
      active: true,
      expirationDate: new Date()
    }

    const createdShortUrl = new this.urlModel(urlObj);
    await createdShortUrl.save();

    return 'This action adds a new url';
  }

  async findAll() {
    return await this.urlModel.find().exec();
  }

  async findOne(id: string) {
    return await this.urlModel.findById(id).exec();
  }
}
