import { Injectable } from "@nestjs/common"
import { COLLECTION_NAME_ENUM } from "src/app.module"
import { LowdbService } from "src/lowdb/lowdb.service"

@Injectable()
export class MiniNotesDbService {
  public dbService: LowdbService
  private readonly COLLECTION_NAME = COLLECTION_NAME_ENUM.MININOTES

  constructor() {
    this.dbService = new LowdbService(this.COLLECTION_NAME)
  }
}
