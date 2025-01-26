import { MutationTree } from 'vuex';
import { ChannelInterface } from '../channels/state';
import {
  AccountStateInterface, Account, AccountLoginData, AccountRegisterData
} from './state';

interface LoginDataPayload {
  field: 'username' | 'password',
  value: string
}

interface RegisterDataPayload {
  field: 'fullName' | 'email' | 'username' | 'password',
  value: string
}

const mutation: MutationTree<AccountStateInterface> = {
  updateLoginData: (state, payload: LoginDataPayload) => state.loginData[payload.field] = payload.value,
  resetLoginForm: (state, loginData?: AccountLoginData) => state.loginData = {
    username: loginData?.username ?? '', password: loginData?.password ?? ''
  },
  updateRegisterData: (state, payload: RegisterDataPayload) => state.registerData[payload.field] = payload.value,
  resetRegisterForm: (state, registerData?: AccountRegisterData) => state.registerData = {
    fullName: registerData?.fullName ?? '', email: registerData?.email ?? '', username: registerData?.username ?? '', password: registerData?.password ?? ''
  },
  setUser: (state, dto: Account) => state.account = dto,
  setUserStatus: (state, status: 'online' | 'offline' | 'dnd') => state.status = status,
  setChannels(state, channels: Array<ChannelInterface>) {
    state.channels = channels;
  },
  busy: (state, value: boolean) => state.state.busy = value,
  newChannel(state, channel: ChannelInterface) {
    if (!state.channels?.some((c) => c.id === channel.id))
      state.channels?.unshift(channel);
  },
  removeChannel(state, channel: string) {
    const cIndex = state.channels?.findIndex((element) => element.channelName === channel);
    if (cIndex !== undefined && cIndex !== -1) {
      state.channels?.splice(cIndex, 1);
    }
  }
};

export default mutation;
