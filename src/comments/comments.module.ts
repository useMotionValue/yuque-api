/*
 * @Author: DZR
 * @Date: 2023-03-21 16:13:02
 * @LastEditTime: 2023-03-21 16:53:21
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\comments\comments.module.ts
 */
import { Module } from "@nestjs/common"
import { CommentsService } from "./comments.service"
import { CommentsController } from "./comments.controller"
import { CommentsDbService } from "src/commentsDB/comments-db/comments-db.service"
import PersonalMsgDbService from "src/personalMsgDB/personal-msg-db/personal-msg-db.service"

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentsDbService, PersonalMsgDbService]
})
export class CommentsModule {}
