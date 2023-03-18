/*
 * @Author: Pacific_D
 * @Date: 2022-03-24 13:14:10
 * @LastEditTime: 2023-03-18 09:55:37
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \yuque-api\src\coursesDB\coursesDB.service.ts
 */
import { Injectable } from "@nestjs/common"
import { COLLECTION_NAME_ENUM } from "src/app.module"
import { LowdbService } from "src/lowdb/lowdb.service"

@Injectable()
export default class CoursesDBService {
  private readonly COLLECTION_NAME = COLLECTION_NAME_ENUM.WEEKS
  public dbService: LowdbService

  constructor() {
    this.dbService = new LowdbService(this.COLLECTION_NAME)
  }
}
