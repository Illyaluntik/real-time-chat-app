/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/indent */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Member from 'App/Models/Member'
import Channel from 'App/Models/Channel'
import Database from '@ioc:Adonis/Lucid/Database'

export default class MembersController {
  // invites
  async invite ({ request, response }: HttpContextContract) {
    const data = request.body()
    const member = await Member.create({
      userId: data.userId,
      channelId: data.channelId,
    })
    return response.status(200).send(member)
  }

  // get all channels (cez user_id)
  async load ({ request, response }) {
    const id = request.input('userId')
    const channels = await Database
      .from('channels')
      .join('members', 'channels.id', '=', 'members.channel_id')
      .select('channels.channel_name', 'channels.id', 'channels.is_private')
      .where('members.user_id', id)
    return response.status(200).send(channels)
  }

  // get channel members (cez channel_id)
  async members ({ request, response }) {
    const id = request.input('channel_id')
    const members = await Database
      .from('users')
      .join('members', 'members.user_id', '=', 'users.id')
      .select('users.id', 'users.username')
      .where('members.channel_id', id)
    return response.status(200).send(members)
  }

  // leave
  async leave ({ request }) {
    // const { userId, channelId } = request.all()
    const userId = request.input('user_id')
    const channelId = request.input('channel_id')

    const channel = await Channel.find(channelId)
    if (channel?.admin === userId) {
      await Member.query().where('channel_id', channelId).delete()
      await channel?.delete()
    } else {
      const membership = await Member.findBy('channel_id', channelId)
      await membership?.delete()
    }
  }
}
