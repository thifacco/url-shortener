import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlSchema } from './schemas/url.schema';
import { UrlsService } from './shared/urls.service';
import { UrlsController } from './urls.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Url', schema: UrlSchema}])
  ],
  controllers: [UrlsController],
  providers: [UrlsService]
})
export class UrlsModule {}
