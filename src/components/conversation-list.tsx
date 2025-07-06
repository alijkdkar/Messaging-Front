import type { Conversation } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Bot, Users } from 'lucide-react';

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
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  return (
    <aside className="w-full max-w-xs flex flex-col bg-card/50">
      <header className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Bot className="w-7 h-7 text-primary" />
            <h1 className="text-xl font-bold">
            WhisperNet
            </h1>
        </div>
      </header>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {conversations.map((conv) => {
            const lastMessage = conv.messages[conv.messages.length - 1];
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
                  <p className="text-sm text-muted-foreground truncate">
                    {lastMessage ? `${lastMessage.isMe ? 'You: ' : ''}${lastMessage.text}` : 'No messages yet'}
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
