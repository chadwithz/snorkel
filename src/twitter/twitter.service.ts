import { Injectable } from '@nestjs/common';

import { CreateTwitterDto } from './dto/create-twitter.dto';
import { UpdateTwitterDto } from './dto/update-twitter.dto';
import { getCookieFromFile } from 'src/utils/cookies';
import { callPythonFunction } from 'src/utils/pybridge';
import * as path from 'node:path';
import { parseCookieString } from './common/utils/cookies';
import { CreateTwitterPostDto } from './dto/create-twitter-post-dto/create-twitter-post-response.dto';

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

  async getDms() {
    const cookies = getCookieFromFile("twitter-cookies");
    const parsed = parseCookieString(cookies);
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

  async createPost(createPostDto: CreateTwitterPostDto) {
    const cookiePath = process.env.TW_COOKIES_PATH;
    const cookie = getCookieFromFile(cookiePath);
    const parsed = parseCookieString(cookie);
    const scriptPath = path.resolve("src/twitter" + "/script.py");

    const content = createPostDto.content;
    const visibility = createPostDto.visibility;

    let result: any;
    try {
      const res = await callPythonFunction(scriptPath, 'post_text', { content, cookie: parsed });
      result = res;
    } catch (error) {
      result = "Something went wrong";
      console.error('Error: ', error);
    }
    return result;
  }
}
