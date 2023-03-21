/*
 * @Author: DZR
 * @Date: 2023-03-21 20:12:28
 * @LastEditTime: 2023-03-21 22:08:17
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\favour\favour.service.ts
 */
import { Injectable } from "@nestjs/common"
import { COLLECTION_NAME_ENUM } from "src/app.module"
import { Result, statusCodeEnum } from "src/config/resultType"
import { FavourDbService } from "src/favourDB/favour-db/favour-db.service"
import { UserService } from "src/user/user.service"

@Injectable()
export class FavourService {
  private readonly COLLECTION_NAME = COLLECTION_NAME_ENUM.FAVOUR
  private result: Result

  constructor(
    private readonly FavourDbService: FavourDbService,
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

  async giveFavour(headers: Record<string, string>, articleId: number): Promise<Result> {
    //根据articleId给对应文章点赞
    const userId = await this.getUserIdByToken(headers)
    //根据articleId获取对应文章的点赞数据
    const listData = await this.FavourDbService.dbService.getByOption(this.COLLECTION_NAME, {
      articleId: articleId
    })
    //判断articleId是否合法
    if (articleId < 0 || articleId > listData.length - 1) {
      this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "articleId有误")
      return this.result
    }
    //查看用户是否已经点过赞，已经点过赞则抛出错误
    for (let i = 0; i < listData.likeUsers.length; i++) {
      if (listData.likeUsers[i] === userId) {
        this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "点赞失败！您已经给本篇文章点过赞了~")
        return this.result
      }
    }
    //该用户未点过赞，把该用户的userId插进数据库，对应文章点赞量加一
    const newData = listData
    newData.likeUsers.push(userId)
    newData.likeQuantity += 1
    await this.FavourDbService.dbService.update(
      this.COLLECTION_NAME,
      { articleId: articleId },
      newData
    )
    this.result = Result.success("点赞成功！")
    return this.result
  }

  async getStatus(headers: Record<string, string>, articleId: number): Promise<Result> {
    //获取用户点赞状态
    const userId = await this.getUserIdByToken(headers)
    //根据articleId获取对应文章的点赞数据
    const listData = await this.FavourDbService.dbService.getByOption(this.COLLECTION_NAME, {
      articleId: articleId
    })
    //判断articleId是否合法
    if (articleId < 0 || articleId > listData.length - 1) {
      this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "articleId有误")
      return this.result
    }
    //如果在数据库中找到该用户的userId，则返回true
    for (let i = 0; i < listData.likeUsers.length; i++) {
      if (listData.likeUsers[i] === userId) {
        this.result = Result.success({ status: true })
        return this.result
      }
    }
    //未找到该用户的userId，返回false
    this.result = Result.success({ status: false })
    return this.result
  }

  async getLikeQuantity(articleId: number): Promise<Result> {
    //根据articleId获取文章的点赞量
    const listData = await this.FavourDbService.dbService.getByOption(this.COLLECTION_NAME, {
      articleId: articleId
    })
    //判断articleId是否合法
    if (articleId < 0 || articleId > listData.length - 1) {
      this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "articleId有误")
      return this.result
    }
    this.result = Result.success({
      likeQuantity: listData.likeQuantity
    })
    return this.result
  }

  async removeFavour(headers: Record<string, string>, articleId: number): Promise<Result> {
    //取消点赞
    const userId = await this.getUserIdByToken(headers)
    const listData = await this.FavourDbService.dbService.getByOption(this.COLLECTION_NAME, {
      articleId: articleId
    })
    //判断articleId是否合法
    if (articleId < 0 || articleId > listData.length - 1) {
      this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "articleId有误")
      return this.result
    }

    for (let i = 0; i < listData.likeUsers.length; i++) {
      if (listData.likeUsers[i] === userId) {
        const newData = listData
        newData.likeUsers.splice(i, 1)
        newData.likeQuantity -= 1
        await this.FavourDbService.dbService.update(
          this.COLLECTION_NAME,
          { articleId: articleId },
          newData
        )
        this.result = Result.success("取消点赞成功！")
        return this.result
      }
    }

    this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "取消点赞失败！您未给本篇文章点赞~")
    return this.result
  }
}
