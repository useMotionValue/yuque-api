/*
 * @Author: DZR
 * @Date: 2023-03-21 16:14:41
 * @LastEditTime: 2023-03-21 16:38:44
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\commentsDB\comments-db\comments-db.module.ts
 */
import { Module } from "@nestjs/common"
import { CommentsDbService } from "./comments-db.service"

@Module({
  providers: [CommentsDbService],
  exports: [CommentsDbService]
})
export class CommentsDbModule {}
