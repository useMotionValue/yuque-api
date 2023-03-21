/*
 * @Author: DZR
 * @Date: 2023-03-17 15:08:31
 * @LastEditTime: 2023-03-21 19:08:14
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
import singleArticleVo from "./vo/singleArticleVo"

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
    this.result = Result.success(new ArticleVo(ListData))
    return this.result
  }

  async getArticleById(articleId: number) {
    //通过articleId来获取指定文章
    const dataList: Array<Article> = await this.ArticleDbService.dbService.getAll(
      this.COLLECTION_NAME
    )
    const length = dataList.length
    if (articleId < 0 || articleId > length - 1) {
      //如果文章articleId不合法，抛出错误
      this.result = Result.successWithCustomCode(statusCodeEnum.BAD_REQUEST, "articleId有误！")
      return this.result
    }
    //通过articleId去数据库中获取对应文章
    const data: Article = await this.ArticleDbService.dbService.getByOption(this.COLLECTION_NAME, {
      articleId: Math.floor(Number(articleId))
    })
    this.result = Result.success(new singleArticleVo(data))
    return this.result
  }
}
