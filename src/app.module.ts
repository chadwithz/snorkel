import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacebookModule } from './facebook/facebook.module';
import { TwitterModule } from './twitter/twitter.module';
import { InstagramModule } from './instagram/instagram.module';

@Module({
  imports: [FacebookModule, TwitterModule, InstagramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
