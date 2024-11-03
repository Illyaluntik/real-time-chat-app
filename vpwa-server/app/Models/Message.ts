import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Channel from './Channel'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public author: string

  @column()
  public sentIn: number

  @column()
  public body: string

  @column.dateTime({ autoCreate: true })
  public sentAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'author',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Channel, {
    foreignKey: 'sentIn',
  })
  public channel: BelongsTo<typeof Channel>
}
