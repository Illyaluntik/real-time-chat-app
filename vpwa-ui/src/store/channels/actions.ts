import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ChannelsStateInterface, NewCahnnelData } from './state';
import API from './api';

const actions: ActionTree<ChannelsStateInterface, StateInterface> = {
  async getChannels(state) {
    const [res, err] = await API.getChannels();

    if (err)
      throw err;

    state.commit('setChannels', res?.data);
  },
  async createChannel(state, data: NewCahnnelData) {
    console.log(data);
    const [res, err] = await API.createChannel(data);

    if (err)
      throw err;

    return res;
  },
  async leaveChannel(state, userId) {
    const data = {
      channel_id: state.getters.activeChannel,
      user_id: userId
    };

    const [res, err] = await API.leaveChannel(data);

    if (err)
      throw err;

    state.commit('setActiveChannel', null);
    return res;
  }
};

export default actions;
