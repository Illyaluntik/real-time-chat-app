import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bans extends BaseSchema {
  protected tableName = 'bans'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('banned_user').references('id').inTable('users').onDelete('CASCADE')
      table.integer('banned_in').references('id').inTable('channels').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
