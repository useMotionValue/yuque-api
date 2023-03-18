/*
 * @Author: DZR
 * @Date: 2023-03-18 14:03:47
 * @LastEditTime: 2023-03-18 14:09:43
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\article\vo\ArticleVo
 */
import Article from "../pojo/Article"

export default class ArticleVo {
  // private title: string
  // private content: string
  // private articleId: number
  // private time: string
  // private imgUrl: string
  // private headImgUrl: string
  // private userName: string
  private articles: Array<Article>

  constructor(articles: Array<Article>) {
    this.articles = articles
  }
}
