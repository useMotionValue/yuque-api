import { Module } from "@nestjs/common"
import { PersonalMsgService } from "./personal-msg.service"
import PersonalMsgController from "./personal-msg.controller"
import PersonalMsgDbService from "src/personalMsgDB/personal-msg-db/personal-msg-db.service"
import { PersonalMsgDbModule } from "src/personalMsgDB/personal-msg-db/personal-msg-db.module"

@Module({
  imports: [PersonalMsgModule, PersonalMsgDbModule],
  controllers: [PersonalMsgController],
  providers: [PersonalMsgService],
  exports: [PersonalMsgService]
})
export class PersonalMsgModule {}
