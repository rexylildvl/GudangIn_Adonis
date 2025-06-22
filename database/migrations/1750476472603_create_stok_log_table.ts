import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('stok_log', (table) => {
      table.string('id', 5).primary()
      table.string('produk_id', 5).notNullable()
        .references('id')
        .inTable('produk')
        .onDelete('CASCADE')
      table.enum('jenis', ['masuk', 'keluar']).notNullable()
      table.integer('jumlah').notNullable()
      table.date('tanggal').notNullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable('stok_log')
  }
}