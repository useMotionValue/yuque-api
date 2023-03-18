/*
 * @Author: DZR
 * @Date: 2023-03-17 16:15:36
 * @LastEditTime: 2023-03-17 20:11:43
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\article-db\article-db.module.ts
 */
import { Module } from "@nestjs/common"
import ArticleDbService from "./article-db.service"

@Module({
  providers: [ArticleDbService],
  exports: [ArticleDbService]
})
export class ArticleDbModule {}
