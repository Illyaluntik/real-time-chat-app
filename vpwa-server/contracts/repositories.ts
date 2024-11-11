// here we are declaring our MessageRepository types for Repositories/MessageRepository
// container binding. See providers/AppProvider.ts for how we are binding the implementation 
declare module '@ioc:Repositories/MessageRepository' {
  export interface SerializedMessage {
    content: string
    channelId: number,
    createdAt: string,
    id: number,
    author: {
      id: string,
      email: string,
      createdAt: string,
    }
  }

  export interface MessageRepositoryContract {
    getAll(channelName: number): Promise<SerializedMessage[]>
    create(channelId: number, userId: string, content: string): Promise<SerializedMessage>
  }

  const MessageRepository: MessageRepositoryContract
  export default MessageRepository
}
