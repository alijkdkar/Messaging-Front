import * as React from "react";
import type { Conversation } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Bot, Users, Search } from 'lucide-react';
import { mockUser } from "@/lib/mock-data";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

export function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <aside className="w-full max-w-xs flex flex-col bg-card/50">
      <header className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
            <Bot className="w-7 h-7 text-primary" />
            <h1 className="text-xl font-bold">
            WhisperNet
            </h1>
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
            const hasMention = conv.unreadCount && conv.unreadCount > 0 && conv.messages.some(m => !m.isMe && m.text.includes(`@${mockUser.name}`));
            
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
                    default:
                        lastMessageText = `${prefix}${lastMessage.text}`;
                        break;
                }
            }
            
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
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={conv.avatarUrl} alt={conv.name} data-ai-hint="person portrait" />
                  <AvatarFallback className="bg-primary/20 text-primary font-bold">
                    {conv.name.includes(' ') ? getInitials(conv.name) : <Users size={20} />}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <p className="font-semibold">{conv.name}</p>
                  <p className={cn(
                    "text-sm truncate", 
                    hasMention ? "font-semibold text-primary" : "text-muted-foreground"
                  )}>
                    {lastMessageText}
                  </p>
                </div>
                <div className="flex flex-col items-end self-start ml-2">
                    <p className="text-xs text-muted-foreground mb-1 whitespace-nowrap">{lastMessage?.timestamp}</p>
                    {conv.unreadCount && conv.unreadCount > 0 ? (
                        <Badge variant="default" className="w-5 h-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                            {conv.unreadCount}
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
