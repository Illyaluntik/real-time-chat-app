import { MutationTree } from 'vuex';
import { ChannelsDtoInterface, ChannelsStateInterface } from './state';

const mutation: MutationTree<ChannelsStateInterface> = {
  setChannels: (state, dto: ChannelsDtoInterface) => state.dto = dto,
  setActiveChannel: (state, id: string) => state.activeChannel = id
};

export default mutation;
