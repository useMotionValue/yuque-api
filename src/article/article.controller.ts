/*
 * @Author: DZR
 * @Date: 2023-03-17 15:08:31
 * @LastEditTime: 2023-03-19 15:18:24
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\article\article.controller.ts
 */
import { Controller, Get, Param, Body } from "@nestjs/common"
import { ArticleService } from "./article.service"

@Controller("/article")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get("search/:articleId")
  async getArticleById(@Param("articleId") articleId: number) {
    return this.articleService.getArticleById(articleId)
  }

  @Get(":quantity")
  async getArticles(@Param("quantity") quantity: number) {
    return this.articleService.getArticles(Math.floor(Number(quantity)))
  }
}
