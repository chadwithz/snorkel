import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { CreateFacebookDto } from './dto/create-facebook.dto';
import { UpdateFacebookDto } from './dto/update-facebook.dto';
import { CreateFacebookPostDto } from './dto/create-facebook-post/create-facebook-post.dto';
import { DeleteFacebookStatusDto } from './dto/delete-facebook-post/delete-facebook.dto';
import { ChangeFacebookProfilePicDto } from './dto/change-profile-pic/change-profile-pic.dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('facebook')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) { }

  @Post('post')
  post(@Body() createFacebookStatusPostDto: CreateFacebookPostDto) {
    return this.facebookService.postStatus(createFacebookStatusPostDto);
  }

  @Post('delete')
  deletePost(@Body() deleteFacebookPostDto: DeleteFacebookStatusDto) {
    return this.facebookService.deleteStatus(deleteFacebookPostDto);
  }

  @Post('profile-pic')
  @FormDataRequest()
  updateProfilePic(@Body() changeFacebookProfilePicDto: ChangeFacebookProfilePicDto) {
    return this.facebookService.changeProfilePic(changeFacebookProfilePicDto);
  }

  @Post()
  create(@Body() createFacebookDto: CreateFacebookDto) {
    return this.facebookService.create(createFacebookDto);
  }

  @Get()
  findAll() {
    return this.facebookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facebookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacebookDto: UpdateFacebookDto) {
    return this.facebookService.update(+id, updateFacebookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facebookService.remove(+id);
  }
}
