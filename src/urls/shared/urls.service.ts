import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUrlDto } from '../dto/create-url.dto';
import { Url } from './url';
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwyxz', 5)

@Injectable()
export class UrlsService {
  
  constructor(
    @InjectModel('Url') private readonly urlModel: Model<Url>
  ) {}

  async findAll() {
    return await this.urlModel.find().exec();
  }

  async findOne(id: string) {
    return await this.urlModel.findById(id).exec();
  }

  async create(createUrlDto: CreateUrlDto) {

    const hashCode = nanoid();

    const newUrl: Url = {
      longUrl: createUrlDto.longUrl,
      urlCode: hashCode,
      shortUrl: process.env.URL_APP + hashCode,
      active: true,
      expirationDate: new Date()
    }

    const createdShortUrl = new this.urlModel(newUrl);
    await createdShortUrl.save();

    return 'This action adds a new url';
  }
}
