import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUrlDto } from '../dto/create-url.dto';
import { Url } from './url';
import { customAlphabet } from 'nanoid';
import { RecreateUrlDto } from '../dto/recreate-url.dto';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwyxz', 5);

@Injectable()
export class UrlsService {

  constructor(
    @InjectModel('Url') private readonly urlModel: Model<Url>
  ) { }

  async findAll() {
    return await this.urlModel.find().exec();
  }

  async findByHashCode(hashCode: string) {
    try {
      return await this.urlModel.findOne({ hashCode: hashCode }).exec();
    } catch {
      throw new HttpException('Não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  private async findByLongUrl(longUrl: string) {
    try {
      return this.urlModel.find({ longUrl: longUrl }).exec() || null;
    }
    catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(createUrlDto: CreateUrlDto) {
    const checkUrlExists = await this.findByLongUrl(createUrlDto.longUrl);
    if (checkUrlExists.length > 0) {
      throw new HttpException('Url já existe', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const hashCode = nanoid();

    const newUrl = new Url();
    newUrl.longUrl = createUrlDto.longUrl;
    newUrl.hashCode = hashCode;

    const createdShortUrl = new this.urlModel(newUrl);

    try {
      await createdShortUrl.save();
    } catch (e) {
      throw new HttpException('Hash code já existe', HttpStatus.BAD_REQUEST);
    }

    return newUrl;
  }

  async recreate(recreateUrlDto: RecreateUrlDto) { }
}
