import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUrlDto } from '../dto/create-url.dto';
import { Url } from './url';
import { customAlphabet } from 'nanoid';
import { RecreateUrlDto } from '../dto/recreate-url.dto';
import * as validUrl from 'valid-url';
import { Http2ServerResponse } from 'http2';
import { DisableUrlDto } from '../dto/disable-url.dto';
import { json } from 'stream/consumers';
import { response } from 'express';

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

  async create(createUrlDto: CreateUrlDto, @Res() res) {
    if (!validUrl.isUri(createUrlDto.longUrl)) {
      throw new HttpException('Url inválida', HttpStatus.BAD_REQUEST);
    }

    const checkUrlExists = await this.findByLongUrl(createUrlDto.longUrl);
    if (checkUrlExists.length > 0) {
      throw new HttpException('Url já existe', HttpStatus.BAD_REQUEST);
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

    res.status(200).json(newUrl);
  }

  async recreate(recreateUrlDto: RecreateUrlDto) { }

  async disable(disableUrlDto: DisableUrlDto, @Res() res) {
    try {
      const disableUrl = await this.urlModel.findOneAndUpdate({
        _id: disableUrlDto.id
      }, {
        active: false
      }, {
        new: false
      }) || null;

      if (disableUrl) {
        res.status(200).json({ success: true });
      }
    } catch {
      throw new HttpException('Url não encontrada', HttpStatus.NOT_FOUND);
    }
  }
}
