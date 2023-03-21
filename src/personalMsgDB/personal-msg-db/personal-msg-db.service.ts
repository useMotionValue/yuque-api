import { Injectable } from "@nestjs/common"
import { COLLECTION_NAME_ENUM } from "src/app.module"
import { LowdbService } from "src/lowdb/lowdb.service"
//对数据库进行操作
@Injectable()
export default class PersonalMsgDbService {
  private readonly COLLECTION_NAME = COLLECTION_NAME_ENUM.PERSONALMSG
  public dbService: LowdbService

  constructor() {
    this.dbService = new LowdbService(this.COLLECTION_NAME)
  }
}
