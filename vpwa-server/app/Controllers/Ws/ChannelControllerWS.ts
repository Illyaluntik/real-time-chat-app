/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/indent */
import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import Channel from 'App/Models/Channel'
import Member from 'App/Models/Member'

export default class ChannelsController {
  // create new channel
  async createChannel ({ params }: WsContextContract, channelInfo) {
    console.log(channelInfo)
    const channel = await Channel.create({
      channelName: channelInfo.channelName,
      isPrivate: channelInfo.isPrivate,
      admin: channelInfo.adminId,
    })

    const member = await Member.create({
      userId: channelInfo.adminId,
      channelId: channel.id,
    })
    return channel
  }

  async joinChannel({params, auth}: WsContextContract, isPrivate: boolean) {
    let channel = await Channel.findBy('channel_name', params.name)
    if (channel === null) {
      // does not exist
      channel = await Channel.create({
        channelName: params.name,
        isPrivate: isPrivate,
        admin: auth.user?.id,
      })
    }

    const member = await Member.create({
      userId: auth.user?.id,
      channelId: channel?.id,
    })

    return channel
  }

  async getChannel({params}: WsContextContract) {
    return await Channel.findBy('channel_name', params.name)
  }
}
