import { Injectable } from "@nestjs/common"
import { COLLECTION_NAME_ENUM } from "src/app.module"
import { LowdbService } from "src/lowdb/lowdb.service"

@Injectable()
export default class CollectionDbService {
  public dbService: LowdbService
  private readonly COLLECTION_NAME = COLLECTION_NAME_ENUM.COLLECTIONS

  constructor() {
    this.dbService = new LowdbService(this.COLLECTION_NAME)
  }
}
