import { Injectable } from "@nestjs/common"
import { COLLECTION_NAME_ENUM } from "src/app.module"
import { LowdbService } from "src/lowdb/lowdb.service"

@Injectable()
export default class ArticleDbService {
  private readonly COLLECTION_NAME = COLLECTION_NAME_ENUM.ARTICLES
  public dbService: LowdbService

  constructor() {
    this.dbService = new LowdbService(this.COLLECTION_NAME)
  }
}
