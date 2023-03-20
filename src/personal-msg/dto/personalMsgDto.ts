import { IsNotEmpty, IsNumberString, IsString } from "class-validator"
//创建个人信息的请求参数
export default class personalMsgDto {
  //昵称，传字符串
  @IsNotEmpty()
  @IsString()
  nickname: string

  //个性签名，传字符串
  @IsNotEmpty()
  @IsString()
  personalizedSignature: string
}
