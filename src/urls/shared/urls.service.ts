import { BadRequestException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUrlDto } from '../dto/create-url.dto';
import { Url } from './url';
import { customAlphabet } from 'nanoid';
import * as moment from 'moment';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwyxz', 5);

@Injectable()
export class UrlsService {

  constructor(
    @InjectModel('Url') private readonly urlModel: Model<Url>
  ) {
    console.log(moment().add({ days: 7 }));
  }

  async findAll() {
    return await this.urlModel.find().exec();
  }

  async findOne(id: string) {
    try {
      return await this.urlModel.findById(id).exec();
    } catch {
      throw new NotFoundException('ID não existe');
    }
  }

  async findByHashCode(hashCode: string) {
    try {
      return await this.urlModel.findOne({ urlCode: hashCode }).exec();
    } catch {
      throw new NotFoundException('HashCode já existe');
    }
  }

  async findByLongUrl(longUrl: string) {
    try {
      return await this.urlModel.findOne({ longUrl: longUrl }).exec();
    } catch {
      throw new NotFoundException('Long URL já existe');
    }
  }

  async checkUrlActive() {}

  async disableUrl() {}

  async create(createUrlDto: CreateUrlDto) {

    try {
      if (this.findByLongUrl(createUrlDto.longUrl)) {
        throw new BadRequestException('Long URL já existe');
      }

      const hashCode = nanoid();
      if (this.findByHashCode(hashCode)) {
        throw new BadRequestException('Hash Code já existe');
      }

      const newUrl: Url = {
        longUrl: createUrlDto.longUrl,
        urlCode: hashCode,
        shortUrl: process.env.URL_APP + hashCode,
        active: true,
        expirationDate: moment().add({ days: 7 }).toString()
      }

      const createdShortUrl = new this.urlModel(newUrl);
      await createdShortUrl.save();

      return newUrl;
    } catch {

    }
  }

  async recreate(createUrlDto: CreateUrlDto) {
    const hashCode = nanoid();
    if (this.findByHashCode(hashCode)) {
      throw new BadRequestException('Hash Code já existe');
    }


  }
}
