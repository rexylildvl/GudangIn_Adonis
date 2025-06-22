import { DateTime } from 'luxon'
import { BaseModel, beforeSave, belongsTo, column } from '@adonisjs/lucid/orm'
import NewsCategory from './news_category.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import stringHelpers from '@adonisjs/core/helpers/string'

export default class News extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare content: string

  @column()
  declare slug: string

  @column()
  declare categoryId: number

  @belongsTo(() => NewsCategory, {
    foreignKey: 'categoryId',
  })
  declare category: BelongsTo<typeof NewsCategory>

  @column()
  declare author: string

  @column()
  declare imageUrl: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  static async generateSlug(news: News) {
    if (news.title && !news.slug) {
      news.slug = stringHelpers.slug(news.title)
    }
  }
}
