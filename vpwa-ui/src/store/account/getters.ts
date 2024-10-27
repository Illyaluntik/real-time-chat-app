import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { AccountStateInterface } from './state';

const getters: GetterTree<AccountStateInterface, StateInterface> = {
  user: (state) => state.dto,
  userStatus: (state) => state.status,
  loginData: (state) => state.loginData,
  registerData: (state) => state.registerData,
  busy: (state) => state.state.busy
};

export default getters;
