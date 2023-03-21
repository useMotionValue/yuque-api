import { Module } from "@nestjs/common"
import { FavourDbService } from "./favour-db.service"

@Module({
  providers: [FavourDbService],
  exports: [FavourDbService]
})
export class FavourDbModule {}
