import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Produk from '#models/Produk'

export default class Supplier extends BaseModel {
  public static table = 'supplier'

  @column({ isPrimary: true })
  public id: string

  @column()
  public namaSupplier: string

  @column()
  public alamat: string

  @column()
  public telepon: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Produk, {
    foreignKey: 'supplierId',
  })
  public produk: HasMany<typeof Produk>
}