import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUrlDto } from '../dto/create-url.dto';
import { Url } from './url';
import * as validUrl from 'valid-url';
import { DisableUrlDto } from '../dto/disable-url.dto';
import * as moment from 'moment';
import { URL_EXCEPTION } from '../config/url.config';

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
        shortUrl: 1,
        active: 1, 
        expirationDate: 1, 
        _id: 0
      }).exec();
    } catch {
      throw new HttpException(URL_EXCEPTION.ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByHashCode(hashCode: string, @Res() res) {
    try {
      const url = await this.urlModel.findOne({
        hashCode: hashCode,
        active: true,
        expirationDate: { $gte: moment().toString() }
      });
      url.count += 1;
      url.save();
      
      res.status(HttpStatus.OK).json({
        hashCode: url.hashCode,
        redirectTo: url.originalUrl,
        count: url.count
      });
    } catch {
      throw new HttpException(URL_EXCEPTION.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  async create(createUrlDto: CreateUrlDto, @Res() res) {
    if (!validUrl.isUri(createUrlDto.originalUrl)) {
      throw new HttpException(URL_EXCEPTION.INVALID, HttpStatus.BAD_REQUEST);
    }

    const checkUrlExistsAndActive = await this.urlModel.find({
      originalUrl: createUrlDto.originalUrl,
      active: true,
      expirationDate: { $gte: moment().toString() }
    });
    if (checkUrlExistsAndActive.length > 0) {
      throw new HttpException(URL_EXCEPTION.EXISTS, HttpStatus.BAD_REQUEST);
    }

    const newUrl = new Url();
    newUrl.originalUrl = createUrlDto.originalUrl;

    const createdShortUrl = new this.urlModel(newUrl);

    try {
      await createdShortUrl.save();
    } catch {
      throw new HttpException(URL_EXCEPTION.HASH_CODE_EXISTS, HttpStatus.BAD_REQUEST);
    }

    res.status(HttpStatus.CREATED).json(newUrl);
  }

  async disable(disableUrlDto: DisableUrlDto, @Res() res) {
    try {
      await this.urlModel.findOneAndUpdate({
        hashCode: disableUrlDto.hashCode
      }, {
        expirationDate: moment().toString(),
        active: false
      }, {
        new: false
      });
    } catch {
      throw new HttpException(URL_EXCEPTION.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    res.status(HttpStatus.OK).json({ success: true });
  }
}
