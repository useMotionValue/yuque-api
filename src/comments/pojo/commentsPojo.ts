export default class commentsPojo {
  public nickname: string
  public headImgUrl: string
  public content: string
  public time: string

  constructor(nickname: string, headImgUrl: string, content: string, time: string) {
    this.nickname = nickname
    this.headImgUrl = headImgUrl
    this.content = content
    this.time = time
  }
}
