import { Injectable } from "@nestjs/common"
import { COLLECTION_NAME_ENUM } from "src/app.module"
import { Result, statusCodeEnum } from "src/config/resultType"
import { UserService } from "src/user/user.service"
import { addCollectionDto } from "./dto/add-collection.dto"
import Collection from "./pojo/Collection"
import CollectionDbService from "src/collectionDB/collection-db/collection-db.service"
import collectionVo from "./vo/collectionVo"
import ArticleDbService from "src/article-db/article-db.service"
import Article from "src/article/pojo/Article"

@Injectable()
export class CollectionService {
  private readonly COLLECTION_NAME = COLLECTION_NAME_ENUM.COLLECTIONS
  private result: Result

  constructor(
    private readonly userService: UserService,
    private readonly CollectionDbService: CollectionDbService,
    private readonly ArticleDbService: ArticleDbService
  ) {}

  private async getUserIdByToken(headers: Record<string, string>): Promise<string> {
    let userId: string
    //根据请求头的token获取用户信息
    await this.userService.getUserInfo(headers.token).then(res => {
      userId = res.id
    })
    return userId
  }

  async getCollections(headers: Record<string, string>): Promise<Result> {
    const userId = await this.getUserIdByToken(headers)
    let collections: Array<number>
    const ListData: Collection = await this.CollectionDbService.dbService.getByOption(
      this.COLLECTION_NAME,
      { userId: userId }
    )
    // console.log(JSON.stringify(ListData))
    collections = ListData.collections
    if (!collections) collections = []
    this.result = Result.success(new collectionVo(userId, collections))
    return this.result
  }

  async addCollection(
    addCollectionDto: addCollectionDto,
    headers: Record<string, string>
  ): Promise<Result> {
    //添加收藏
    const userId = await this.getUserIdByToken(headers)
    const articleId = addCollectionDto.articleId
    const articleData: Array<Article> = await this.ArticleDbService.dbService.getAll(
      COLLECTION_NAME_ENUM.ARTICLES
    )
    const articleLength = articleData.length
    const ListData: Collection = await this.CollectionDbService.dbService.getByOption(
      this.COLLECTION_NAME,
      { userId: userId }
    )

    if (articleId < 0 || articleId > articleLength) {
      this.result = Result.successWithCustomCode(
        statusCodeEnum.BAD_REQUEST,
        "未找到该文章，请检查articleId是否正确!"
      )
    } else {
      if (!ListData.userId) {
        //未找到相应用户，插入新用户的数据
        const data = {
          userId: userId,
          collections: [articleId]
        }
        await this.CollectionDbService.dbService.addOne(this.COLLECTION_NAME, data)
        this.result = Result.successWithCustomCode(statusCodeEnum.CREATED, "添加收藏成功！")
      } else {
        //找到相应用户，查看有没有收藏，如果没有则插入新的收藏
        const check = ListData.collections.indexOf(articleId)
        if (check === -1) {
          // ListData.collections.push(articleId)
          const data = {
            userId: userId,
            collections: [...ListData.collections, articleId]
          }
          await this.CollectionDbService.dbService.update(this.COLLECTION_NAME, ListData, data)
          this.result = Result.successWithCustomCode(statusCodeEnum.CREATED, "添加收藏成功！")
        } else {
          //已存在，无需添加收藏
          this.result = Result.successWithCustomCode(statusCodeEnum.OK, "已收藏，无需重复添加！")
        }
      }
    }

    return this.result
  }

  async removeCollection(articleId: number, headers: Record<string, string>): Promise<Result> {
    const userId = await this.getUserIdByToken(headers)
    const articleData: Array<Article> = await this.ArticleDbService.dbService.getAll(
      COLLECTION_NAME_ENUM.ARTICLES
    )
    const articleLength = articleData.length
    const ListData: Collection = await this.CollectionDbService.dbService.getByOption(
      this.COLLECTION_NAME,
      { userId: userId }
    )

    if (articleId < 0 || articleId > articleLength) {
      this.result = Result.successWithCustomCode(
        statusCodeEnum.BAD_REQUEST,
        "未找到该文章，请检查articleId是否正确!"
      )
    } else {
      if (!ListData.userId) {
        //未找到相应用户
        this.result = Result.successWithCustomCode(
          statusCodeEnum.BAD_REQUEST,
          "删除失败，您未收藏该文章！"
        )
      } else {
        //找到相应用户，查看有没有收藏，如果有则取消收藏
        const check = ListData.collections.indexOf(articleId)
        if (check === -1) {
          // ListData.collections.push(articleId)
          this.result = Result.successWithCustomCode(
            statusCodeEnum.BAD_REQUEST,
            "删除失败，您未收藏该文章！"
          )
        } else {
          //已存在，删除该文章的收藏
          const newCollections = ListData.collections
          newCollections.splice(check, 1)
          const data = {
            userId: userId,
            collections: newCollections
          }
          await this.CollectionDbService.dbService.update(this.COLLECTION_NAME, ListData, data)
          this.result = Result.successWithCustomCode(statusCodeEnum.OK, "取消收藏成功！")
        }
      }
    }
    return this.result
  }
}
