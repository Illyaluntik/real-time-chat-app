import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Members extends BaseSchema {
  protected tableName = 'members'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.integer('channel_id').references('id').inTable('channels').onDelete('CASCADE')
      table.integer('unread_messages').defaultTo(0)
      table.boolean('accepted').defaultTo(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
