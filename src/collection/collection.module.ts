/*
 * @Author: DZR
 * @Date: 2023-03-18 14:45:16
 * @LastEditTime: 2023-03-20 23:14:00
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\collection\collection.module.ts
 */
import { Module } from "@nestjs/common"
import { CollectionService } from "./collection.service"
import { CollectionController } from "./collection.controller"
import { CollectionDbModule } from "src/collectionDB/collection-db/collection-db.module"
import { ArticleDbModule } from "src/article-db/article-db.module"
import { PersonalMsgModule } from "src/personal-msg/personal-msg.module"
import PersonalMsgDbService from "src/personalMsgDB/personal-msg-db/personal-msg-db.service"

@Module({
  imports: [CollectionDbModule, ArticleDbModule, PersonalMsgModule],
  controllers: [CollectionController],
  providers: [CollectionService, PersonalMsgDbService],
  exports: [CollectionService]
})
export class CollectionModule {}
