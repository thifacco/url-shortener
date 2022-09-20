import { BadRequestException, Injectable, Param } from '@nestjs/common';
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
    return await this.urlModel.findById(id).exec();
  }

  async create(createUrlDto: CreateUrlDto) {

    try {
      if (this.checkLongUrlExists(createUrlDto.longUrl)) {
        throw new BadRequestException('Long URL already exists');
      }
      
      const hashCode = nanoid();
      if (this.checkUrlCodeExists(hashCode)) {
        throw new BadRequestException('Code already exists');
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

  async checkLongUrlExists(@Param('longUrl') pLongUrl: string) {
    const longUrlExists = await this.urlModel.find({ longUrl: pLongUrl }).exec();
    console.log(longUrlExists);
    return longUrlExists.length > 0 ? true : false;
  }

  async checkUrlCodeExists(@Param('hashCode') pHashCode: string) {
    const urlExists = await this.urlModel.findOne({ urlCode: pHashCode }).exec();
    return urlExists ? true : false;
  }

  async checkUrlActive() {

  }

  async disableUrl() {

  }
}
