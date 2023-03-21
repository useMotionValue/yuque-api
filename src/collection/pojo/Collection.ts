/*
 * @Author: DZR
 * @Date: 2023-03-18 15:22:28
 * @LastEditTime: 2023-03-18 15:22:42
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\collection\pojo\Collection.ts
 */
export default class Collection {
  public userId: string
  public collections: Array<number>

  constructor(userId: string, collections: Array<number>) {
    this.userId = userId
    this.collections = collections
  }
}
