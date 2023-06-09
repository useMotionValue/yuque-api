/*
 * @Author: PacificD
 * @Date: 2021-10-07 22:36:14
 * @LastEditors: DZR
 * @LastEditTime: 2023-03-22 10:32:32
 * @Description:
 */
import { Injectable } from "@nestjs/common"
import { statusCodeEnum, Result } from "../config/resultType"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import UserLoginDto from "./dto/user-login.dto"
import { LowdbService } from "src/lowdb/lowdb.service"
import UserRegisterDto from "./dto/user-register.dto"
import User from "./pojo/User"
import { v1 as uuidv1 } from "uuid"
import UserVo from "./vo/UserVo"
import { COLLECTION_NAME_ENUM } from "src/app.module"

@Injectable()
export class UserService {
  private readonly COLLECTION_NAME = COLLECTION_NAME_ENUM.USER
  private dbService: LowdbService
  private result: Result

  constructor(private readonly jwtService: JwtService) {
    this.dbService = new LowdbService(this.COLLECTION_NAME)
  }

  /**
   * @description: 用户注册
   * @param {userRegisterDto} UserRegisterDto
   * @return {User} user
   */
  async register(userRegisterDto: UserRegisterDto): Promise<Result> {
    //check username
    const searchRes = await this.dbService.getByOption(this.COLLECTION_NAME, {
      username: userRegisterDto.username
    })
    if (searchRes.id) {
      this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "用户名已存在!")
      return this.result
    }
    const encryptPassword = await bcrypt.hash(userRegisterDto.password, 10),
      newUser = new User(uuidv1(), userRegisterDto.username, encryptPassword)

    await this.dbService.addOne<User>(this.COLLECTION_NAME, newUser).then(res => {
      this.result = Result.successWithCustomCode(statusCodeEnum.CREATED, {
        id: res.id,
        username: res.username
      })
    })

    return this.result
  }

  /**
   * @description: 用户登录
   * @param {UserLoginDto} userLoginDto
   * @return {UserVo} userVo，包含token信息
   */
  async login(userLoginDto: UserLoginDto): Promise<Result> {
    let isUserEXisted: boolean, user: User, token: string
    //check username
    await this.dbService
      .getByOption(this.COLLECTION_NAME, {
        username: userLoginDto.username
      })
      .then(res => {
        isUserEXisted = res.id ? true : false
        user = res
      })
    if (!isUserEXisted) {
      this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "该用户不存在!")
      return this.result
    }

    //check username---password
    const validPassword = await bcrypt.compare(userLoginDto.password, user.password)
    if (userLoginDto.username === user.username && validPassword) {
      token = this.jwtService.sign({
        id: user.id,
        userName: userLoginDto.username,
        password: userLoginDto.password
      })
      this.result = Result.success(new UserVo(user.id, user.username, token))
    } else {
      this.result = Result.fail(statusCodeEnum.BAD_REQUEST, "用户名或密码错误!")
    }

    return this.result
  }

  /**
   * @description: 根据token获取用户信息
   * @param {string} token
   * @return {userInfo} {id,username,password}
   */
  async getUserInfo(token: string): Promise<User> {
    const userInfo = this.jwtService.decode(token) as User
    return userInfo
  }
}
