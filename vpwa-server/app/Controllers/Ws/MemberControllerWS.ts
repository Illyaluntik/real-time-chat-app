/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/indent */
import Database from '@ioc:Adonis/Lucid/Database'
import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import Channel from 'App/Models/Channel'
import Member from 'App/Models/Member'
import User from 'App/Models/User'

export default class MembersController {
    async leaveChannel({ auth }: WsContextContract, name: string) {
        const userId = auth.user?.id
        const channelId = await (await Channel.findByOrFail('channel_name', name)).id

        const channel = await Channel.find(channelId)
        if (channel?.admin === userId) {
            await Member.query().where('channel_id', channelId).delete()
            await channel?.delete()
        } else {
            const membership = await Member.findBy('channel_id', channelId)
            await membership?.delete()
        }
        return channel
    }

    async loadMembers({ params }: WsContextContract) {
        const id = await (await Channel.findByOrFail('channel_name', params.name)).id
        const members = await Database
            .from('users')
            .join('members', 'members.user_id', '=', 'users.id')
            .select('users.id', 'users.username')
            .where('members.channel_id', id)
        return members
    }

    async addMember({ params, socket, auth }: WsContextContract, newUser: string) {
        console.log(socket)
        const user = await User.findByOrFail('username', newUser)
        const channel = await (await Channel.findByOrFail('channel_name', params.name))
        if (!channel.isPrivate || channel.isPrivate && channel.admin === auth.user?.id) {
            const member = await Member.create({
                userId: user.id,
                channelId: channel.id,
            })
        }
        return user
    }
}
