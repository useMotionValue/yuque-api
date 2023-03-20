/*
 * @Author: DZR
 * @Date: 2023-03-20 17:28:28
 * @LastEditTime: 2023-03-20 18:13:14
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\miniNotesDB\mini-notes-db\mini-notes-db.module.ts
 */
import { Module } from "@nestjs/common"
import { MiniNotesDbService } from "./mini-notes-db.service"

@Module({
  providers: [MiniNotesDbService],
  exports: [MiniNotesDbService]
})
export class MiniNotesDbModule {}
