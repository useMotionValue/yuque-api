import { Injectable } from "@nestjs/common"
import { Result, statusCodeEnum } from "src/config/resultType"
import { MiniNoteDto } from "./dto/MiniNoteDto"
import { MiniNotesDbService } from "src/miniNotesDB/mini-notes-db/mini-notes-db.service"
import { UserService } from "src/user/user.service"
import { COLLECTION_NAME_ENUM } from "src/app.module"
import MiniNotesVo from "./vo/MiniNotesVo"

@Injectable()
export class MiniNotesService {
  private readonly COLLECTION_NAME = COLLECTION_NAME_ENUM.MININOTES
  private result: Result

  constructor(
    private readonly userService: UserService,
    private readonly MiniNotesDbService: MiniNotesDbService
  ) {}

  private async getUserIdByToken(headers: Record<string, string>): Promise<string> {
    let userId: string
    //根据请求头的token获取用户信息
    await this.userService.getUserInfo(headers.token).then(res => {
      userId = res.id
    })
    return userId
  }

  async addMiniNote(MiniNoteDto: MiniNoteDto, headers: Record<string, string>): Promise<Result> {
    //新增一篇小记
    const userId = await this.getUserIdByToken(headers)
    //通过userId获取数据库中的小记
    const oldData = await this.MiniNotesDbService.dbService.getByOption(this.COLLECTION_NAME, {
      userId: userId
    })
    //判断数据库中是否存在该用户
    if (!oldData.userId) {
      //不存在该用户，插入新的用户数据
      await this.MiniNotesDbService.dbService.addOne(this.COLLECTION_NAME, {
        userId: userId,
        data: [
          {
            content: MiniNoteDto.content,
            createTime: MiniNoteDto.createTime,
            notesId: Math.floor(Number(MiniNoteDto.notesId))
          }
        ]
      })
    } else {
      //存在该用户，往data里插入新的小记
      const newData = oldData
      const listData = oldData.data
      //判断notesId是否唯一，不唯一则抛出错误
      for (let i = 0; i < listData.length; i++) {
        if (listData[i].notesId === Math.floor(Number(MiniNoteDto.notesId))) {
          this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "notesId不符合要求！")
          return this.result
        }
      }
      //notesId唯一，插入新的小记
      newData.data.push({
        content: MiniNoteDto.content,
        createTime: MiniNoteDto.createTime,
        notesId: Math.floor(Number(MiniNoteDto.notesId))
      })
      await this.MiniNotesDbService.dbService.update(
        this.COLLECTION_NAME,
        { userId: userId },
        newData
      )
    }

    this.result = Result.success({ message: "新增小记成功！" })

    return this.result
  }

  async getAllMiniNotes(headers: Record<string, string>): Promise<Result> {
    //获取用户所有的小记
    const userId = await this.getUserIdByToken(headers)

    const listData = await this.MiniNotesDbService.dbService.getByOption(this.COLLECTION_NAME, {
      userId: userId
    })

    if (!listData.userId) {
      this.result = Result.success(new MiniNotesVo(userId, []))
    } else {
      this.result = Result.success(new MiniNotesVo(userId, listData.data))
    }

    return this.result
  }

  async updateMiniNotes(
    MiniNoteDto: MiniNoteDto,
    headers: Record<string, string>
  ): Promise<Result> {
    //更新用户的小记
    const userId = await this.getUserIdByToken(headers)
    const listData = await this.MiniNotesDbService.dbService.getByOption(this.COLLECTION_NAME, {
      userId: userId
    })
    if (!listData.userId) {
      //不存在该用户，抛出错误
    } else {
      const newData = listData
      for (let i = 0; i < listData.data.length; i++) {
        if (listData.data[i].notesId === Math.floor(Number(MiniNoteDto.notesId))) {
          newData.data[i].createTime = MiniNoteDto.createTime
          newData.data[i].content = MiniNoteDto.content
          await this.MiniNotesDbService.dbService.update(
            this.COLLECTION_NAME,
            { userId: userId },
            newData
          )
          this.result = Result.success("小记更新成功！")
          return this.result
        }
      }
    }

    this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "更新失败！")

    return this.result
  }

  async removeMiniNotes(notesId: number, headers: Record<string, string>): Promise<Result> {
    const userId = await this.getUserIdByToken(headers)

    const listData = await this.MiniNotesDbService.dbService.getByOption(this.COLLECTION_NAME, {
      userId: userId
    })
    if (!listData.userId) {
      //判断是否存在该用户，不存在则抛出错误
    } else {
      const newData = listData
      for (let i = 0; i < listData.data.length; i++) {
        if (listData.data[i].notesId === Math.floor(Number(notesId))) {
          newData.data.splice(i, 1)
          await this.MiniNotesDbService.dbService.update(
            this.COLLECTION_NAME,
            { userId: userId },
            newData
          )
          this.result = Result.success("删除成功！")
          return this.result
        }
      }
    }

    this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "删除失败！")

    return this.result
  }
}
