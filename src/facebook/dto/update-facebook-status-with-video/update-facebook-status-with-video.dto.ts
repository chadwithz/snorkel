import { HasMimeType, IsFile, MemoryStoredFile } from "nestjs-form-data";
import { Visibility } from "../create-facebook-post/create-facebook-post.dto";
import { IsEnum, IsString } from "class-validator";

export class UpdateFacebookStatusWithVideoDto {
  @IsFile()
  @HasMimeType(['video/mp4', 'video/mkv'])
  file: MemoryStoredFile;

  @IsEnum(Visibility)
  visibility: Visibility;

  @IsString()
  text: string;
}
