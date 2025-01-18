import { IsEnum, IsString } from "class-validator";
import { Visibility } from "src/facebook/dto/create-facebook-post/create-facebook-post.dto";

export class CreateTwitterPostDto {
  @IsString()
  content: string;

  @IsEnum(Visibility)
  visibility: Visibility;
}
