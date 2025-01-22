/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionTree } from 'vuex';
import channelService from 'src/services/ChannelService';
import { activityService } from 'src/services';
import { StateInterface } from '../index';
import { ChannelsStateInterface, Message } from './state';

const actions: ActionTree<ChannelsStateInterface, StateInterface> = {
  async join(state, channel: string) {
    state.commit('setLoading', true);
    if (channel === state.state.activeChannel)
      return;

    try {
      state.commit('setLoading', true);
      if (state.state.activeChannel)
        channelService.leave(state.state.activeChannel);
      channelService.join(channel);
      const members = await channelService.in(channel)?.loadMembers();
      const channelDetail = await channelService.in(channel)?.getChannel();
      state.commit('setMemberEnum', { channel, members });
      state.commit('setMembers', { channel, members });
      state.commit('setChannel', channelDetail);
      await state.dispatch('loadMessages', 1);
      state.commit('setLoading', false);
    } catch (err) {
      state.commit('setLoading', false);
      throw err;
    }
  },
  disconnectFromActive(state) {
    state.commit('setLoading', true);
    if (state.state.activeChannel) {
      channelService.leave(state.state.activeChannel);
      state.commit('setActiveChannel', null);
      state.commit('setMessages', { channel: state.state.activeChannel, messages: [] });
    }
    state.commit('setLoading', false);
  },

  leave(state, channel: string) {
    if (channel === state.state.activeChannel)
      state.commit('removeChannel', channel);
    state.commit('removeMembers', channel);
    state.commit('setMessages', { channel, messages: [], rewrite: true });
    state.commit('removeMembersEnum', channel);
    state.commit('setLoading', false);
  },

  async loadMessages(state, page): Promise<Message[]> {
    state.commit('setLoading', true);
    if (!state.state.activeChannel)
      return [];

    const messages = await channelService.in(state.state.activeChannel)?.loadMessages(page);
    if (messages) {
      state.commit('setMessages', { channel: state.state.activeChannel, messages, rewrite: page === 1 });
      state.commit('setLoading', false);
      return messages;
    }

    state.commit('setLoading', false);
    return [];
  },

  async addMessage(state, { channel, message }: { channel: string, message: string }) {
    state.commit('setLoading', true);
    const newMessage = await channelService.in(channel)?.addMessage(message);
    state.commit('newMessage', { channel, message: newMessage });
    state.commit('setLoading', false);
  },
  async addMember(state, { channel, username }: {channel: string, username: string}) {
    state.commit('setLoading', true);
    const newMember = await channelService.in(channel)?.addMember(username);
    console.log(newMember);
    if (newMember)
      state.commit('addMember', { channel, newMember });
    activityService.invite(channel, username);
    state.commit('setLoading', false);
  },
  async handleRemoval(state, { channel, kickUser }: {channel: string, kickUser: string}) {
    state.commit('setLoading', true);
    const remUser = await channelService.in(channel)?.handleKick(kickUser);
    console.log(remUser);
    state.commit('setLoading', false);
  },
  async revoke(state, { channel, kickUser }: {channel: string, kickUser: string}) {
    state.commit('setLoading', true);
    const remUser = channelService.in(channel)?.revokeMember(kickUser);
    console.log(remUser);
    state.commit('setLoading', false);
  }
};

export default actions;
