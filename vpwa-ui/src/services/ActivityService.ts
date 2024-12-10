import { Account } from 'src/store/account/state';
import { ChannelInterface } from 'src/store/channels/state';
import { authManager } from '.';
import { BootParams, SocketManager } from './SocketManager';

class ActivitySocketManager extends SocketManager {
  public subscribe({ store }: BootParams): void {
    this.socket.on('user:list', (onlineUsers: Account[]) => {
      console.log('Online users list', onlineUsers);
    });

    this.socket.on('user:online', (user: Account) => {
      console.log('User is online', user);
    });

    this.socket.on('user:offline', (user: Account) => {
      console.log('User is offline', user);
    });

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
}

export default new ActivitySocketManager('/');
