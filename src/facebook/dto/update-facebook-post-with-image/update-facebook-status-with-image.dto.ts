import { IsEnum, IsString } from "class-validator";
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from "nestjs-form-data";
import { Visibility } from "../create-facebook-post/create-facebook-post.dto";

export class UpdateFacebookStatusWithImageDto {
  @IsFile()
  @MaxFileSize(1000000)
  @HasMimeType(['image/jpeg', 'image/png'])
  file: MemoryStoredFile;

  @IsString()
  text: string;

  @IsEnum(Visibility)
  visibility: Visibility;
}
