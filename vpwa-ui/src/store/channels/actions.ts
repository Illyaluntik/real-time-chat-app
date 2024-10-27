import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ChannelsStateInterface } from './state';
import API from './api';

const actions: ActionTree<ChannelsStateInterface, StateInterface> = {
  async getChannels(state) {
    console.log('getChannels');
    const [res, err] = await API.getChannels();

    if (err)
      throw err;

    state.commit('setChannels', res?.data);
  }
};

export default actions;
