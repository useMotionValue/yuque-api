/*
 * @Author: DZR
 * @Date: 2023-03-20 17:27:29
 * @LastEditTime: 2023-03-20 18:09:48
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\mini-notes\mini-notes.module.ts
 */
import { Module } from "@nestjs/common"
import { MiniNotesService } from "./mini-notes.service"
import { MiniNotesController } from "./mini-notes.controller"
import { MiniNotesDbModule } from "src/miniNotesDB/mini-notes-db/mini-notes-db.module"

@Module({
  imports: [MiniNotesDbModule],
  controllers: [MiniNotesController],
  providers: [MiniNotesService],
  exports: [MiniNotesService]
})
export class MiniNotesModule {}
