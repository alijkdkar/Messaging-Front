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
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: mockUser,
      isMe: true,
      ...message
    };
    
    // Move conversation with new message to the top
    const updatedConversations = conversations
      .map((conv) => {
        if (conv.id === selectedConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
          };
        }
        return conv;
      })
      .sort((a, b) => {
        if (a.id === selectedConversationId) return -1;
        if (b.id === selectedConversationId) return 1;
        // You might want to sort by last message timestamp here for other conversations
        const aLastMessage = a.messages[a.messages.length - 1];
        const bLastMessage = b.messages[b.messages.length - 1];
        // This is a simplified sort, a real app would parse timestamps
        if (aLastMessage && bLastMessage) {
            return bLastMessage.id > aLastMessage.id ? 1 : -1;
        }
        return 0;
      });

    setConversations(updatedConversations);
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
