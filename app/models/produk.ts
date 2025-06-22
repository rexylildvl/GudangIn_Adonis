import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Kategori from '#models/kategori'
import Supplier from '#models/supplier'

export default class Produk extends BaseModel {
  public static table = 'produk'

  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'nama_produk' })
  public namaProduk: string

  @column()
  public harga: number

  @column()
  public stok: number

  @column({ columnName: 'kategori_id' })
  public kategoriId: string

  @column({ columnName: 'supplier_id' })
  public supplierId: string

  @belongsTo(() => Kategori, { foreignKey: 'kategoriId' })
  public kategori: BelongsTo<typeof Kategori>

  @belongsTo(() => Supplier, { foreignKey: 'supplierId' })
  public supplier: BelongsTo<typeof Supplier>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
