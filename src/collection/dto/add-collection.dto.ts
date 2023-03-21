/*
 * @Author: DZR
 * @Date: 2023-03-18 14:45:16
 * @LastEditTime: 2023-03-18 16:33:42
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\collection\dto\create-collection.dto.ts
 */
import { IsNotEmpty, IsNumberString } from "class-validator"
//添加收藏的请求参数
export class addCollectionDto {
  @IsNotEmpty()
  @IsNumberString()
  articleId: number
}
