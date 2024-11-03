import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Messages extends BaseSchema {
  protected tableName = 'messages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('author').references('id').inTable('users').onDelete('CASCADE')
      table.integer('sent_in').references('id').inTable('channels').onDelete('CASCADE')
      table.string('body').notNullable()
      table.timestamp('sent_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
