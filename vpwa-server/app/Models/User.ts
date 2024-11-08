import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Ban from './Ban'
import Channel from './Channel'
import Kick from './Kick'
import Member from './Member'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public email: string

  @column()
  public fullname:string

  @column()
  public avatarPath: string

  @hasMany(() => Ban, {
    foreignKey: 'userId',
  })
  public bans: HasMany<typeof Ban>

  @hasMany(() => Member, {
    foreignKey: 'userId',
  })
  public members: HasMany<typeof Member>

  @hasMany(() => Channel, {
    foreignKey: 'userId',
  })
  public channels: HasMany<typeof Channel>

  @hasMany(() => Kick, {
    foreignKey: 'userId',
  })
  public kick: HasMany<typeof Kick>

  @hasMany(() => Kick, {
    foreignKey: 'userId',
  })
  public kickBy: HasMany<typeof Kick>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeSave()
  public static async addUUID (user: User) {
    user.id = uuidv4()
  }
}
