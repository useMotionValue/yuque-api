import { Module } from "@nestjs/common"
import { FavourService } from "./favour.service"
import { FavourController } from "./favour.controller"
import { FavourDbService } from "src/favourDB/favour-db/favour-db.service"

@Module({
  controllers: [FavourController],
  providers: [FavourService, FavourDbService]
})
export class FavourModule {}
