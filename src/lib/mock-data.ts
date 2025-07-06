import type { Conversation, User, Message } from './types';

export const mockUser: User = {
  id: 'user-0',
  name: 'You',
  avatarUrl: 'https://placehold.co/100x100.png',
};

const alice: User = { id: 'user-1', name: 'Alice Johnson', avatarUrl: 'https://placehold.co/100x100.png' };
const bob: User = { id: 'user-2', name: 'Bob Smith', avatarUrl: 'https://placehold.co/100x100.png' };
const charlie: User = { id: 'user-3', name: 'Charlie Davis', avatarUrl: 'https://placehold.co/100x100.png' };
const dana: User = { id: 'user-4', name: 'Dana White', avatarUrl: 'https://placehold.co/100x100.png' };
const emily: User = { id: 'user-5', name: 'Emily Clark', avatarUrl: 'https://placehold.co/100x100.png' };


const aliceMessage1: Message = { id: 'msg-1-1', text: "Hey, how's it going?", timestamp: '10:00 AM', sender: alice, isMe: false, type: 'text' };

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    name: 'Alice Johnson',
    avatarUrl: 'https://placehold.co/100x100.png',
    messages: [
      aliceMessage1,
      { id: 'msg-1-2', text: "Pretty good! Just working on that new project. You?", timestamp: '10:01 AM', sender: mockUser, isMe: true, type: 'text', replyTo: aliceMessage1 },
      { id: 'msg-1-3', text: "Same here. It's coming along nicely. Hey @You, what do you think?", timestamp: '10:01 AM', sender: alice, isMe: false, type: 'text' },
      { id: 'msg-1-4', text: "Cool, here is the design.", timestamp: '10:05 AM', sender: alice, isMe: false, type: 'image', mediaUrl: 'https://placehold.co/400x300.png' },
      { id: 'msg-1-5', text: "And a quick demo of the animation.", timestamp: '10:08 AM', sender: mockUser, isMe: true, type: 'video', mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
    unreadCount: 2,
  },
  {
    id: 'conv-2',
    name: 'Design Team',
    avatarUrl: 'https://placehold.co/100x100.png',
    messages: [
      { id: 'msg-2-1', text: "Here are the latest mockups for the new feature.", timestamp: '9:45 AM', sender: bob, isMe: false, type: 'text' },
      { id: 'msg-2-2', text: "Thanks, Bob! These look great. I have a few minor suggestions.", timestamp: '9:50 AM', sender: mockUser, isMe: true, type: 'text' },
    ],
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    name: 'Charlie Davis',
    avatarUrl: 'https://placehold.co/100x100.png',
    messages: [
      { id: 'msg-3-1', text: "Lunch today?", timestamp: 'Yesterday', sender: charlie, isMe: false, type: 'text' },
    ],
    unreadCount: 1,
  },
  {
    id: 'conv-4',
    name: 'Project Phoenix',
    avatarUrl: 'https://placehold.co/100x100.png',
    messages: [
      { id: 'msg-4-1', text: "Meeting is postponed to tomorrow at 11 AM.", timestamp: '2 days ago', sender: dana, isMe: false, type: 'text' },
    ],
    unreadCount: 0,
  },
    {
    id: 'conv-5',
    name: 'Emily Clark',
    avatarUrl: 'https://placehold.co/100x100.png',
    messages: [
      { id: 'msg-5-1', text: "Can you review my PR when you have a moment?", timestamp: '3 days ago', sender: emily, isMe: false, type: 'text' },
    ],
    unreadCount: 0,
  },
];
