/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionTree } from 'vuex';
import channelService from 'src/services/ChannelService';
import { StateInterface } from '../index';
import { ChannelsStateInterface } from './state';
import API from './api';
import { Account } from '../account/state';

const actions: ActionTree<ChannelsStateInterface, StateInterface> = {
  async join(state, channel: string) {
    try {
      const messages = await channelService.join(channel).loadMessages();
      const members = await channelService.in(channel)?.loadMembers();
      state.commit('loadMessages', { channel, messages });
      state.commit('loadMembers', members);
    } catch (err) {
      throw err;
    }
  },
  // async leave({ getters, commit }, channel: string | null) {
  //   const leaving: string[] = channel !== null ? [channel] : getters.joinedChannels;

  //   leaving.forEach((c) => {
  //     channelService.leave(c);
  //     commit('CLEAR_CHANNEL', c);
  //   });
  // },
  async addMessage(state, { channel, message }: { channel: string, message: string }) {
    const newMessage = channelService.in(channel)?.addMessage(message);
    state.commit('newMessage', { channel, message: newMessage });
  },
  async addMember(state, { channel, username }: {channel: string, username: string}) {
    const newMember = channelService.in(channel)?.addMember(username);
    // pridat do memberov
    state.commit('addMember', newMember);
    // pridat do newUser channels
    state.commit('account/newChannel', channel);
  },
  async handleRemoval(state, { channel, kickUser }: {channel: string, kickUser: string}) {
    const remUser = await channelService.in(channel)?.handleKick(kickUser);
    console.log(remUser);
  }
  // async createChannel(state) {
  //   const newChannel = ChannelService.add();
  //   // console.log(data);
  //   // const [res, err] = await API.createChannel(data);

  //   // if (err)
  //   //   throw err;

  //   // return res;
  // },
  // async leaveChannel(state, userId) {
  //   const data = {
  //     channel_id: state.getters.activeChannel,
  //     user_id: userId
  //   };

  //   const [res, err] = await API.leaveChannel(data);

  //   if (err)
  //     throw err;

  //   state.commit('setActiveChannel', null);
  //   return res;
  // }
};

export default actions;
