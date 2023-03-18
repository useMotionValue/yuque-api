/*
 * @Author: DZR
 * @Date: 2023-03-18 14:45:16
 * @LastEditTime: 2023-03-18 18:49:38
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\collection\collection.module.ts
 */
import { Module } from "@nestjs/common"
import { CollectionService } from "./collection.service"
import { CollectionController } from "./collection.controller"
import { CollectionDbModule } from "src/collectionDB/collection-db/collection-db.module"
import { ArticleDbModule } from "src/article-db/article-db.module"

@Module({
  imports: [CollectionDbModule, ArticleDbModule],
  controllers: [CollectionController],
  providers: [CollectionService],
  exports: [CollectionService]
})
export class CollectionModule {}
