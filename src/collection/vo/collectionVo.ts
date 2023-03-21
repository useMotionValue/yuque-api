/*
 * @Author: DZR
 * @Date: 2023-03-18 15:32:12
 * @LastEditTime: 2023-03-18 16:16:39
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\collection\vo\collectionVo.ts
 */

//收藏接口返回数据类型
export default class collectionVo {
  //收藏文章的articleId数组，userId
  private collections: Array<number>
  private readonly userId: string

  constructor(userId: string, collections: Array<number>) {
    this.userId = userId
    this.collections = collections
  }
}
