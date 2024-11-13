import { v4 as uuidv4 } from 'uuid';

export interface ChannelInterface {
  id: string,
  adminId: string,
  name: string,
  isPrivate: boolean
}

export interface MessageInterfase {
  id: string,
  name: string,
  text: string,
  sent: boolean,
  timestamp: number
}

export interface ChatsInterfase {
  [channelId: string]: {
    total: number,
    messages: Array<MessageInterfase>
  }
}

export interface NewCahnnelData {
  isPrivate: boolean,
}

export interface ChannelsStateInterface {
  dto: Array<ChannelInterface> | null;
  // activeChannel: ChannelInterface | null,
  activeChannel: string | null,
  chats: ChatsInterfase | null,
  newChannelData: NewCahnnelData
}

function state(): ChannelsStateInterface {
  return {
    dto: null,
    activeChannel: null,
    chats: {
      'new-channel': {
        total: 0,
        messages: []
      },
      'test-1': {
        total: 8,
        messages: [
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: true, timestamp: Date.now() - 1000000000
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: true, timestamp: Date.now() - 100000000
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: false, timestamp: Date.now() - 43200000
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: true, timestamp: Date.now() - 1800000
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: false, timestamp: Date.now() - 900000
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: true, timestamp: Date.now() - 60000
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: false, timestamp: Date.now() - 2000
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: true, timestamp: Date.now()
          }
        ]
      },
      'test-2': {
        total: 100,
        messages: [
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: true, timestamp: Date.now() - 1000000000
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: true, timestamp: Date.now() - 100000000
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: false, timestamp: Date.now() - 43200000
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: true, timestamp: Date.now() - 1800000
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: false, timestamp: Date.now() - 900000
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: true, timestamp: Date.now() - 60000
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: false, timestamp: Date.now() - 2000
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: true, timestamp: Date.now()
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: true, timestamp: Date.now()
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: false, timestamp: Date.now()
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: true, timestamp: Date.now()
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: false, timestamp: Date.now()
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: true, timestamp: Date.now()
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: false, timestamp: Date.now()
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: true, timestamp: Date.now()
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: false, timestamp: Date.now()
          }
        ]
      },
      'test-3': {
        total: 3,
        messages: [
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: true, timestamp: Date.now() - 60000
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: false, timestamp: Date.now() - 2000
          },
          {
            id: uuidv4(), name: 'Name', text: 'Message example text', sent: false, timestamp: Date.now()
          }
        ]
      },
      'test-4': {
        total: 0,
        messages: []
      },
      'test-5': {
        total: 0,
        messages: []
      },
      'test-6': {
        total: 0,
        messages: []
      },
      'test-7': {
        total: 0,
        messages: []
      },
      'test-8': {
        total: 0,
        messages: []
      },
      'test-9': {
        total: 0,
        messages: []
      },
      'test-10': {
        total: 0,
        messages: []
      },
      'test-11': {
        total: 0,
        messages: []
      },
      'test-12': {
        total: 0,
        messages: []
      },
      'test-13': {
        total: 0,
        messages: []
      },
      'test-14': {
        total: 0,
        messages: []
      },
      'test-15': {
        total: 0,
        messages: []
      },
      'test-16': {
        total: 0,
        messages: []
      },
      'test-17': {
        total: 0,
        messages: []
      },
      'test-18': {
        total: 0,
        messages: []
      },
      'test-19': {
        total: 0,
        messages: []
      },
      'test-20': {
        total: 0,
        messages: []
      }
    },
    newChannelData: {
      isPrivate: false
    }
  };
}

export default state;
