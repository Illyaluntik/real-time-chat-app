/*
|--------------------------------------------------------------------------
| Websocket events
|--------------------------------------------------------------------------
|
| This file is dedicated for defining websocket namespaces and event handlers.
|
*/

import Ws from '@ioc:Ruby184/Socket.IO/Ws'

Ws.namespace('/')
  .connected('ActivityController.onConnected')
  .disconnected('ActivityController.onDisconnected')
  .on('hello', ({ socket }, msg: string) => {
    console.log('websocket greeted: ', socket.id, msg)
    return 'hi'
  })
  .on('changeStatus', 'ActivityController.onChangeStatus')
  .on('invite', 'ActivityController.inviteMember')

// this is dynamic namespace, in controller methods we can use params.name
Ws.namespace('channels/:name')
// .middleware('channel') // check if user can join given channel
  .on('loadMessages', 'MessageController.loadMessages')
  .on('addMessage', 'MessageController.addMessage')

  .on('createChannel', 'ChannelControllerWS.createChannel')
  .on('joinChannel', 'ChannelControllerWS.joinChannel')
  .on('getChannel', 'ChannelControllerWS.getChannel')

  .on('leaveChannel', 'MemberControllerWS.leaveChannel')
  .on('loadMembers', 'MemberControllerWS.loadMembers')
  .on('addMember', 'MemberControllerWS.addMember')

  .on('handleKick', 'KickControllerWS.kick')
  .on('revokeMember', 'KickControllerWS.revoke')
