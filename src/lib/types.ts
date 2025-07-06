export interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  isMe: boolean;
}

export interface Conversation {
  id: string;
  name:string;
  avatarUrl: string;
  messages: Message[];
  unreadCount?: number;
}
