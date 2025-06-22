import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Produk from '#models/produk'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Penjualan extends BaseModel {
  public static table = 'penjualan'

  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'produk_id' })
  public produkId: string

  @column()
  public jumlah: number

  @column()
  public tanggal: string

  @belongsTo(() => Produk, {
    foreignKey: 'produkId',
  })
  public produk: BelongsTo<typeof Produk>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
