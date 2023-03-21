/*
 * @Author: DZR
 * @Date: 2023-03-18 14:45:16
 * @LastEditTime: 2023-03-20 16:51:35
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\collection\collection.controller.ts
 */
import { Controller, Get, Post, Param, Delete, UseGuards, Headers } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { CollectionService } from "./collection.service"

@Controller("/collection") //收藏路径
@UseGuards(AuthGuard("jwt")) //鉴权
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}
  //Post：根据articleId收藏
  @Post(":articleId")
  async addCollection(
    @Param("articleId") articleId: number,
    @Headers() headers: Record<string, string>
  ) {
    return this.collectionService.addCollection(
      { articleId: Math.floor(Number(articleId)) },
      headers
    )
  }
  //Get：获取所有收藏的文章articleId
  @Get()
  async getCollections(@Headers() headers: Record<string, string>) {
    return this.collectionService.getCollections(headers)
  }

  //Delete：根据articleId取消收藏
  @Delete(":articleId")
  async removeCollection(
    @Param("articleId") articleId: number,
    @Headers() headers: Record<string, string>
  ) {
    return this.collectionService.removeCollection(Math.floor(Number(articleId)), headers)
  }
}
