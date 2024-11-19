/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/indent */
import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import Channel from 'App/Models/Channel'
import Member from 'App/Models/Member'

export default class MembersController {
    async leaveChannel ({ auth }: WsContextContract, name: string) {
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
}
