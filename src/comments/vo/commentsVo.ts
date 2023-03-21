import commentsPojo from "../pojo/commentsPojo"

export default class comments {
  public articleId: number
  public comments: Array<commentsPojo>

  constructor(articleId: number, comments: Array<commentsPojo>) {
    this.articleId = articleId
    this.comments = comments
  }
}
