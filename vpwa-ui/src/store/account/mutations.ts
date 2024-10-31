import { MutationTree } from 'vuex';
import {
  AccountStateInterface, AccountDtoInterface, AccountLoginData, AccountRegisterData, AccountInvitesInterface
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
  setUser: (state, dto: AccountDtoInterface) => state.dto = dto,
  setUserStatus: (state, status: 'online' | 'offline' | 'dnd') => state.status = status,
  setInvites: (state, dto: AccountInvitesInterface) => state.invites = dto,
  busy: (state, value: boolean) => state.state.busy = value
};

export default mutation;
