import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUrlDto } from '../dto/create-url.dto';
import { Url } from './url';
import * as validUrl from 'valid-url';
import { DisableUrlDto } from '../dto/disable-url.dto';
import * as moment from 'moment';

@Injectable()
export class UrlsService {

  constructor(
    @InjectModel('Url') private readonly urlModel: Model<Url>
  ) { }

  async findAll() {
    try {
      return await this.urlModel.find().select({ 
        originalUrl: 1, 
        hashCode: 1, 
        active: 1, 
        _id: 0 
      }).exec();
    } catch {
      throw new HttpException('Ocorreu um erro.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByHashCode(hashCode: string) {
    try {
      return await this.urlModel.find({
        hashCode: hashCode,
        expirationDate: { $gte: moment().toString() }
      })
      .select({
        originalUrl: 1, 
        hashCode: 1, 
        active: 1, 
        expirationDate: 1,
        _id: 0
      })
      .exec() || null;
    } catch {
      throw new HttpException('Não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async create(createUrlDto: CreateUrlDto, @Res() res) {
    if (!validUrl.isUri(createUrlDto.originalUrl)) {
      throw new HttpException('Url inválida', HttpStatus.BAD_REQUEST);
    }

    const checkUrlExistsAndActive = await this.urlModel.find({
      originalUrl: createUrlDto.originalUrl,
      expirationDate: { $gte: moment().toString() }
    });
    if (checkUrlExistsAndActive.length > 0) {
      throw new HttpException('Url já existe', HttpStatus.BAD_REQUEST);
    }

    const newUrl = new Url();
    newUrl.originalUrl = createUrlDto.originalUrl;

    const createdShortUrl = new this.urlModel(newUrl);

    try {
      await createdShortUrl.save();
    } catch {
      throw new HttpException('Hash code já existe', HttpStatus.BAD_REQUEST);
    }

    res.status(HttpStatus.CREATED).json(newUrl);
  }

  async disable(disableUrlDto: DisableUrlDto, @Res() res) {
    try {
      const disableUrl = await this.urlModel.findOneAndUpdate({
        hashCode: disableUrlDto.hashCode
      }, {
        expirationDate: moment().toString(),
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
