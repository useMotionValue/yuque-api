/*
 * @Author: Pacific_D
 * @Date: 2022-03-24 22:13:51
 * @LastEditTime: 2023-03-18 09:54:46
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \yuque-api\src\classifyDB\classifyDB.service.ts
 */
import { Injectable } from "@nestjs/common"
import { COLLECTION_NAME_ENUM } from "src/app.module"
import { LowdbService } from "src/lowdb/lowdb.service"

@Injectable()
export default class ClassifyDBService {
  private readonly COLLECTION_NAME = COLLECTION_NAME_ENUM.CLASSIFY
  public dbService: LowdbService

  constructor() {
    this.dbService = new LowdbService(this.COLLECTION_NAME)
  }
}
