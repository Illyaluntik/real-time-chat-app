import { MutationTree } from 'vuex';
import { Account, AccountStatus } from '../account/state';
import { ChannelInterface, ChannelsStateInterface, Message } from './state';

const mutation: MutationTree<ChannelsStateInterface> = {
  setActiveChannel(state, channel: string | null) {
    state.activeChannel = channel;
  },

  setChannel(state, channel: ChannelInterface) {
    state.channel = channel;
  },

  newMessage(state, { channel, message } : { channel : string, message: Message }) {
    console.log(message);
    const messages = state.messages[channel].slice();
    messages.push(message);
    state.messages[channel] = messages;
  },

  setMessages(state, { channel, messages } : { channel : string, messages: Message[] }) {
    state.messages[channel] = messages;
  },

  setMembers(state, { channel, members } : { channel: string, members: Account[] }) {
    state.members[channel] = members;
  },

  setMemberEnum(state, { channel, members } : { channel: string, members: Account[] }) {
    console.log(channel);
    if (!state.membersEnum[channel])
      state.membersEnum[channel] = {};
    members.forEach((m) => {
      state.membersEnum[channel][m.id] = m.username;
    });
  },

  setMemberStatus(state, { username, status } : { username: string, status: AccountStatus }) {
    state.membersStatus[username] = status;
  },

  clearMemberStatuses(state) {
    state.membersStatus = {};
  },

  addMember(state, { channel, newMember } : { channel: string, newMember: Account }) {
    state.members[channel].push(newMember);
  },

  removeMember(state, { channel, member } : { channel: string, member: Account }) {
    const mIndex = state.members[channel].indexOf(member, 0);
    if (mIndex !== undefined) {
      state.members[channel].splice(mIndex, 1);
    }
  }
};

export default mutation;
