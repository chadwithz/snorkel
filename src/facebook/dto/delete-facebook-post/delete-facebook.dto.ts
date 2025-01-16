import { IsString } from "class-validator";

export class DeleteFacebookStatusDto {
  @IsString()
  story_id: string;
}
