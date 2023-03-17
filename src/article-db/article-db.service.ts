import { Injectable } from "@nestjs/common"
import { LowdbService } from "src/lowdb/lowdb.service"

@Injectable()
export default class ArticleDbService {
  private readonly COLLECTION_NAME = "articles"
  public dbService: LowdbService

  constructor() {
    this.dbService = new LowdbService(this.COLLECTION_NAME)
  }
}
