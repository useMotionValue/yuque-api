/*
 * @Author: DZR
 * @Date: 2023-03-17 15:08:31
 * @LastEditTime: 2023-03-19 11:49:20
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\article\article.service.ts
 */
import { Injectable } from "@nestjs/common"
import { Result, statusCodeEnum } from "src/config/resultType"
import Article from "./pojo/Article"
import ArticleDbService from "src/article-db/article-db.service"
import { COLLECTION_NAME_ENUM } from "src/app.module"
import ArticleVo from "./vo/ArticleVo"

@Injectable()
export class ArticleService {
  private readonly COLLECTION_NAME = COLLECTION_NAME_ENUM.ARTICLES
  private result: Result

  constructor(private readonly ArticleDbService: ArticleDbService) {}

  async getArticles(quantity: number): Promise<Result> {
    if (!quantity) {
      this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "参数有误！")
      return this.result
    }
    const Quantity = Math.floor(Number(quantity))

    if (Quantity < 1 || Quantity > 10) {
      this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "quantity必须在1~10之间!")
      return this.result
    }

    const ListData: Array<Article> = await this.ArticleDbService.dbService.getSpecifiedQuatity(
      this.COLLECTION_NAME,
      Quantity
    )
    // console.log(JSON.stringify(ListData))
    this.result = Result.success(new ArticleVo(ListData))
    return this.result
  }

  async getArticleById(articleId: number) {
    const dataList: Array<Article> = await this.ArticleDbService.dbService.getAll(
      this.COLLECTION_NAME
    )
    const length = dataList.length
    if (articleId < 0 || articleId > length - 1) {
      this.result = Result.successWithCustomCode(statusCodeEnum.BAD_REQUEST, "articleId有误！")
      return this.result
    }
    const data = dataList[articleId]
    this.result = Result.success({ data: data })
    return this.result
  }
}
