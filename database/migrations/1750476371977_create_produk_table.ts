import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('produk', (table) => {
      table.string('id', 5).primary()
      table.string('nama_produk', 100).notNullable()
      table.decimal('harga', 15, 2).notNullable()
      table.integer('stok').notNullable()
      table.string('kategori_id', 5).notNullable()
        .references('id')
        .inTable('kategori')
        .onDelete('CASCADE')
      table.string('supplier_id', 5).notNullable()
        .references('id')
        .inTable('supplier')
        .onDelete('CASCADE')
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable('produk')
  }
}