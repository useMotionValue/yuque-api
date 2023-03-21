/*
 * @Author: DZR
 * @Date: 2023-03-21 20:28:00
 * @LastEditTime: 2023-03-21 20:29:00
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\favourDB\favour-db\favour-db.service.ts
 */
import { Injectable } from "@nestjs/common"
import { COLLECTION_NAME_ENUM } from "src/app.module"
import { LowdbService } from "src/lowdb/lowdb.service"

@Injectable()
export class FavourDbService {
  private readonly COLLECTION_NAME = COLLECTION_NAME_ENUM.FAVOUR
  public dbService: LowdbService

  constructor() {
    this.dbService = new LowdbService(this.COLLECTION_NAME)
  }
}
