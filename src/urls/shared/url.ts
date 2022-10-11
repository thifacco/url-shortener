import * as moment from 'moment';
import { customAlphabet } from 'nanoid';
import { 
  HASH_CODE_CUSTOM_ALPHABET, 
  HASH_CODE_SIZE, 
  HASH_CODE_VALIDATE_DAYS 
} from '../config/url.config';

const nanoid = customAlphabet(HASH_CODE_CUSTOM_ALPHABET, HASH_CODE_SIZE);

export class Url {

  constructor() {
    this.originalUrl = '';
    this.hashCode = nanoid();
    this.active = true;
    this.expirationDate = moment().add({ 
      days: HASH_CODE_VALIDATE_DAYS 
    }).toString();
    this.count = 0;
  }
  
  originalUrl: string;
  hashCode: string;
  active: boolean;
  expirationDate: String;
  count: number;
}