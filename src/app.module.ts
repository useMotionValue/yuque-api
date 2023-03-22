/*
 * @Author: Pacific_D
 * @Date: 2022-03-22 22:57:06
 * @LastEditTime: 2023-03-22 10:29:36
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\app.module.ts
 */
import { Module } from "@nestjs/common"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"
import { UserModule } from "./user/user.module"
import { ArticleModule } from "./article/article.module"
import { CollectionModule } from "./collection/collection.module"
import { PersonalMsgModule } from "./personal-msg/personal-msg.module"
import { MiniNotesModule } from "./mini-notes/mini-notes.module"
import { CommentsModule } from "./comments/comments.module"
import { FavourModule } from "./favour/favour.module"

export enum COLLECTION_NAME_ENUM {
  ARTICLES = "articles",
  USER = "user",
  COLLECTIONS = "collections",
  PERSONALMSG = "personalMsg",
  MININOTES = "mininotes",
  COMMENTS = "comments",
  FAVOUR = "favour"
}

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      serveRoot: "/"
    }),
    UserModule,
    ArticleModule,
    CollectionModule,
    PersonalMsgModule,
    MiniNotesModule,
    CommentsModule,
    FavourModule
  ]
})
export class AppModule {}
