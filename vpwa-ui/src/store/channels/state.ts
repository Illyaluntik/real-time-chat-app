/* eslint-disable camelcase */
import { Account } from '../account/state';

export interface ChannelInterface {
  id: number,
  adminId: string,
  name: string,
  isPrivate: boolean
}

export interface NewChannelInterface {
  channelName: string,
  isPrivate: boolean,
  adminId: string
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

export interface ChannelsStateInterface {
  channel: ChannelInterface | null;
  activeChannel: string | null;
  messages: {[channel: string]: Message[]};
  members: {[channel: string]: Account[]};
  membersStatus: Record<string, 'online' | 'offline' | 'dnd'>;
  membersEnum: {[channel: string]: Record<string, string>};
  loading: boolean;
}

function state(): ChannelsStateInterface {
  return {
    channel: null,
    activeChannel: null,
    messages: {},
    members: {},
    membersEnum: {},
    membersStatus: {},
    loading: false
  };
}

export default state;
