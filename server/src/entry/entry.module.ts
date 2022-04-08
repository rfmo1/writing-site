import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';


import { EntryController } from './entry.controller';
import { EntrySchema } from './entry.model';
import { EntryService } from './entry.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Entry', schema: EntrySchema}]),
    ConfigModule, AuthModule
  ],
  controllers: [EntryController],
  providers: [EntryService]
})
export class EntryModule {}
