/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/indent */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Channel from 'App/Models/Channel'
import Member from 'App/Models/Member'

export default class ChannelsController {
  // create new channel
  async create ({ request, response }: HttpContextContract) {
    const data = await request.body()
    console.log(data)
    const channel = await Channel.create({
      channel_name: data.channel_name,
      is_private: data.is_private,
      admin: data.admin,
    })

    const member = await Member.create({
      userId: data.admin,
      channelId: channel.id,
    })
    return response.status(200).send(channel)
  }
}
