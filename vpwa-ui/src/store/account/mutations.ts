import { MutationTree } from 'vuex';
import { AccountStateInterface, AccountDtoInterface, AccountInvitesInterface } from './state';

const mutation: MutationTree<AccountStateInterface> = {
  updateUsername: (state, value: string) => state.loginData.username = value,
  updatePassword: (state, value: string) => state.loginData.password = value,
  updateFullName: (state, value: string) => state.registerData.fullName = value,
  updateEmail: (state, value: string) => state.registerData.email = value,
  updateRegisterUsername: (state, value: string) => state.registerData.username = value,
  updateRegisterPassword: (state, value: string) => state.registerData.password = value,
  setUser: (state, dto: AccountDtoInterface) => state.dto = dto,
  setInvites: (state, dto: AccountInvitesInterface) => state.invites = dto,
  busy: (state, value: boolean) => state.state.busy = value
};

export default mutation;
