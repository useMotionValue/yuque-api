/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 11:04:02
 * @LastEditTime: 2022-03-24 12:42:29
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \class-schedule\src\classify\classify.controller.ts
 */
import { Body, Controller, Post, UseGuards, Headers, Delete, Param, Get } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import ClassifyService from "./classify.service"
import ClassifyDto from "./dto/classify.dto"

@Controller("/classify")
@UseGuards(AuthGuard("jwt"))
export default class ClassifyController {
  constructor(private readonly classifyService: ClassifyService) {}

  @Get()
  async getClassify(@Headers() headers: Record<string, string>) {
    return this.classifyService.getClassify(headers)
  }

  @Post()
  async addClassify(@Body() ClassifyDto: ClassifyDto, @Headers() headers: Record<string, string>) {
    return this.classifyService.addClassify(ClassifyDto, headers)
  }

  @Delete(":classifyId")
  async deleteClassify(
    @Param("classifyId") classifyId: string,
    @Headers() headers: Record<string, string>
  ) {
    return this.classifyService.deleteClassify(classifyId, headers)
  }
}
