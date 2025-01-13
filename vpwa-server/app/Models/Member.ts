import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Channel from './Channel'
import User from './User'

export default class Member extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public channelId: number

  @column()
  public userId: string

  @column()
  public accepted: boolean

  @column()
  public unreadMessages: number

  @belongsTo(() => Channel, {
    foreignKey: 'channelId',
  })
  public channel: BelongsTo<typeof Channel>

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>
}
