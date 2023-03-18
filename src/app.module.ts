/*
 * @Author: Pacific_D
 * @Date: 2022-03-22 22:57:06
 * @LastEditTime: 2023-03-18 09:56:12
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \yuque-api\src\app.module.ts
 */
import { Module } from "@nestjs/common"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"
import { ClassifyModule } from "./classify/classify.module"
import { CoursesModule } from "./courses/courses.module"
import { UserModule } from "./user/user.module"
import { ArticleModule } from "./article/article.module"

export enum COLLECTION_NAME_ENUM {
  ARTICLES = "articles",
  WEEKS = "wekks",
  CLASSIFY = "classify",
  USER = "user"
}

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public")
    }),
    ClassifyModule,
    UserModule,
    CoursesModule,
    ArticleModule
  ]
})
export class AppModule {}
