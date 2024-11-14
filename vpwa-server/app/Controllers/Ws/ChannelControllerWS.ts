/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/indent */
import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import Channel from 'App/Models/Channel'
import Member from 'App/Models/Member'

export default class ChannelsController {
  // create new channel
  async createChannel ({ params }: WsContextContract) {
    console.log(params)
    // const channel = await Channel.create({
    //   channelName: params.channelName,
    //   isPrivate: params.isPrivate,
    //   admin: params.admin,
    // })

    // const member = await Member.create({
    //   userId: params.admin,
    //   channelId: channel.id,
    // })
    // return channel
  }
}
