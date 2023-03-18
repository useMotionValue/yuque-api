/*
 * @Author: DZR
 * @Date: 2023-03-18 15:32:12
 * @LastEditTime: 2023-03-18 16:16:39
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\collection\vo\collectionVo.ts
 */
import Collection from "../pojo/Collection"

export default class collectionVo {
  private collections: Array<number>
  private readonly userId: string

  constructor(userId: string, collections: Array<number>) {
    this.userId = userId
    this.collections = collections
  }
}
