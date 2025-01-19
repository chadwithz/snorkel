import { IsString } from "class-validator";

export class DeleteTwitterPostDto {
  @IsString()
  id: string;
}
