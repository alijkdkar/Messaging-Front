import * as React from "react";
import type { Conversation, User, UserStatus } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Bot, Users, Search, Mail, Phone, Edit } from 'lucide-react';
import { mockUser } from "@/lib/mock-data";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { format, isToday, isYesterday } from "date-fns";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

const formatTimestampForList = (timestamp?: Date) => {
    if (!timestamp) return '';
    if (isToday(timestamp)) {
        return format(timestamp, 'p'); // e.g. "5:30 PM"
    }
    if (isYesterday(timestamp)) {
        return 'Yesterday';
    }
    return format(timestamp, 'P'); // e.g. "10/25/2024"
};

function UserProfileSheet({ user }: { user: User }) {
  const [status, setStatus] = React.useState<UserStatus>(user.status || 'offline');
  const { theme, setTheme } = useTheme();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person avatar"/>
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
           <span className={cn(
            "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-card",
            status === 'online' && 'bg-green-500',
            status === 'offline' && 'bg-gray-500',
            status === 'in-call' && 'bg-red-500'
          )} />
        </button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-sm">
        <SheetHeader className="text-left">
          <SheetTitle>My Profile</SheetTitle>
          <SheetDescription>View and edit your profile details.</SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait"/>
                <AvatarFallback className="text-3xl">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">Software Engineer</p>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Information</h3>
            <div className="flex items-center gap-4 text-sm">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <span>{user.name.toLowerCase().replace(' ','_')}@whisper.net</span>
            </div>
             <div className="flex items-center gap-4 text-sm">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <span>+1 234 567 8900</span>
            </div>
          </div>
           <Separator className="my-6" />
           <div className="space-y-4">
            <h3 className="font-semibold text-lg">Status</h3>
             <div className="flex items-center gap-2">
                <span className={cn(
                    "h-3 w-3 rounded-full",
                    status === 'online' && 'bg-green-500',
                    status === 'offline' && 'bg-gray-500',
                    status === 'in-call' && 'bg-red-500'
                )} />
                <span className="capitalize">{status}</span>
            </div>
           </div>
           <Separator className="my-6" />
           <div className="space-y-4">
            <h3 className="font-semibold text-lg">Theme</h3>
            <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>
           </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <aside className="w-full max-w-xs flex flex-col bg-card/50">
      <header className="p-4 border-b border-border">
        <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
                <Bot className="w-7 h-7 text-primary" />
                <h1 className="text-xl font-bold">
                WhisperNet
                </h1>
            </div>
            <UserProfileSheet user={mockUser} />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search or start new chat"
            className="pl-9 bg-card"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredConversations.map((conv) => {
            const lastMessage = conv.messages[conv.messages.length - 1];
            const isUnread = !!conv.unreadCount && conv.unreadCount > 0;
            const hasMention = isUnread && conv.messages.slice(-conv.unreadCount).some(m => !m.isMe && m.text.includes(`@${mockUser.name}`));

            
            let lastMessageText = "No messages yet";

            if (hasMention) {
                lastMessageText = "You were mentioned";
            } else if (lastMessage) {
                const prefix = lastMessage.isMe ? "You: " : "";
                switch (lastMessage.type) {
                    case 'image':
                        lastMessageText = `${prefix}${lastMessage.text || 'Image'}`;
                        break;
                    case 'video':
                        lastMessageText = `${prefix}${lastMessage.text || 'Video'}`;
                        break;
                    case 'voice':
                        lastMessageText = `${prefix}Voice Message`;
                        break;
                    case 'file':
                        lastMessageText = `${prefix}${lastMessage.fileName || 'File'}`;
                        break;
                    default:
                        lastMessageText = `${prefix}${lastMessage.text}`;
                        break;
                }
            }

            const otherMember = conv.isGroup ? null : conv.members.find(m => m.id !== mockUser.id);
            
            return (
              <Button
                key={conv.id}
                variant="ghost"
                onClick={() => onSelectConversation(conv.id)}
                className={cn(
                  "w-full h-auto justify-start p-3 mb-1 text-left",
                  "hover:bg-accent/10",
                  selectedConversationId === conv.id && "bg-accent/20 text-foreground"
                )}
              >
                <div className="relative mr-3">
                    <Avatar className="h-10 w-10">
                    <AvatarImage src={conv.avatarUrl} alt={conv.name} data-ai-hint="person portrait" />
                    <AvatarFallback className="bg-primary/20 text-primary font-bold">
                        {conv.isGroup ? <Users size={20} /> : getInitials(conv.name)}
                    </AvatarFallback>
                    </Avatar>
                    {otherMember && (
                        <span className={cn(
                            "absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-card",
                            otherMember.status === 'online' && 'bg-green-500',
                            otherMember.status === 'offline' && 'bg-gray-500',
                            otherMember.status === 'in-call' && 'bg-red-500'
                        )} />
                    )}
                </div>

                <div className="flex-1 truncate">
                  <p className={cn("font-semibold", isUnread && "font-bold")}>
                    {conv.name}
                  </p>
                  <p className={cn(
                    "text-sm truncate",
                    isUnread ? "text-foreground font-semibold" : "text-muted-foreground",
                    hasMention && "text-primary font-bold"
                  )}>
                    {lastMessageText}
                  </p>
                </div>
                <div className="flex flex-col items-end self-start ml-2">
                    <p className="text-xs text-muted-foreground mb-1 whitespace-nowrap">{formatTimestampForList(lastMessage?.timestamp)}</p>
                    {isUnread ? (
                        <Badge variant={hasMention ? "default" : "secondary"} className={cn(
                            "w-5 h-5 flex items-center justify-center p-0",
                            hasMention && "bg-primary text-primary-foreground"
                        )}>
                            {hasMention ? '@' : conv.unreadCount}
                        </Badge>
                    ) : <div className="w-5 h-5"/>}
                </div>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}
