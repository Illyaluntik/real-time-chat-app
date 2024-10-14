export interface ChannelInterface {
  id: string,
  adminId: string,
  name: string,
  isPrivate: boolean
}

export interface ChannelsDtoInterface {
  chanels: Array<ChannelInterface>
}

export interface MessageInterfase {
  name: string,
  text: string,
  // type: 'sent' | 'recieved',
  sent: boolean,
  timestamp: number
}

export interface MessagesInterfase {
  [channelId: string]: Array<MessageInterfase> | null
}

export interface ChannelsStateInterface {
  dto: ChannelsDtoInterface | null;
  activeChannel: string | null,
  messages: MessagesInterfase | null
}

function state(): ChannelsStateInterface {
  return {
    dto: null,
    activeChannel: null,
    messages: {
      'test-1': [
        {
          name: 'Name 1', text: 'Message example text 1', sent: true, timestamp: Date.now()
        }
      ],
      'test-2': [],
      'test-3': []
    }
  };
}

export default state;
