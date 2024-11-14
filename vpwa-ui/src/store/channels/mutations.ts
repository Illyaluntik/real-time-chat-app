import { MutationTree } from 'vuex';
import { ChannelsStateInterface, Message } from './state';

const mutation: MutationTree<ChannelsStateInterface> = {
  // setChannels: (state, dto: Array<ChannelInterface>) => state.channel = dto,
  // setActiveChannel: (state, id: string | null) => state.activeChannel = id
  // setActiveChannel: (state, id: string) => state.activeChannel = state.dto?.find((v) => v.id === id) || null
  setActiveChannel(state, channel:string) {
    state.activeChannel = channel;
  },

  newMessage(state, { channel, message } : {channel : string, message: Message}) {
    state.messages[channel].push(message);
  },

  loadMessages(state, { channel, messages } : {channel : string, messages : Message[]}) {
    state.messages[channel] = messages;
  }
};

export default mutation;
