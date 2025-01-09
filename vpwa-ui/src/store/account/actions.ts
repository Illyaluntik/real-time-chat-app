/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ActionTree } from 'vuex';
import { authManager, channelService, activityService } from 'src/services';
import { StateInterface } from '../index';
import {
  AccountLoginData, AccountRegisterData, AccountStateInterface, AccountStatus
} from './state';
import API from './api';
import { NewChannelInterface } from '../channels/state';

const actions: ActionTree<AccountStateInterface, StateInterface> = {
  async register(state) {
    try {
      state.commit('busy', true);
      const data: AccountRegisterData = state.state.registerData;
      const apiToken = await API.register(data);
      authManager.setToken(apiToken.token);
      state.commit('busy', false);
      return apiToken;
    } catch (error) {
      state.commit('busy', false);
      throw error;
    }
  },
  async login(state) {
    try {
      state.commit('busy', true);
      const data: AccountLoginData = state.state.loginData;
      const apiToken = await API.login(data);
      authManager.setToken(apiToken.token);
      state.commit('busy', false);
      return apiToken;
    } catch (error) {
      state.commit('busy', false);
      throw error;
    }
  },
  async check(state) {
    try {
      state.commit('busy', true);
      const account = await API.me();
      state.commit('setUser', account);
      state.commit('busy', false);
      return account !== null;
    } catch (error) {
      state.commit('busy', false);
      throw error;
    }
  },
  changeStatus(state, status: AccountStatus) {
    state.commit('setUserStatus', status);
    activityService.changeStatus(status);
  },

  // eslint-disable-next-line @typescript-eslint/require-await
  // async getUserChannels(state, id:string) {
  //   try {
  //     state.commit('busy', true);
  //     // const channels = await API.getChannels(id);
  //     // state.commit('setChannels', channels);
  //     state.commit('busy', false);
  //     console.log(id);
  //     return null;
  //   } catch (error) {
  //     state.commit('busy', false);
  //     throw error;
  //   }
  // },

  async createChannel(state, data: NewChannelInterface) {
    const newChannel = await channelService.join(data.channelName).addNewChannel(data);
    state.commit('newChannel', newChannel);
  },

  async leaveChannel(state, channel: string) {
    const leftChannel = await channelService.in(channel)?.leaveChannel(channel);
    state.commit('removeChannel', leftChannel);
    if (leftChannel === null) {
      activityService.removeChannel(channel);
    }
  },

  async joinChannel(state, { channelName, isPrivate }: {channelName:string, isPrivate:boolean}) {
    const joinedChannel = await channelService.join(channelName).joinChannel(isPrivate);
    state.commit('newChannel', joinedChannel);
  },

  async logout(state) {
    try {
      await API.logout();
      authManager.removeToken();
      state.commit('setUser', null);
      // state.commit('setUserStatus', 'online');
    } catch (error) {
      console.log(error);
    }
  }
  // async logout(state) {
  //   state.commit('busy', true);

  //   const [, err] = await API.logout();

  //   if (err) {
  //     state.commit('busy', false);
  //     throw err;
  //   }

  //   state.commit('setUser', null);
  //   state.commit('setUserStatus', 'online');
  //   state.commit('busy', false);
  // },
};

export default actions;
