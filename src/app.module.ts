import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacebookModule } from './facebook/facebook.module';
import { TwitterModule } from './twitter/twitter.module';
import { InstagramModule } from './instagram/instagram.module';
import { validate } from './utils/envValidation'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      cache: true,
    }),
    FacebookModule,
    TwitterModule,
    InstagramModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
