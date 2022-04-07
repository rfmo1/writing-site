import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntryModule } from './entry/entry.module';

@Module({
  imports: [EntryModule, MongooseModule.forRoot('mongodb+srv://rfmo:***REMOVED***@cluster0.ydk7d.mongodb.net/writing-blog?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
