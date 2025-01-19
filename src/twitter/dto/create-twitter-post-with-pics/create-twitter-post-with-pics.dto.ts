import { IsEnum, IsString } from "class-validator";
import { HasMimeType, IsFile, MemoryStoredFile } from "nestjs-form-data";
import { Visibility } from "src/facebook/dto/create-facebook-post/create-facebook-post.dto";

export class CreateTwitterPostWithMediaDto {
  @IsString()
  content: string;

  @IsEnum(Visibility)
  visibility: Visibility;

  @IsFile()
  @HasMimeType(['image/jpg', 'image/jpeg', 'image/png', 'image/gif'])
  file: MemoryStoredFile;
}

