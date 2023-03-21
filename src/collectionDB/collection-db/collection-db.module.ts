/*
 * @Author: DZR
 * @Date: 2023-03-18 15:06:30
 * @LastEditTime: 2023-03-18 15:46:51
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\collectionDB\collection-db\collection-db.module.ts
 */
import { Module } from "@nestjs/common"
import CollectionDbService from "./collection-db.service"

@Module({
  providers: [CollectionDbService],
  exports: [CollectionDbService]
})
export class CollectionDbModule {}
