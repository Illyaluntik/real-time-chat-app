import { MutationTree } from 'vuex';
import { Account } from '../account/state';
import { ChannelInterface, ChannelsStateInterface, Message } from './state';

const mutation: MutationTree<ChannelsStateInterface> = {
  // setChannels: (state, dto: Array<ChannelInterface>) => state.channel = dto,
  // setActiveChannel: (state, id: string | null) => state.activeChannel = id
  // setActiveChannel: (state, id: string) => state.activeChannel = state.dto?.find((v) => v.id === id) || null
  setActiveChannel(state, channel: string | null) {
    state.activeChannel = channel;
  },

  setChannel(state, channel: ChannelInterface) {
    console.log(channel);
    state.channel = channel;
  },

  newMessage(state, { channel, message } : { channel : string, message: Message }) {
    state.messages[channel].push(message);
  },

  loadMessages(state, { channel, messages } : { channel : string, messages : Message[] }) {
    state.messages[channel] = messages;
  },

  loadMembers(state, { channel, members } : {channel: string, members:Account[]}) {
    state.members[channel] = members;
  },

  addMember(state, { channel, newMember } : {channel: string, newMember: Account}) {
    state.members[channel].push(newMember);
  },

  removeMember(state, { channel, member } : {channel: string, member: Account}) {
    const mIndex = state.members[channel].indexOf(member, 0);
    if (mIndex !== undefined) {
      state.members[channel].splice(mIndex, 1);
    }
  }
};

export default mutation;
