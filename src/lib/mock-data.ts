import type { Conversation } from './types';

export const mockUser = {
  id: 'user-0',
  name: 'You',
  avatarUrl: 'https://placehold.co/100x100.png',
};

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    name: 'Alice Johnson',
    avatarUrl: 'https://placehold.co/100x100.png',
    messages: [
      { id: 'msg-1-1', text: "Hey, how's it going?", timestamp: '10:00 AM', sender: { id: 'user-1', name: 'Alice Johnson' }, isMe: false },
      { id: 'msg-1-2', text: "Pretty good! Just working on that new project. You?", timestamp: '10:01 AM', sender: mockUser, isMe: true },
      { id: 'msg-1-3', text: "Same here. It's coming along nicely. We should sync up later today.", timestamp: '10:01 AM', sender: { id: 'user-1', name: 'Alice Johnson' }, isMe: false },
      { id: 'msg-1-4', text: "Definitely. Let's aim for 3 PM?", timestamp: '10:02 AM', sender: mockUser, isMe: true },
    ],
    unreadCount: 2,
  },
  {
    id: 'conv-2',
    name: 'Design Team',
    avatarUrl: 'https://placehold.co/100x100.png',
    messages: [
      { id: 'msg-2-1', text: "Here are the latest mockups for the new feature.", timestamp: '9:45 AM', sender: { id: 'user-2', name: 'Bob Smith' }, isMe: false },
      { id: 'msg-2-2', text: "Thanks, Bob! These look great. I have a few minor suggestions.", timestamp: '9:50 AM', sender: mockUser, isMe: true },
    ],
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    name: 'Charlie Davis',
    avatarUrl: 'https://placehold.co/100x100.png',
    messages: [
      { id: 'msg-3-1', text: "Lunch today?", timestamp: 'Yesterday', sender: { id: 'user-3', name: 'Charlie Davis' }, isMe: false },
    ],
    unreadCount: 1,
  },
  {
    id: 'conv-4',
    name: 'Project Phoenix',
    avatarUrl: 'https://placehold.co/100x100.png',
    messages: [
      { id: 'msg-4-1', text: "Meeting is postponed to tomorrow at 11 AM.", timestamp: '2 days ago', sender: { id: 'user-4', name: 'Dana White' }, isMe: false },
    ],
    unreadCount: 0,
  },
    {
    id: 'conv-5',
    name: 'Emily Clark',
    avatarUrl: 'https://placehold.co/100x100.png',
    messages: [
      { id: 'msg-5-1', text: "Can you review my PR when you have a moment?", timestamp: '3 days ago', sender: { id: 'user-5', name: 'Emily Clark' }, isMe: false },
    ],
    unreadCount: 0,
  },
];
