/*
 * @Author: DZR
 * @Date: 2023-03-17 17:28:43
 * @LastEditTime: 2023-03-17 17:37:16
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\article\pojo\Article.ts
 */
export default class Article {
  public readonly title: string
  public readonly content: string
  public readonly articleId: number
  public readonly time: string
  public readonly imgUrl: string

  constructor(title: string, content: string, articleId: number, time: string, imgUrl: string) {
    this.title = title
    this.content = content
    this.articleId = articleId
    this.time = time
    this.imgUrl = imgUrl
  }
}
