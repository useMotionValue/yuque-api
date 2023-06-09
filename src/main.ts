/*
 * @Author: Pacific_D
 * @Date: 2022-03-22 22:57:06
 * @LastEditTime: 2022-03-26 11:36:27
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \class-schedule\src\main.ts
 */
import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import HttpExceptionFilter from "./filters/HttpException"
import { join } from "path"

const port = 8081

;(async () => {
  const app = await NestFactory.create(AppModule)

  //配置全局管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  //开启CORS
  app.enableCors({
    credentials: true,
    methods: "GET,POST,PATCH,DELETE",
    origin: "*"
  })

  // app.useStaticAssets(join(__dirname, "../public"), {})

  await app.listen(port)
})()
