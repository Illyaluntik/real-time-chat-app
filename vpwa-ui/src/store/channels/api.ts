/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import axios, { AxiosResponse, AxiosError } from 'axios';
import { of } from 'await-of';
import { v4 as uuidv4 } from 'uuid';
import { ChannelInterface } from './state';

export default {
  getChannels() {
    // return of(axios.get('/api/channels'));

    return of(new Promise<AxiosResponse<Array<ChannelInterface>>>((res) => setTimeout(() => res({
      data: [
        {
          id: 'test-1',
          adminId: uuidv4(),
          name: 'Channel Name 1',
          isPrivate: false
        },
        {
          id: 'test-2',
          adminId: uuidv4(),
          name: 'Channel Name 2',
          isPrivate: true
        },
        {
          id: 'test-3',
          adminId: uuidv4(),
          name: 'Channel Name 3',
          isPrivate: false
        }
      ],
      status: 200,
      statusText: 'OK',
      headers: '',
      config: {}
    }), 1000)));
  }
};
