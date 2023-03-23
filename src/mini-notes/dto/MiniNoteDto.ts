/*
 * @Author: DZR
 * @Date: 2023-03-20 17:27:29
 * @LastEditTime: 2023-03-23 16:31:23
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\mini-notes\dto\MiniNoteDto.ts
 */
import { IsNotEmpty, IsNumberString, IsString } from "class-validator"

//新增小记时需要的参数
export class MiniNoteDto {
  //小记内容
  @IsNotEmpty()
  @IsString()
  content: string

  //创建时间   格式：xx-xx xx:xx 月-日 时间
  @IsNotEmpty()
  @IsString()
  createTime: string

  //小记的Id：这里规定为number类型，需保证唯一
  @IsNotEmpty()
  @IsNumberString()
  notesId: number

  @IsString()
  tag: string
}
