/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import axios, { AxiosResponse, AxiosError } from 'axios';
import { of } from 'await-of';
import { api } from 'src/boot/axios';
import { ChannelInterface, NewChannelData } from './state';

export default {
  leaveChannel(data: any) {
    return of(axios.post('http://localhost:3000/api/channel/leave', data));
  }
};
