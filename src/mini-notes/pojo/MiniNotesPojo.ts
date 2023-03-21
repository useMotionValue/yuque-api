/*
 * @Author: DZR
 * @Date: 2023-03-20 20:55:16
 * @LastEditTime: 2023-03-20 20:55:16
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\mini-notes\pojo\MiniNotesPojo.ts
 */

export default class MiniNotesPojo {
  public content: string
  public createTime: string
  public notesId: string

  constructor(content: string, createTime: string, notesId: string) {
    this.content = content
    this.createTime = createTime
    this.notesId = notesId
  }
}
