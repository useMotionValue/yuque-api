/*
 * @Author: DZR
 * @Date: 2023-03-21 19:05:03
 * @LastEditTime: 2023-03-21 19:05:04
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\article\vo\singleArticleVo.ts
 */
import Article from "../pojo/Article"

export default class singleArticleVo {
  private Article: Article

  constructor(Article: Article) {
    this.Article = Article
  }
}
