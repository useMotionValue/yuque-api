/*
 * @Author: DZR
 * @Date: 2023-03-19 17:42:14
 * @LastEditTime: 2023-03-20 15:33:19
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\personal-msg\personal-msg.controller.ts
 */
import { Controller, Get, Post, Body, Patch, Param, Headers, UseGuards, Put } from "@nestjs/common"
import { PersonalMsgService } from "./personal-msg.service"
import { AuthGuard } from "@nestjs/passport"
import personalMsgDto from "./dto/personalMsgDto"

@Controller("personalmsg") //请求路径
@UseGuards(AuthGuard("jwt")) //鉴权
export default class PersonalMsgController {
  constructor(private readonly personalMsgService: PersonalMsgService) {}
  //Post：创建个人信息
  @Post()
  create(@Body() personalMsgDto: personalMsgDto, @Headers() headers: Record<string, string>) {
    return this.personalMsgService.addPersonalMsg(personalMsgDto, headers)
  }
  //Get方式：获取个人信息
  @Get()
  async getPersonalMsg(@Headers() headers: Record<string, string>) {
    return this.personalMsgService.getPersonalMsg(headers)
  }
  //Patch：更新个人信息
  @Patch()
  async updatePersonalMsg(
    @Body() personalMsgDto: personalMsgDto,
    @Headers() headers: Record<string, string>
  ) {
    return this.personalMsgService.updatePersonalMsg(personalMsgDto, headers)
  }
}
