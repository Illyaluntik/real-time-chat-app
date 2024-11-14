import { ActionTree } from 'vuex';
import { authManager } from 'src/services';
import { StateInterface } from '../index';
import { AccountLoginData, AccountRegisterData, AccountStateInterface } from './state';
import API from './api';

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

  async getUserChannels(state, id:string) {
    try {
      state.commit('busy', true);
      const channels = await API.getChannels(id);
      state.commit('setChannels', channels);
      state.commit('busy', false);
      return channels;
    } catch (error) {
      state.commit('busy', false);
      throw error;
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
