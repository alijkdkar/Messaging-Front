export type UserStatus = 'online' | 'offline' | 'in-call';

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  status?: UserStatus;
}

export type MessageType = 'text' | 'image' | 'video';

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: User;
  isMe: boolean;
  type?: MessageType;
  mediaUrl?: string;
  replyTo?: Message;
}

export interface Conversation {
  id: string;
  name:string;
  avatarUrl: string;
  messages: Message[];
  unreadCount?: number;
  members: User[];
  isGroup?: boolean;
}
