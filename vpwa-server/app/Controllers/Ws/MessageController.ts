import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import { inject } from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'
import Message from 'App/Models/Message'
import Channel from 'App/Models/Channel'

// inject repository from container to controller constructor
// we do so because we can extract database specific storage to another class
// and also to prevent big controller methods doing everything
// controler method just gets data (validates it) and calls repository
// also we can then test standalone repository without controller
// implementation is bind into container inside providers/AppProvider.ts
@inject(['Repositories/MessageRepository'])
export default class MessageController {
  //constructor (private messageRepository: MessageRepositoryContract) {}

  public async loadMessages ({ params }: WsContextContract) {
    const channelId = await (await Channel.findByOrFail('channel_name', params.name)).id
    const channelMessages = await Database.query().from('messages').select('*').where('sent_in', channelId)
    return channelMessages
  }

  public async addMessage ({ params, socket, auth }: WsContextContract, content: string) {
    const channel = await (await Channel.findByOrFail('channel_name', params.name))
    const msg = await Message.create({
      author: auth.user!.id,
      sent_in: channel.id,
      body: content,
    })

    await Channel
      .query()
      .where('channel_name', params.name)
      .update({ total: channel.total + 1 })

    // broadcast message to other users in channel
    socket.broadcast.emit('message', msg)
    // return message to sender
    return msg
  }
}
