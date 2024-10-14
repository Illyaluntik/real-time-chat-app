export interface AccountDtoInterface {
  id: string,
  username: string,
  email: string,
  firstName: string,
  lastName: string
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

export interface AccountStateInterface {
  dto: AccountDtoInterface | null,
  invites: AccountInvitesInterface | null,
  loginData: AccountLoginData,
  registerData: AccountRegisterData,
  state: StoreStateInterfase
}

function state(): AccountStateInterface {
  return {
    dto: null,
    invites: null,
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
