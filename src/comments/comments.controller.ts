import { Controller, Get, Post, Body, Patch, Param, Headers, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { CommentsService } from "./comments.service"
import { addCommentsDto } from "./dto/addCommentsDto"

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  async addComments(
    @Body() addCommentsDto: addCommentsDto,
    @Headers() headers: Record<string, string>
  ) {
    return this.commentsService.addComments(addCommentsDto, headers)
  }

  @Get(":articleId")
  async getCommentsById(@Param("articleId") articleId: number) {
    return this.commentsService.getCommentsById(Math.floor(Number(articleId)))
  }
}
