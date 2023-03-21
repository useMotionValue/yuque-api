import { IsNotEmpty, IsNumberString, IsString } from "class-validator"

export class addCommentsDto {
  @IsNotEmpty()
  @IsNumberString()
  articleId: number

  @IsNotEmpty()
  @IsString()
  comments: string

  @IsNotEmpty()
  @IsString()
  time: string
}
