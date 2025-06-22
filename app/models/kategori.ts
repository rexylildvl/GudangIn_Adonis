import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Kategori extends BaseModel {
  public static table = 'kategori'

  @column({ isPrimary: true })
  public id: string

  @column()
  public namaKategori: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
