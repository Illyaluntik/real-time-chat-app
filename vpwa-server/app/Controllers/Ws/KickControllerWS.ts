/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/indent */
import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import Ban from 'App/Models/Ban'
import Channel from 'App/Models/Channel'
import Kick from 'App/Models/Kick'
import Member from 'App/Models/Member'
import User from 'App/Models/User'

export default class KicksController{
    private async removeUser(channelId: number, user: string) {
        await Member.query().where('user_id', user).where('channel_id', channelId).first()
    }

    private async banUser(channelId: number, user: string) {
        await Ban.create({
            bannedUser: user,
            bannedIn:channelId,
        })
    }

    async kick({params, auth}: WsContextContract, kickedUser : string) {
        const channel = await Channel.findByOrFail('channel_name', params.name)
        const channelAdmin = channel.admin

        if (channelAdmin === auth.user?.id) {
            this.removeUser(channel.id, kickedUser)
            this.banUser(channel.id, kickedUser)
        } else {
            const kicks = await Kick.create({
                kickedUser: kickedUser,
                kickedBy: auth.user?.id,
                kickedIn: channel.id,
            })
            const kCount = (await Kick.query().where('kicked_user', kickedUser).where('kicked_in', channel.id)).length
            if (kCount === 1) {
                this.removeUser(channel.id, kickedUser)
            } else if (kCount === 3) {
                this.banUser(channel.id, kickedUser)
            }
        }

        return await User.find(kickedUser)
    }

    async revoke({ params, auth }: WsContextContract, revokedUser : string) {
        const channel = await Channel.findByOrFail('channel_name', params.name)
        if (channel.admin === auth.user?.id) {
            this.removeUser(channel.id, revokedUser)
            return await User.find(revokedUser)
        }

        return null
    }
}