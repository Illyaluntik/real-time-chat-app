/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import axios, { AxiosResponse, AxiosError } from 'axios';
import { of } from 'await-of';
import { ChannelInterface, NewCahnnelData } from './state';

export default {
  getChannels() {
    return of(axios.post('http://localhost:3000/api/channel/load', { user_id: '75d7a00e-57cc-4852-bc36-6ebc58c87ee8' }));
  },
  createChannel(data: NewCahnnelData) {
    return of(axios.post('http://localhost:3000/api/channel/create', data));
  },
  leaveChannel(data: any) {
    return of(axios.post('http://localhost:3000/api/channel/leave', data));
  }
};
