export default class PersonalMsgVo {
  //个人信息接口返回数据：昵称，个性签名，文章收藏数量
  private nickname: string
  private personalizedSignature: string
  private collectionSum: number

  constructor(nickname: string, personalizedSignature: string, collectionSum: number) {
    this.nickname = nickname
    this.personalizedSignature = personalizedSignature
    this.collectionSum = collectionSum
  }
}
