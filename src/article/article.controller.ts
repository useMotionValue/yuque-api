/*
 * @Author: DZR
 * @Date: 2023-03-17 15:08:31
 * @LastEditTime: 2023-03-18 10:13:47
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \yuque-api\src\article\article.controller.ts
 */
import { Controller, Get, Param, Headers, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
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
