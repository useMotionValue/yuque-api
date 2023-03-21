/*
 * @Author: DZR
 * @Date: 2023-03-18 14:45:16
 * @LastEditTime: 2023-03-18 17:14:47
 * @LastEditors: DZR
 * @Description:
 * @FilePath: \yuque-api\src\collection\dto\update-collection.dto.ts
 */
import { PartialType } from "@nestjs/mapped-types"
import { addCollectionDto } from "./add-collection.dto"

export class UpdateCollectionDto extends PartialType(addCollectionDto) {}
