import { Module } from "@nestjs/common"
import { ArticleService } from "./article.service"
import { ArticleController } from "./article.controller"
import { ArticleDbModule } from "src/article-db/article-db.module"

@Module({
  imports: [ArticleDbModule],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService]
})
export class ArticleModule {}
