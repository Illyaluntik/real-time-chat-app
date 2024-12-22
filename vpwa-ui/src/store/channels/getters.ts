/* eslint-disable @typescript-eslint/no-unsafe-return */
import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ChannelsStateInterface } from './state';

const getters: GetterTree<ChannelsStateInterface, StateInterface> = {
  channel: (state) => state.channel,
  activeChannel: (state) => state.activeChannel,
  chat(state) {
    return state.activeChannel ? state.messages[state.activeChannel] : null;
  },
  members(state) {
    return state.activeChannel ? state.members[state.activeChannel] : null;
  },
  membersEnum(state) {
    return state.activeChannel ? state.membersEnum[state.activeChannel] : null;
  },
  membersStatus(state) {
    return state.membersStatus;
  }
};

export default getters;
