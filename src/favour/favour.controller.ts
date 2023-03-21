import { Controller, Get, Post, Body, Headers, UseGuards, Delete, Param } from "@nestjs/common"
import { FavourService } from "./favour.service"
import { CreateFavourDto } from "./dto/create-favour.dto"
import { AuthGuard } from "@nestjs/passport"

@Controller("favour")
@UseGuards(AuthGuard("jwt"))
export class FavourController {
  constructor(private readonly favourService: FavourService) {}

  @Post(":articleId")
  async giveFavour(
    @Param("articleId") articleId: number,
    @Headers() headers: Record<string, string>
  ) {
    return this.favourService.giveFavour(headers, Math.floor(Number(articleId)))
  }

  @Get("mine/:articleId")
  async getStatus(
    @Param("articleId") articleId: number,
    @Headers() headers: Record<string, string>
  ) {
    return this.favourService.getStatus(headers, Math.floor(Number(articleId)))
  }

  @Get(":articleId")
  async getLikeQuantity(@Param("articleId") articleId: number) {
    return this.favourService.getLikeQuantity(Math.floor(Number(articleId)))
  }

  @Delete(":articleId")
  async removeFavour(
    @Param("articleId") articleId: number,
    @Headers() headers: Record<string, string>
  ) {
    return this.favourService.removeFavour(headers, Math.floor(Number(articleId)))
  }
}
