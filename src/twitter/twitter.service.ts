import { Injectable } from '@nestjs/common';

import { CreateTwitterDto } from './dto/create-twitter.dto';
import { UpdateTwitterDto } from './dto/update-twitter.dto';
import { getCookieFromFile } from 'src/utils/cookies';
import { callPythonFunction } from 'src/utils/pybridge';
import * as path from 'node:path';
import { parseCookieString } from './common/utils/cookies';
import { CreateTwitterPostWithMediaDto } from './dto/create-twitter-post-with-pics/create-twitter-post-with-pics.dto';
import { CreateTwitterPostDto } from './dto/create-twitter-post-dto/create-twitter-post.dto';
import { DeleteTwitterPostDto } from './dto/delete-twitter-post/delete-twitter-post.dto';
import { ChangeTwitterProfileDto } from './dto/change-profile-pic/change-profile-pic.dto';
import { GetTwitterDms } from './dto/get-dms/get-dms-dto';

@Injectable()
export class TwitterService {
  create(createTwitterDto: CreateTwitterDto) {
    return 'This action adds a new twitter';
  }

  findAll() {
    return `This action returns all twitter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} twitter`;
  }

  update(id: number, updateTwitterDto: UpdateTwitterDto) {
    return `This action updates a #${id} twitter`;
  }

  remove(id: number) {
    return `This action removes a #${id} twitter`;
  }

  async getDms(getDms: GetTwitterDms) {
    const cookies = getCookieFromFile("twitter-cookies");
    const parsed = parseCookieString(cookies).toString();
    const scriptPath = path.resolve("src/twitter") + "/script.py";

    let result: any;
    try {
      const dms = await callPythonFunction(scriptPath, 'get_dms', { cookies: parsed });
      result = dms;
    } catch (error) {
      result = "Something went wrong";
      console.error('Error:', error);
    }
    return result;
  }

  async createTextPost(createPostDto: CreateTwitterPostDto) {
    const cookiePath = process.env.TW_COOKIES_PATH;
    const cookie = getCookieFromFile(cookiePath);
    const parsed = parseCookieString(cookie).toString();
    const scriptPath = path.resolve("src/twitter" + "/script.py");

    const content = createPostDto.content;
    const visibility = createPostDto.visibility;

    let result: any;
    try {
      const res = await callPythonFunction(scriptPath, 'post_text', { content, cookies: parsed });
      result = res;
    } catch (error) {
      result = "Something went wrong";
      console.error('Error: ', error);
    }
    return result;
  }

  async createPostWithMedia(createPostWithMedia: CreateTwitterPostWithMediaDto) {
    const cookiePath = process.env.TW_COOKIES_PATH;
    const cookie = getCookieFromFile(cookiePath);
    const parsed = parseCookieString(cookie).toString();

    const { content, file, visibility } = createPostWithMedia;

    const scriptPath = path.resolve("src/twitter") + "/script.py";

    let result: any;
    try {
      const res = await callPythonFunction(scriptPath, 'post_media', { content, media: file, cookies: parsed });
      result = res;
    } catch (error) {
      result = "Something went wrong";
      console.log(error);
    }
    return result;
  }

  async deletePost(deletePostDto: DeleteTwitterPostDto) {
    const cookiePath = process.env.TW_COOKIES_PATH;
    const cookie = getCookieFromFile(cookiePath);
    const parsed = parseCookieString(cookie).toString();
    const scriptPath = path.resolve("src/twitter") + "/script.py";

    const { id } = deletePostDto;
    let result: any;
    try {
      const res = await callPythonFunction(scriptPath, 'delete_post', { id, cookies: parsed });
      result = res;
    } catch (error) {
      result = "Something went wrong!";
      console.log(error);
    }
    return result;
  }

  async changeProfilePic(changeProfilePicDto: ChangeTwitterProfileDto) {
    const cookiePath = process.env.TW_COOKIES_PATH;
    const cookie = getCookieFromFile(cookiePath);
    const parsed = parseCookieString(cookie).toString();
    const scriptPath = path.resolve("src/twitter") + "/script.py";

    const { file } = changeProfilePicDto;
    let result: any;
    try {
      const res = await callPythonFunction(scriptPath, 'change_profile_pic', { pic: file, cookies: parsed });
      result = res;
    } catch (error) {
      result = "Something went wrong";
      console.error(error);
    }
  }
}
