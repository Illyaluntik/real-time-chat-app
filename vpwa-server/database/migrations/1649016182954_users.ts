import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('email', 255).notNullable()
      table.string('username', 50).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('full_name', 60). notNullable()
      table.string('avatar_path', 50)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
