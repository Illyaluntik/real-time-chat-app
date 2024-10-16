import { MutationTree } from 'vuex';
import { ChannelInterface, ChannelsStateInterface } from './state';

const mutation: MutationTree<ChannelsStateInterface> = {
  setChannels: (state, dto: Array<ChannelInterface>) => state.dto = dto,
  // setActiveChannel: (state, id: string) => state.dto.filter() state.activeChannel = id
  setActiveChannel: (state, id: string) => state.activeChannel = state.dto?.find((v) => v.id === id) || null
};

export default mutation;
