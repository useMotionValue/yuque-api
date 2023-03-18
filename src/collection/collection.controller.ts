/*
 * @Author: DZR
 * @Date: 2023-03-18 14:45:16
 * @LastEditTime: 2023-03-18 19:12:47
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\collection\collection.controller.ts
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers
} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { CollectionService } from "./collection.service"
import { addCollectionDto } from "./dto/add-collection.dto"
import { UpdateCollectionDto } from "./dto/update-collection.dto"

@Controller("/collection")
@UseGuards(AuthGuard("jwt"))
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post(":articleId")
  @UseGuards(AuthGuard("jwt"))
  async addCollection(
    @Param("articleId") articleId: number,
    @Headers() headers: Record<string, string>
  ) {
    return this.collectionService.addCollection(
      { articleId: Math.floor(Number(articleId)) },
      headers
    )
  }

  @Get()
  async getCollections(@Headers() headers: Record<string, string>) {
    return this.collectionService.getCollections(headers)
  }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
  //   return this.collectionService.update(+id, updateCollectionDto)
  // }

  @Delete(":articleId")
  async removeCollection(
    @Param("articleId") articleId: number,
    @Headers() headers: Record<string, string>
  ) {
    return this.collectionService.removeCollection(Math.floor(Number(articleId)), headers)
  }
}
