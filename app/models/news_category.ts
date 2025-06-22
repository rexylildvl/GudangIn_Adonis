import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import string from '@adonisjs/core/helpers/string'

export default class NewsCategory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  static async generateSlug(newsCategory: NewsCategory) {
    if (newsCategory.name && !newsCategory.slug) {
      newsCategory.slug = string.slug(newsCategory.name)
    }
  }
}
