/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Account } from 'src/store/account/state';
import { ChannelInterface, Message, NewChannelInterface } from 'src/store/channels/state';
import { BootParams, SocketManager } from './SocketManager';

// creating instance of this class automatically connects to given socket.io namespace
// subscribe is called with boot params, so you can use it to dispatch actions for socket events
// you have access to socket.io socket using this.socket
class ChannelSocketManager extends SocketManager {
  public subscribe({ store }: BootParams): void {
    const channel = this.namespace.split('/').pop() as string;

    this.socket.on('message', (message: Message) => {
      store.commit('channels/newMessage', { channel, message });
    });
  }

  public addMessage(message: string): Promise<Message> {
    return this.emitAsync('addMessage', message);
  }

  public loadMessages(): Promise<Message[]> {
    return this.emitAsync('loadMessages');
  }

  public addNewChannel(newChannel: NewChannelInterface): Promise<ChannelInterface> {
    return this.emitAsync('createChannel', newChannel);
  }

  public leaveChannel(name: string): Promise<ChannelInterface> {
    return this.emitAsync('leaveChannel', name);
  }

  public loadMembers(): Promise<Account[]> {
    return this.emitAsync('loadMembers');
  }

  public addMember(username: string): Promise<Account> {
    return this.emitAsync('addMember', username);
  }

  public handleKick(username: string): Promise<Account> {
    return this.emitAsync('handleKick', username);
  }

  public revokeMember(username: string): Promise<Account> {
    return this.emitAsync('revokeMember', username);
  }

  public joinChannel(isPrivate: boolean): Promise<ChannelInterface> {
    return this.emitAsync('joinChannel', isPrivate);
  }

  public getChannel(): Promise<ChannelInterface> {
    return this.emitAsync('getChannel');
  }
}

class ChannelService {
  private channels: Map<string, ChannelSocketManager> = new Map()

  public join(name: string): ChannelSocketManager {
    if (this.channels.has(name)) {
      throw new Error(`User is already joined in channel "${name}"`);
    }

    // connect to given channel namespace
    const channel = new ChannelSocketManager(`/channels/${name}`);
    this.channels.set(name, channel);
    return channel;
  }

  public leave(name: string): boolean {
    const channel = this.channels.get(name);

    if (!channel) {
      return false;
    }

    // disconnect namespace and remove references to socket
    channel.destroy();
    return this.channels.delete(name);
  }

  public in(name: string): ChannelSocketManager | undefined {
    return this.channels.get(name);
  }
}

export default new ChannelService();
