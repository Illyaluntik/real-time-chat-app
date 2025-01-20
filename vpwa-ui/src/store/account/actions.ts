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

  async createChannel(state, data: NewChannelInterface) {
    state.commit('busy', true);
    const newChannel = await channelService.join(data.channelName).addNewChannel(data);
    state.commit('newChannel', newChannel);
    state.commit('busy', false);
  },

  async leaveChannel(state, channel: string) {
    state.commit('busy', true);
    const leftChannel = await channelService.in(channel)?.leaveChannel(channel);
    state.commit('removeChannel', channel);
    if (leftChannel === null) {
      activityService.removeChannel(channel);
    }
    state.commit('busy', false);
  },

  async joinChannel(state, { channelName, isPrivate }: {channelName:string, isPrivate:boolean}) {
    state.commit('busy', true);
    const joinedChannel = await channelService.join(channelName).joinChannel(isPrivate);
    state.commit('newChannel', joinedChannel);
    state.commit('busy', false);
  },

  async logout(state) {
    try {
      state.commit('busy', true);
      await API.logout();
      authManager.removeToken();
      state.commit('setUser', null);
      // state.commit('setUserStatus', 'online');
      state.commit('busy', false);
    } catch (error) {
      console.log(error);
    }
  }
};

export default actions;
