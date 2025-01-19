import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import Channel from 'App/Models/Channel'
import User from 'App/Models/User'

export default class ActivityController {
  private getUserRoom(user: User): string {
    return `user:${user.id}`
  }

  private checkAlive(channels: Channel[]) {
    
  }

  public async onConnected({ socket, auth, logger }: WsContextContract) {
    // all connections for the same authenticated user will be in the room
    const room = this.getUserRoom(auth.user!)
    const userSockets = await socket.in(room).allSockets()

    // this is first connection for given user
    if (userSockets.size === 0) {
      socket.broadcast.emit('user:status', auth.user, 'online')
    }

    // add this socket to user room
    socket.join(room)
    // add userId to data shared between Socket.IO servers
    // https://socket.io/docs/v4/server-api/#namespacefetchsockets
    socket.data.userId = auth.user!.id

    const allSockets = await socket.nsp.except(room).fetchSockets()
    const onlineIds = new Set<number>()

    for (const remoteSocket of allSockets) {
      onlineIds.add(remoteSocket.data.userId)
    }

    const onlineUsers = await User.findMany([...onlineIds])
    const usersChannels = await Channel.query().whereHas('members', (query) => {
      query.where('user_id', auth.user!.id)
    })
    socket.emit('channels', usersChannels)

    socket.emit('user:list', onlineUsers)

    logger.info('new websocket connection')
  }

  // see https://socket.io/get-started/private-messaging-part-2/#disconnection-handler
  public async onDisconnected({ socket, auth, logger }: WsContextContract, reason: string) {
    const room = this.getUserRoom(auth.user!)
    const userSockets = await socket.in(room).allSockets()

    // user is disconnected
    if (userSockets.size === 0) {
      // notify other users
      socket.broadcast.emit('user:status', auth.user, 'offline')
    }

    logger.info('websocket disconnected', reason)
  }

  public async onChangeStatus({ socket, auth }: WsContextContract, status: string) {
    socket.broadcast.emit('user:status', auth.user, status)
  }

  public async inviteMember({ socket }: WsContextContract, channelName: string, username: string) {
    const user = await User.findBy('username', username)
    const channel = await Channel.findBy('channel_name', channelName)
    const userRoom = this.getUserRoom(user!)
    socket.to(userRoom).emit('invited', channel)
  }

  public async addMember({auth, socket}: WsContextContract, channelName: string) {
    const user = await User.find(auth.user?.id)
    console.log(user)
    socket.broadcast.emit('newMember', channelName, user)
    return user
  }

  public async deleteChannel({socket}: WsContextContract, channelName: string) {
    const channel = await Channel.findBy('channel_name', channelName)
    socket.broadcast.emit('deleteChannel', channel)
    return channel
  }
}
