import { Account, AccountStatus } from 'src/store/account/state';
import { ChannelInterface } from 'src/store/channels/state';
import { authManager } from '.';
import { BootParams, SocketManager } from './SocketManager';

class ActivitySocketManager extends SocketManager {
  public subscribe({ store }: BootParams): void {
    this.socket.on('user:list', (onlineUsers: Account[]) => {
      onlineUsers.forEach((u) => {
        store.commit('channels/setMemberStatus', { username: u.username, status: 'online' });
      });
    });

    this.socket.on('user:status', (user: Account, status: AccountStatus) => {
      store.commit('channels/setMemberStatus', { username: user.username, status });
    });

    this.socket.on('channels', (channels: ChannelInterface[]) => {
      store.commit('account/setChannels', channels);
    });

    this.socket.on('invited', (newChannel: ChannelInterface) => {
      store.commit('account/newChannel', newChannel);
    });

    this.socket.on('deleteChannel', (channel: ChannelInterface) => {
      store.commit('account/removeChannel', channel);
    });

    // add event for new message in other channel

    authManager.onChange((token) => {
      if (token) {
        this.socket.connect();
      } else {
        this.socket.disconnect();
      }
    });
  }

  changeStatus(status: AccountStatus) {
    this.socket.emit('changeStatus', status);
  }

  public invite(channel: string, user: string) {
    this.socket.emit('invite', channel, user);
  }

  public removeChannel(channel: string) {
    this.socket.emit('deleteChannel', channel);
  }
}

export default new ActivitySocketManager('/');
