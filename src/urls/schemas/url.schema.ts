import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UrlDocument = Url & Document & any;

@Schema({ collection: 'urls' })
export class Url extends Document {
  _id: String;

  @Prop({ required: true })
  originalUrl: String;

  @Prop({ required: true, unique: true })
  hashCode: String;

  @Prop({ type: Boolean, default: true })
  active: Boolean;

  @Prop({ type: Date })
  expirationDate: Date;

  @Prop({ type: Date, default: Date.now() })
  createDate: Date;
}

export const UrlSchema = SchemaFactory.createForClass(Url);