"use client";

import * as React from "react";
import { ConversationList } from "@/components/conversation-list";
import { MessageView } from "@/components/message-view";
import { mockConversations, mockUser } from "@/lib/mock-data";
import type { Conversation, Message, SendMessagePayload } from "@/lib/types";

export default function Home() {
  const [conversations, setConversations] = React.useState<Conversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = React.useState<string | null>(conversations[0]?.id ?? null);

  const selectedConversation = React.useMemo(() => {
    return conversations.find((c) => c.id === selectedConversationId);
  }, [conversations, selectedConversationId]);

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    
    // Mark messages as read
    setConversations(prev => prev.map(c => c.id === conversationId ? { ...c, unreadCount: 0 } : c));
  };

  const handleSendMessage = (message: SendMessagePayload) => {
    if (!selectedConversation) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      timestamp: new Date(),
      sender: mockUser,
      isMe: true,
      status: 'sending',
      ...message
    };
    
    const newConversations = conversations.map((conv) => {
        if (conv.id === selectedConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
          };
        }
        return conv;
      });

    const sortConversations = (convs: Conversation[]) => {
      return [...convs].sort((a, b) => {
        const aLastMessage = a.messages[a.messages.length - 1];
        const bLastMessage = b.messages[b.messages.length - 1];
        if (!aLastMessage) return 1;
        if (!bLastMessage) return -1;
        return bLastMessage.timestamp.getTime() - aLastMessage.timestamp.getTime();
      });
    };

    setConversations(sortConversations(newConversations));

    // Simulate status updates
    setTimeout(() => {
      setConversations(prev => prev.map(conv => {
        if (conv.id === selectedConversationId) {
          return {
            ...conv,
            messages: conv.messages.map(m => m.id === newMessage.id ? { ...m, status: 'sent' } : m)
          };
        }
        return conv;
      }));
    }, 1000);

    setTimeout(() => {
      setConversations(prev => prev.map(conv => {
        if (conv.id === selectedConversationId) {
          return {
            ...conv,
            messages: conv.messages.map(m => m.id === newMessage.id ? { ...m, status: 'delivered' } : m)
          };
        }
        return conv;
      }));
    }, 2500);

    // Simulate 'seen' only if the user is currently viewing the conversation
    setTimeout(() => {
      setConversations(prev => {
        const currentConv = prev.find(c => c.id === selectedConversationId);
        // Assuming the other user reads it if we are in the chat.
        // In a real app, this would come from a server event.
        if (currentConv) {
          return prev.map(conv => {
            if (conv.id === selectedConversationId) {
              return {
                ...conv,
                messages: conv.messages.map(m => m.id === newMessage.id ? { ...m, status: 'seen' } : m)
              };
            }
            return conv;
          });
        }
        return prev;
      });
    }, 4000);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ConversationList
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onSelectConversation={handleSelectConversation}
      />
      <div className="flex-1 flex flex-col border-l border-border">
        <MessageView
          key={selectedConversationId}
          conversation={selectedConversation}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
