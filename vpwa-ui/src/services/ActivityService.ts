import { Account } from 'src/store/account/state';
import { authManager } from '.';
import { SocketManager } from './SocketManager';

class ActivitySocketManager extends SocketManager {
  public subscribe(): void {
    this.socket.on('user:list', (onlineUsers: Account[]) => {
      console.log('Online users list', onlineUsers);
    });

    this.socket.on('user:online', (user: Account) => {
      console.log('User is online', user);
    });

    this.socket.on('user:offline', (user: Account) => {
      console.log('User is offline', user);
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
