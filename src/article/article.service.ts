/*
 * @Author: DZR
 * @Date: 2023-03-17 15:08:31
 * @LastEditTime: 2023-03-18 10:02:11
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \yuque-api\src\article\article.service.ts
 */
import { Injectable } from "@nestjs/common"
import { Result, statusCodeEnum } from "src/config/resultType"
import Article from "./pojo/Article"
import ArticleDbService from "src/article-db/article-db.service"
import { COLLECTION_NAME_ENUM } from "src/app.module"

@Injectable()
export class ArticleService {
  private readonly COLLECTION_NAME = COLLECTION_NAME_ENUM.ARTICLES
  private result: Result

  constructor(private readonly ArticleDbService: ArticleDbService) {}

  async getArticles(quantity: number, headers: Record<string, string>): Promise<Result> {
    const Quantity = Math.floor(Number(quantity))
    if (Quantity < 1 || Quantity > 10) {
      this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "quantity必须在1~10之间!")
      return this.result
    }

    const ListData: Article = await this.ArticleDbService.dbService.getSpecifiedQuatity(
      this.COLLECTION_NAME,
      Quantity
    )
    console.log(JSON.stringify(ListData))
    this.result = Result.success(ListData)
    console.log("请求成功!")
    return this.result
  }
}
