import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ChannelsStateInterface } from './state';

const getters: GetterTree<ChannelsStateInterface, StateInterface> = {
  channels: (state) => state.dto,
  activeChannel: (state) => state.activeChannel
};

export default getters;
