import { BaseModel, column, belongsTo, BelongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Product from '#models/Product'

export default class SalesInventory extends BaseModel {
  public static table = 'sales_inventory'

  @column({ isPrimary: true })
  public id: number

  @column()
  public productId: number

  @column()
  public jumlah: number

  @column.date()
  public tanggal: DateTime

  @belongsTo(() => Produk)
  public product: BelongsTo<typeof Produk>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
