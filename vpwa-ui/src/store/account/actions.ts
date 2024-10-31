import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { AccountLoginData, AccountRegisterData, AccountStateInterface } from './state';
import API from './api';

const actions: ActionTree<AccountStateInterface, StateInterface> = {
  async login(state) {
    state.commit('busy', true);
    const data: AccountLoginData = state.state.loginData;

    const [, err] = await API.login(data);

    if (err) {
      state.commit('busy', false);
      throw err;
    }

    state.commit('busy', false);
  },
  async logout(state) {
    state.commit('busy', true);

    const [, err] = await API.logout();

    if (err) {
      state.commit('busy', false);
      throw err;
    }

    state.commit('setUser', null);
    state.commit('setUserStatus', 'online');
    state.commit('busy', false);
  },
  async register(state) {
    state.commit('busy', true);
    const data: AccountRegisterData = state.state.registerData;

    const [, err] = await API.register(data);

    if (err) {
      state.commit('busy', false);
      throw err;
    }

    state.commit('busy', false);
  },
  async getAccount(state) {
    const [res, err] = await API.getAccount();

    if (err)
      throw err;

    state.commit('setUser', res?.data);
  },
  async getInvites(state) {
    // (method) getAccount(): Promise<readonly [AxiosResponse<AccountDtoInterface> | undefined, (Error | undefined)?]>
    const [res, err] = await API.getInvites();

    if (err)
      throw err;

    state.commit('setInvites', res?.data);
  }
};

export default actions;
