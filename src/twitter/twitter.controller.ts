import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { CreateTwitterDto } from './dto/create-twitter.dto';
import { UpdateTwitterDto } from './dto/update-twitter.dto';
import { CreateTwitterPostWithMediaDto } from './dto/create-twitter-post-with-pics/create-twitter-post-with-pics.dto';
import { CreateTwitterPostDto } from './dto/create-twitter-post-dto/create-twitter-post.dto';
import { DeleteTwitterPostDto } from './dto/delete-twitter-post/delete-twitter-post.dto';
import { ChangeTwitterProfileDto } from './dto/change-profile-pic/change-profile-pic.dto';
import { GetTwitterDms } from './dto/get-dms/get-dms-dto';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) { }

  @Post('get-dms')
  getDms(@Body() getDmsDto: GetTwitterDms) {
    return this.twitterService.getDms(getDmsDto);
  }

  @Post('post')
  postText(@Body() createPostDto: CreateTwitterPostDto) {
    return this.twitterService.createTextPost(createPostDto);
  }

  @Post('post-media')
  postWithPics(@Body() createPosWithMediatDto: CreateTwitterPostWithMediaDto) {
    return this.twitterService.createPostWithMedia(createPosWithMediatDto);
  }

  @Post('change-profile')
  changeProfilePic(@Body() changeProfilePicDto: ChangeTwitterProfileDto) {
    return this.twitterService.changeProfilePic(changeProfilePicDto);
  }

  @Post('delete-post')
  deletePost(@Body() deletePostDto: DeleteTwitterPostDto) {
    return this.twitterService.deletePost(deletePostDto)
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
