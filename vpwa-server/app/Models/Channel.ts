import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Message from './Message'
import Ban from './Ban'
import Kick from './Kick'
import Member from './Member'

export default class Channel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public channel_name:string

  @column()
  public is_private: boolean

  @column()
  public admin: string

  @column.dateTime()
  public lastActive: DateTime

  @belongsTo(() => User, {
    foreignKey: 'admin',
  })
  public user: BelongsTo<typeof User>

  @hasMany(() => Message, {
    foreignKey: 'sentIn',
  })
  public messages: HasMany<typeof Message>

  @hasMany(() => Ban, {
    foreignKey: 'channelId',
  })
  public bans: HasMany<typeof Ban>

  @hasMany(() => Kick, {
    foreignKey: 'channelId',
  })
  public kicks: HasMany<typeof Kick>

  @hasMany(() => Member, {
    foreignKey: 'channelId',
  })
  public members: HasMany<typeof Member>
}
