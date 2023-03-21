/*
 * @Author: DZR
 * @Date: 2023-03-18 10:22:58
 * @LastEditTime: 2023-03-21 18:50:33
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\user\vo\UserVo.ts
 */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-23 15:05:16
 * @LastEditTime: 2023-03-18 14:02:06
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\user\vo\UserVo.ts
 */
export default class UserVo {
  private id: string
  private username: string
  private token: string

  constructor(id: string, username: string, token: string) {
    this.id = id
    this.username = username
    this.token = token
  }
}
