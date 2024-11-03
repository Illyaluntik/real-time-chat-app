import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Channel from './Channel'
import User from './User'

export default class Kick extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public kickedUser: string

  @column()
  public kickedBy: string

  @column()
  public kickedIn: number

  @belongsTo(() => Channel, {
    foreignKey: 'kickedIn',
  })
  public channels: BelongsTo<typeof Channel>

  @belongsTo(() => User, {
    foreignKey: 'kickedBy',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'kickedUser',
  })
  public users: BelongsTo<typeof User>
}
