/* eslint-disable @typescript-eslint/no-unsafe-return */
import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ChannelsStateInterface } from './state';

const getters: GetterTree<ChannelsStateInterface, StateInterface> = {
  channels: (state) => state.channel,
  activeChannel: (state) => state.activeChannel,
  chat(state) {
    return state.activeChannel ? state.messages[state.activeChannel] : null;
  },
  members(state) {
    return state.activeChannel ? state.members[state.activeChannel] : null;
  }

};

export default getters;
