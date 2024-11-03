import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Kicks extends BaseSchema {
  protected tableName = 'kicks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('kicked_user').references('id').inTable('users').onDelete('CASCADE')
      table.string('kicked_by').references('id').inTable('users').onDelete('CASCADE')
      table.integer('kicked_in').references('id').inTable('channels').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
