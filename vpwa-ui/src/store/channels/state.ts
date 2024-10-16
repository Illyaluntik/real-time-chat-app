import { v4 as uuidv4 } from 'uuid';

export interface ChannelInterface {
  id: string,
  adminId: string,
  name: string,
  isPrivate: boolean
}

// export interface ChannelsDtoInterface {
//   chanels: Array<ChannelInterface>
// }

export interface MessageInterfase {
  id: string,
  name: string,
  text: string,
  // type: 'sent' | 'recieved',
  sent: boolean,
  timestamp: number
}

export interface ChatsInterfase {
  [channelId: string]: {
    total: number,
    messages: Array<MessageInterfase>
  }
}

export interface ChannelsStateInterface {
  dto: Array<ChannelInterface> | null;
  activeChannel: ChannelInterface | null,
  chats: ChatsInterfase | null
}

function state(): ChannelsStateInterface {
  return {
    dto: null,
    activeChannel: null,
    chats: {
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
        total: 12,
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
      }
    }
  };
}

export default state;
