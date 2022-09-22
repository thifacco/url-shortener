import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUrlDto } from '../dto/create-url.dto';
import { Url } from './url';
import { customAlphabet } from 'nanoid';
import * as validUrl from 'valid-url';
import { DisableUrlDto } from '../dto/disable-url.dto';
import * as moment from 'moment';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwyxz', 5);

@Injectable()
export class UrlsService {

  constructor(
    @InjectModel('Url') private readonly urlModel: Model<Url>
  ) {
    console.log(moment().toString())
  }

  async findAll() {
    try {
      return await this.urlModel.find().exec();
    } catch {
      throw new HttpException('Ocorreu um erro.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByHashCode(hashCode: string) {
    try {
      return await this.urlModel.find({
        hashCode: hashCode,
        expirationDate: { $gte: moment().toString() }
      }).exec() || null;
    } catch {
      throw new HttpException('Não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  private async findByLongUrl(longUrl: string) {
    try {
      return await this.urlModel.find({
        longUrl: longUrl,
        expirationDate: { $gte: moment().toString() }
      }).exec() || null;
    }
    catch {
      throw new HttpException('Ocorreu um erro.', HttpStatus.INTERNAL_SERVER_ERROR);
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

    res.status(HttpStatus.CREATED).json(newUrl);
  }

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
        res.status(HttpStatus.OK).json({ success: true });
      }
    } catch {
      throw new HttpException('Url não encontrada', HttpStatus.NOT_FOUND);
    }
  }
}
