import * as moment from 'moment';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwyxz', 5);

export class Url {

  constructor() {
    this.longUrl = '';
    this.hashCode = nanoid();
    this.active = true;
    this.expirationDate = moment().add({ days: 7 }).toString()
  }
  
  longUrl: string;
  hashCode: string;
  active: boolean;
  expirationDate: String;
}