import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ChannelsStateInterface } from './state';

const getters: GetterTree<ChannelsStateInterface, StateInterface> = {
  channels: (state) => state.dto,
  activeChannel: (state) => state.activeChannel,
  // chat: (state) => (state.activeChannel ? state.chats?.[state.activeChannel.id] : null)
  chat: (state) => (state.activeChannel ? state.chats?.[state.activeChannel] : null)
};

export default getters;
