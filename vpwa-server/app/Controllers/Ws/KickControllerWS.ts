/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/indent */
import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import Ban from 'App/Models/Ban'
import Channel from 'App/Models/Channel'
import Kick from 'App/Models/Kick'
import Member from 'App/Models/Member'
import User from 'App/Models/User'

export default class KicksController {
    private async removeUser(channelId: number, user: string) {
        await Member.query().where('user_id', user).where('channel_id', channelId).delete()
    }

    private async banUser(channelId: number, user: string) {
        const banned = await Ban.create({
            bannedUser: user,
            bannedIn: channelId,
        })
        return banned
    }

    async kick({ params, auth, socket }: WsContextContract, kickedUser: string) {
        const channel = await Channel.findByOrFail('channel_name', params.name)
        const channelAdmin = channel.admin
        const user = await User.findBy('username', kickedUser)

        if (user?.id === auth.user?.id) {
            return null
        }

        if (user?.id === channelAdmin) {
            return null
        }

        if (channelAdmin === auth.user?.id) {
            this.banUser(channel.id, user!.id)
            this.removeUser(channel.id, user!.id)
            await Kick.query().where('kicked_user', user!.id).where('kicked_in', channel.id).delete()
            socket.nsp.emit('removedUser', params.name, user)
        } else {
            // eslint-disable-next-line max-len
            const kickCheck = await Kick.query().where('kicked_user', user!.id).where('kicked_by', auth.user!.id).where('kicked_in', channel.id).first()

            if (kickCheck !== null) {
                return null
            }

            const kicks = await Kick.create({
                kickedUser: user?.id,
                kickedBy: auth.user?.id,
                kickedIn: channel.id,
            })
            const kCount = (await Kick.query().where('kicked_user', user!.id).where('kicked_in', channel.id)).length
            if (kCount === 1) {
                this.removeUser(channel.id, user!.id)
            } else if (kCount === 3) {
                this.banUser(channel.id, user!.id)
                // await Kick.query().where('kicked_user', user!.id).where('kicked_in', channel.id).delete()
            }
        }

        return user
    }

    async revoke({ params, auth }: WsContextContract, revokedUser: string) {
        const channel = await Channel.findBy('channel_name', params.name)
        const user = await User.findBy('username', revokedUser)
        if (channel?.admin === auth.user?.id) {
            this.removeUser(channel!.id, user!.id)
            return user
        }

        return null
    }
}
