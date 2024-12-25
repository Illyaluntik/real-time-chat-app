import { ChannelInterface } from '../channels/state';

export interface ApiToken {
  type: 'bearer'
  token: string
}

export interface Account {
  id: string,
  username: string,
  email: string,
  fullName: string
}

export interface AccountInviteInterface {
  id: string,
  channelId: string,
  inviteDate: number
}

export interface AccountInvitesInterface {
  invites: Array<AccountInviteInterface>
}

export interface AccountLoginData {
  username: string,
  password: string
}

export interface AccountRegisterData {
  fullName: string,
  email: string,
  username: string,
  password: string
}

export interface StoreStateInterfase {
  busy: boolean
}

export type AccountStatus = 'online' | 'offline' | 'dnd'

export interface AccountStateInterface {
  account: Account | null,
  channels: Array<ChannelInterface> | null,
  status: AccountStatus,
  loginData: AccountLoginData,
  registerData: AccountRegisterData,
  state: StoreStateInterfase
}

function state(): AccountStateInterface {
  return {
    account: null,
    channels: null,
    status: 'online',
    loginData: {
      username: '',
      password: ''
    },
    registerData: {
      fullName: '',
      email: '',
      username: '',
      password: ''
    },
    state: {
      busy: false
    }
  };
}

export default state;
