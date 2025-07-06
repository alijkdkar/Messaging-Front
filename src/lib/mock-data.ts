import type { Conversation, User, Message } from './types';
import { subDays, subHours, subMinutes } from 'date-fns';

export const mockUser: User = {
  id: 'user-0',
  name: 'You',
  avatarUrl: 'https://placehold.co/100x100.png',
  status: 'online',
};

const alice: User = { id: 'user-1', name: 'Alice Johnson', avatarUrl: 'https://placehold.co/100x100.png', status: 'online' };
const bob: User = { id: 'user-2', name: 'Bob Smith', avatarUrl: 'https://placehold.co/100x100.png', status: 'offline' };
const charlie: User = { id: 'user-3', name: 'Charlie Davis', avatarUrl: 'https://placehold.co/100x100.png', status: 'in-call' };
const dana: User = { id: 'user-4', name: 'Dana White', avatarUrl: 'https://placehold.co/100x100.png', status: 'online' };
const emily: User = { id: 'user-5', name: 'Emily Clark', avatarUrl: 'https://placehold.co/100x100.png', status: 'offline' };
const frank: User = { id: 'user-6', name: 'Frank Miller', avatarUrl: 'https://placehold.co/100x100.png', status: 'online' };
const grace: User = { id: 'user-7', name: 'Grace Lee', avatarUrl: 'https://placehold.co/100x100.png', status: 'online' };

const now = new Date();

const aliceMessage1: Message = { id: 'msg-1-1', text: "Hey, how's it going?", timestamp: subMinutes(now, 15), sender: alice, isMe: false, type: 'text' };

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    name: 'Alice Johnson',
    avatarUrl: alice.avatarUrl!,
    isGroup: false,
    members: [mockUser, alice],
    messages: [
      aliceMessage1,
      { id: 'msg-1-2', text: "Pretty good! Just working on that new project. You?", timestamp: subMinutes(now, 14), sender: mockUser, isMe: true, type: 'text', replyTo: aliceMessage1, status: 'seen' },
      { id: 'msg-1-3', text: "Same here. It's coming along nicely. Hey @You, what do you think?", timestamp: subMinutes(now, 13), sender: alice, isMe: false, type: 'text' },
      { id: 'msg-1-4', text: "Cool, here is the design.", timestamp: subMinutes(now, 10), sender: alice, isMe: false, type: 'image', mediaUrl: 'https://placehold.co/400x300.png' },
      { id: 'msg-1-5', text: "And a quick demo of the animation.", timestamp: subMinutes(now, 5), sender: mockUser, isMe: true, type: 'video', mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'seen' },
      { id: 'msg-1-6', text: '', timestamp: subMinutes(now, 2), sender: alice, isMe: false, type: 'voice', mediaUrl: 'https://www.w3schools.com/html/horse.mp3', duration: '0:04' },
    ],
    unreadCount: 3,
  },
  {
    id: 'conv-2',
    name: 'Design Team',
    avatarUrl: 'https://placehold.co/100x100.png',
    isGroup: true,
    members: [mockUser, bob, dana, frank],
    messages: [
      { id: 'msg-2-1', text: "Here are the latest mockups for the new feature.", timestamp: subHours(now, 1), sender: bob, isMe: false, type: 'text' },
      { id: 'msg-2-2', text: "Thanks, Bob! These look great. I have a few minor suggestions.", timestamp: subMinutes(now, 50), sender: mockUser, isMe: true, type: 'text', status: 'delivered' },
      { id: 'msg-2-3', text: 'Here is the spec document.', timestamp: subMinutes(now, 48), sender: bob, isMe: false, type: 'file', mediaUrl: '#', fileName: 'specs_v2.pdf', fileSize: '2.3 MB' },
    ],
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    name: 'Charlie Davis',
    avatarUrl: charlie.avatarUrl!,
    isGroup: false,
    members: [mockUser, charlie],
    messages: [
      { id: 'msg-3-1', text: "Lunch today?", timestamp: subDays(now, 1), sender: charlie, isMe: false, type: 'text' },
    ],
    unreadCount: 1,
  },
  {
    id: 'conv-4',
    name: 'Project Phoenix',
    avatarUrl: 'https://placehold.co/100x100.png',
    isGroup: true,
    members: [mockUser, dana, emily, grace, alice],
    messages: [
      { id: 'msg-4-1', text: "Meeting is postponed to tomorrow at 11 AM.", timestamp: subDays(now, 2), sender: dana, isMe: false, type: 'text' },
    ],
    unreadCount: 0,
  },
    {
    id: 'conv-5',
    name: 'Emily Clark',
    avatarUrl: emily.avatarUrl!,
    isGroup: false,
    members: [mockUser, emily],
    messages: [
      { id: 'msg-5-1', text: "Can you review my PR when you have a moment?", timestamp: subDays(now, 3), sender: emily, isMe: false, type: 'text' },
    ],
    unreadCount: 0,
  },
];
