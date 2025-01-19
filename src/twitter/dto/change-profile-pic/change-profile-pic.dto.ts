import { HasMimeType, IsFile, MemoryStoredFile } from "nestjs-form-data";

export class ChangeTwitterProfileDto {
  @IsFile()
  @HasMimeType(['image/jpg', 'image/jpeg', 'image/png'])
  file: MemoryStoredFile;
}
