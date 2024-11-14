/* eslint-disable camelcase */
import { Account } from '../account/state';

export interface ChannelInterface {
  id: number,
  adminId: string,
  name: string,
  isPrivate: boolean
}

export interface Message {
  id: number,
  author: string,
  body: string,
  sent_in: boolean,
  sent_at: number
}

export interface ChatsInterface {
  [channelId: number]: {
    total: number,
    messages: Array<Message>
  }
}

export interface NewChannelData {
  isPrivate: boolean,
}

// export interface ChannelsStateInterface {
//   channel: Array<ChannelInterface> | null;
//   activeChannel: string | null,
//   chats: ChatsInterface | null,
//   newChannelData: NewChannelData
// }

export interface ChannelsStateInterface {
  channel: ChannelInterface | null;
  activeChannel: string | null;
  messages: {[channel: string]: Message[]};
  members: Array<Account> | null;
  loading: boolean;
}

function state(): ChannelsStateInterface {
  return {
    channel: null,
    activeChannel: null,
    messages: {},
    members: null,
    loading: false
  };
}

export default state;
