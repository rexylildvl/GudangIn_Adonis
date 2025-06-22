import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('supplier', (table) => {
      table.string('id', 5).primary()
      table.string('nama_supplier', 100).notNullable()
      table.string('alamat', 255).nullable()
      table.string('telepon', 20).nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable('supplier')
  }
}