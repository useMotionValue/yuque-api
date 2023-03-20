/*
 * @Author: DZR
 * @Date: 2023-03-19 17:44:51
 * @LastEditTime: 2023-03-19 18:24:53
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\personalMsgDB\personal-msg-db\personal-msg-db.module.ts
 */
import { Module } from "@nestjs/common"
import { PersonalMsgService } from "src/personal-msg/personal-msg.service"
import PersonalMsgDbService from "./personal-msg-db.service"

@Module({
  providers: [PersonalMsgDbService],
  exports: [PersonalMsgDbService]
})
export class PersonalMsgDbModule {}
