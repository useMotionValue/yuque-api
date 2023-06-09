/*
 * @Author: Pacific_D
 * @Date: 2022-03-17 13:42:56
 * @LastEditTime: 2023-03-19 11:43:06
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\lowdb\lowdb.service.ts
 */
import { Injectable } from "@nestjs/common"
import * as lowdb from "lowdb"
import * as FileAsync from "lowdb/adapters/FileAsync"

@Injectable()
export class LowdbService {
  private quantitySum: number
  private db: lowdb.LowdbAsync<any>

  constructor(collectionName) {
    this.initDatabase(collectionName)
    this.quantitySum = 0
  }

  /**
   * @description: 初始化数据库
   * @param {string} collectionName
   * @return {*}
   */
  private async initDatabase(collectionName: string): Promise<void> {
    const adapter = new FileAsync(`${collectionName}.json`)
    this.db = await lowdb(adapter)
    const listUsers = await this.db.get(collectionName).value()
    if (!listUsers) {
      await this.db.set(collectionName, []).write()
    }
  }

  /**
   * @description: 覆盖数据
   * @param {string} collectionName
   * @param {object} obj
   * @return {*}
   */
  async setData(collectionName: string, obj: object): Promise<boolean> {
    await this.db.set(collectionName, obj).write()
    return true
  }

  /**
   * @description: 添加一条数据
   * @param {string} collectionName
   * @param {oneType} obj
   * @return {oneType} obj
   */
  async addOne<oneType>(collectionName: string, obj: oneType): Promise<oneType> {
    const listData = await this.db.get(collectionName).value()
    listData.push(obj)
    await this.db.set(collectionName, listData).write()
    return obj
  }

  /**
   * @description: 删除数据，根据选项删除一条或多条数据
   * @param {string} collectionName
   * @param {object} option 单个或多个key-value组合的对象
   * @return {object} affectedNum
   */
  async delByOption(collectionName: string, option: object): Promise<object> {
    const listData = await this.db.get(collectionName).value()
    let affectedNum = 0
    const copyListData = []
    listData.forEach(data => {
      if (data) {
        let isDataShouldKeep = false
        for (const key in option) {
          if (key && data[key] !== option[key]) {
            isDataShouldKeep = true
          }
        }
        if (isDataShouldKeep) {
          copyListData.push(data)
        } else {
          affectedNum++
        }
      }
    })
    await this.db.set(collectionName, copyListData).write()
    return { affectedNum: affectedNum }
  }

  /**
   * @description: 更新数据，根据选项更新一条或多条数据
   * @param {string} collectionName
   * @param {object} selectOption 单个或多个key-value组合的对象
   * @param {object} newValue 更新值
   * @return {object} affectedNum
   */
  async update(collectionName: string, selectOption: object, newValue: object): Promise<object> {
    let listData = await this.db.get(collectionName).value(),
      affectedNum = 0
    listData = listData.map(data => {
      if (data) {
        for (const key in selectOption) {
          if (key && data[key] === selectOption[key]) {
            affectedNum++
            data = Object.assign(data, newValue)
          }
        }
      }
      return data
    })
    await this.db.set(collectionName, listData).write()
    return { affectedNum: affectedNum }
  }

  /**
   * @description: 获取所有数据
   * @param {string} collectionName
   * @return {*} listData
   */
  async getAll(collectionName: string): Promise<any> {
    const listData = await this.db.get(collectionName).value()
    return listData
  }

  /**
   * @description: 根据条件搜索数据
   * @param {string} collectionName
   * @param {object} option
   * @return {*} listData
   */
  async getByOption(collectionName: string, option: object): Promise<any> {
    const listData = await this.db.get(collectionName).find(option).value()
    if (!listData) return []
    return listData
  }

  /**
   * @description: 返回指定数量的数据
   * @param {string} collectionName
   * @param {number} quantity
   * @return {*} listData
   */
  async getSpecifiedQuatity(collectionName: string, quantity: number): Promise<any> {
    const listDataArray = await this.db.get(collectionName).value()
    if (this.quantitySum + quantity > listDataArray.length) {
      //请求量超过数据库的值时设为0，再次从头开始返回数据
      this.quantitySum = 0
    }
    const listData = listDataArray.slice(this.quantitySum, this.quantitySum + quantity)
    this.quantitySum += quantity
    return listData
  }
}
