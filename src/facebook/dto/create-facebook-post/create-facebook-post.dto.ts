import { IsEnum, IsString, } from 'class-validator';

export enum Visibility {
  PUBLIC = 'public',
  FRIENDS = 'friends',
  ONLY_ME = 'only-me',
}

export class CreateFacebookPostDto {
  @IsString()
  content: string;

  @IsEnum(Visibility)
  visibility: Visibility;
}
