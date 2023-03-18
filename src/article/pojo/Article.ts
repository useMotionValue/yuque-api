/*
 * @Author: DZR
 * @Date: 2023-03-17 17:28:43
 * @LastEditTime: 2023-03-18 11:34:03
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
  public readonly headImgUrl: string
  public readonly userName: string

  constructor(
    title: string,
    content: string,
    articleId: number,
    time: string,
    imgUrl: string,
    headImgUrl: string,
    userName: string
  ) {
    this.title = title
    this.content = content
    this.articleId = articleId
    this.time = time
    this.imgUrl = imgUrl
    this.headImgUrl = headImgUrl
    this.userName = userName
  }
}
