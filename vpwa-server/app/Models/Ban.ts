import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Channel from './Channel'

export default class Ban extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public bannedUser: string

  @column()
  public bannedIn: number

  @belongsTo(() =>User, {
    foreignKey: 'bannedUser',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Channel, {
    foreignKey: 'bannedIn',
  })
  public channel: BelongsTo<typeof Channel>
}
