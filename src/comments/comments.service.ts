/*
 * @Author: DZR
 * @Date: 2023-03-21 16:13:02
 * @LastEditTime: 2023-03-21 20:33:11
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\comments\comments.service.ts
 */
import { Injectable } from "@nestjs/common"
import { COLLECTION_NAME_ENUM } from "src/app.module"
import { Result, statusCodeEnum } from "src/config/resultType"
import { addCommentsDto } from "./dto/addCommentsDto"
import { CommentsDbService } from "src/commentsDB/comments-db/comments-db.service"
import PersonalMsgDbService from "src/personalMsgDB/personal-msg-db/personal-msg-db.service"
import { UserService } from "src/user/user.service"
import commentsVo from "./vo/commentsVo"

@Injectable()
export class CommentsService {
  private readonly COLLECTION_NAME = COLLECTION_NAME_ENUM.COMMENTS
  private result: Result

  constructor(
    private readonly CommentsDbService: CommentsDbService,
    private readonly PersonalMsgDbService: PersonalMsgDbService,
    private readonly userService: UserService
  ) {}

  private async getUserIdByToken(headers: Record<string, string>): Promise<string> {
    let userId: string
    //根据请求头的token获取用户信息
    await this.userService.getUserInfo(headers.token).then(res => {
      userId = res.id
    })
    return userId
  }

  async addComments(
    addCommentsDto: addCommentsDto,
    headers: Record<string, string>
  ): Promise<Result> {
    //新增评论
    const userId = await this.getUserIdByToken(headers)
    //获取用户个人信息
    const PersonalMsg = await this.PersonalMsgDbService.dbService.getByOption(
      COLLECTION_NAME_ENUM.PERSONALMSG,
      { userId: userId }
    )
    if (!PersonalMsg.userId) {
      //此用户并未创建个人信息
      this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "请先创建个人信息后再添加评论！")
      return this.result
    }
    //根据articleId去获取数据库中的评论
    const listData = await this.CommentsDbService.dbService.getByOption(this.COLLECTION_NAME, {
      articleId: Math.floor(Number(addCommentsDto.articleId))
    })

    if (!listData.articleId && listData.articleId !== 0) {
      //如果不存在该篇文章的评论，将评论插入数据库
      const newData = {
        articleId: Math.floor(Number(addCommentsDto.articleId)),
        comments: [
          {
            nickname: PersonalMsg.nickname,
            headImgUrl: "http://localhost:8081/userImg.png",
            content: addCommentsDto.comments,
            time: addCommentsDto.time
          }
        ]
      }
      await this.CommentsDbService.dbService.addOne(this.COLLECTION_NAME, newData)
    } else {
      //存在该篇文章的评论，在对应文章的评论数据中把新评论加进去
      const newData = listData
      newData.comments.push({
        nickname: PersonalMsg.nickname,
        headImgUrl: "http://localhost:8081/userImg.png",
        content: addCommentsDto.comments,
        time: addCommentsDto.time
      })
      await this.CommentsDbService.dbService.update(
        this.COLLECTION_NAME,
        {
          articleId: listData.articleId
        },
        newData
      )
    }
    this.result = Result.success("评论成功!")
    return this.result
  }

  async getCommentsById(articleId: number): Promise<Result> {
    //根据articleId获取评论并返回
    const listData: commentsVo = await this.CommentsDbService.dbService.getByOption(
      this.COLLECTION_NAME,
      {
        articleId: Math.floor(Number(articleId))
      }
    )
    this.result = Result.success(new commentsVo(listData.articleId, listData.comments))
    return this.result
  }
}
