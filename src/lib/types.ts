export type UserStatus = 'online' | 'offline' | 'in-call';
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'seen';

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  status?: UserStatus;
}

export type MessageType = 'text' | 'image' | 'video' | 'voice' | 'file';

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: User;
  isMe: boolean;
  status?: MessageStatus;
  type?: MessageType;
  mediaUrl?: string;
  replyTo?: Message;
  duration?: string; // for voice messages
  fileName?: string; // for file messages
  fileSize?: string; // for file messages
}

export type SendMessagePayload = Omit<Message, 'id' | 'timestamp' | 'sender' | 'isMe' | 'replyTo' | 'status'>;


export interface Conversation {
  id:string;
  name:string;
  avatarUrl: string;
  messages: Message[];
  unreadCount?: number;
  members: User[];
  isGroup?: boolean;
}
