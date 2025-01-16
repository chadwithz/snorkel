import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from "nestjs-form-data";

export class ChangeFacebookProfilePicDto {
  @IsFile()
  @MaxFileSize(1000000)
  @HasMimeType(['image/jpeg', 'image/png'])
  file: MemoryStoredFile;
}

