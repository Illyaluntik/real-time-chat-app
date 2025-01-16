/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/indent */
import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import Ban from 'App/Models/Ban'
import Channel from 'App/Models/Channel'
import Member from 'App/Models/Member'
import User from 'App/Models/User'

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
      accepted: true,
    })
    return channel
  }

  async joinChannel ({params, auth, socket}: WsContextContract, isPrivate: boolean) {
    let channel = await Channel.findBy('channel_name', params.name)
    const user = await User.find(auth.user?.id)
    if (channel === null) {
      // does not exist
      channel = await Channel.create({
        channelName: params.name,
        isPrivate: isPrivate,
        admin: auth.user?.id,
      })
    } else {
      // check if banned
      if (channel.isPrivate) {
        return null
      }

      const banned = await Ban.query().where('banned_user', user!.id).where('banned_in', channel.id).first()
      if (banned !== null) {
        return null
      }
    }

    const member = await Member.create({
      userId: auth.user?.id,
      channelId: channel?.id,
      accepted: true,
    })

    socket.broadcast.emit('newMember', user)
    return channel
  }

  async getChannel ({params}: WsContextContract) {
    return await Channel.findBy('channel_name', params.name)
  }
}
