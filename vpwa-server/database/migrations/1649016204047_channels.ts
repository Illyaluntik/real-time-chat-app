import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Channels extends BaseSchema {
  protected tableName = 'channels'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('channel_name').notNullable().unique()
      table.enum('channel_type', ['public', 'private']).notNullable()
      table.string('admin').references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('last_active', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
