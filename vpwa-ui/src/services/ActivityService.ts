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

    // this.socket.on('user:online', (user: Account) => {
    //   store.commit('channels/setMemberStatus', { username: user.username, status: 'online' });
    // });

    // this.socket.on('user:offline', (user: Account) => {
    //   store.commit('channels/setMemberStatus', { username: user.username, status: 'offline' });
    // });

    // this.socket.on('user:dnd', (user: Account) => {
    //   store.commit('channels/setMemberStatus', { username: user.username, status: 'dnd' });
    // });

    this.socket.on('channels', (channels: ChannelInterface[]) => {
      console.log(channels);
      store.commit('account/setChannels', channels);
    });

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
}

export default new ActivitySocketManager('/');
