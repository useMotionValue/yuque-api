/*
 * @Author: DZR
 * @Date: 2023-03-17 15:08:31
 * @LastEditTime: 2023-03-17 20:19:05
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\article\article.controller.ts
 */
import { Controller, Get, Param, Headers } from "@nestjs/common"
import { ArticleService } from "./article.service"
// import { CreateArticleDto } from './dto/create-article.dto';
// import { UpdateArticleDto } from './dto/update-article.dto';

@Controller("/article")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get(":quantity")
  async getArticles(
    @Param("quantity") quantity: number,
    @Headers() headers: Record<string, string>
  ) {
    return this.articleService.getArticles(Math.floor(Number(quantity)), headers)
  }
}
