/*
 * @Author: DZR
 * @Date: 2023-03-19 17:42:14
 * @LastEditTime: 2023-03-20 23:19:39
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\personal-msg\personal-msg.service.ts
 */
import { Injectable, Res } from "@nestjs/common"
import { COLLECTION_NAME_ENUM } from "src/app.module"
import { Result, statusCodeEnum } from "src/config/resultType"
import PersonalMsgDbService from "src/personalMsgDB/personal-msg-db/personal-msg-db.service"
import { UserService } from "src/user/user.service"
import personalMsgDto from "./dto/personalMsgDto"
import PersonalMsgVo from "./vo/personalMsgVo"

@Injectable()
export class PersonalMsgService {
  private result: Result
  private readonly COLLECTION_NAME = COLLECTION_NAME_ENUM.PERSONALMSG

  constructor(
    private readonly userService: UserService,
    private readonly PersonalMsgDbService: PersonalMsgDbService
  ) {}
  //通过token来获取userId
  private async getUserIdByToken(headers: Record<string, string>): Promise<string> {
    let userId: string
    await this.userService.getUserInfo(headers.token).then(res => {
      userId = res.id
    })
    return userId
  }
  //创建个人信息
  async addPersonalMsg(
    personalMsgDto: personalMsgDto,
    headers: Record<string, string>
  ): Promise<Result> {
    const userId = await this.getUserIdByToken(headers)
    const oldData = await this.PersonalMsgDbService.dbService.getByOption(this.COLLECTION_NAME, {
      userId: userId
    })
    //先查找数据库中是否存在这个userId，如果没有则往数据库中插入数据，若有则不创建
    if (!oldData.userId) {
      await this.PersonalMsgDbService.dbService.addOne(this.COLLECTION_NAME, {
        userId: userId,
        nickname: personalMsgDto.nickname,
        collectionSum: 0,
        personalizedSignature: personalMsgDto.personalizedSignature
      })

      this.result = Result.success({ message: "创建个人信息成功！" })
    } else {
      this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "创建个人信息失败！")
    }

    return this.result
  }
  //获取个人信息
  async getPersonalMsg(headers: Record<string, string>): Promise<Result> {
    const userId = await this.getUserIdByToken(headers)
    // console.log("getPersonalMsg userId=" + userId)
    const listData = await this.PersonalMsgDbService.dbService.getByOption(this.COLLECTION_NAME, {
      userId: userId
    })
    //如果userId不存在，则抛出错误
    if (!listData.userId) {
      this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "未找到个人信息！")
    } else {
      //userId存在，正常返回个人信息
      this.result = Result.success(
        new PersonalMsgVo(listData.nickname, listData.personalizedSignature, listData.collectionSum)
      )
    }

    return this.result
  }

  //更新个人信息
  async updatePersonalMsg(
    personalMsgDto: personalMsgDto,
    headers: Record<string, string>
  ): Promise<Result> {
    //先在数据库中查找个人信息
    const userId = await this.getUserIdByToken(headers)
    const oldData = await this.PersonalMsgDbService.dbService.getByOption(this.COLLECTION_NAME, {
      userId: userId
    })
    //如果不存在userId，则抛出错误
    if (!oldData.userId) {
      this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "个人信息更新失败！")
    } else {
      //userId存在，更新个人信息
      const data = {
        userId: userId,
        nickname: personalMsgDto.nickname,
        collectionSum: oldData.collectionSum,
        personalizedSignature: personalMsgDto.personalizedSignature
      }
      await this.PersonalMsgDbService.dbService.update(
        this.COLLECTION_NAME,
        { userId: userId },
        data
      )
      this.result = Result.success({ message: "个人信息更新成功！" })
    }

    return this.result
  }
}
