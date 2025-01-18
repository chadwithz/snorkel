import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { CreateTwitterDto } from './dto/create-twitter.dto';
import { UpdateTwitterDto } from './dto/update-twitter.dto';
import { CreateTwitterPostDto } from './dto/create-twitter-post-dto/create-twitter-post-response.dto';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) { }

  @Post()
  getDms(@Body() getDmsDto: GetDmsDto) {
    return this.twitterService.getDms();
  }

  @Post()
  post(@Body() createPostDto: CreateTwitterPostDto) {
    return this.twitterService.createPost(createPostDto);
  }

  @Post()
  create(@Body() createTwitterDto: CreateTwitterDto) {
    return this.twitterService.create(createTwitterDto);
  }

  @Get()
  findAll() {
    return this.twitterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.twitterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTwitterDto: UpdateTwitterDto) {
    return this.twitterService.update(+id, updateTwitterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.twitterService.remove(+id);
  }
}
