"use client";

import * as React from "react";
import { ConversationList } from "@/components/conversation-list";
import { MessageView } from "@/components/message-view";
import { getConversations, getCurrentUser, sendMessage } from "@/lib/grpc-client";
import type { Conversation, Message, SendMessagePayload, User } from "@/lib/types";

export function ChatClient() {
  const [user, setUser] = React.useState<User | null>(null);
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      // Hardcoded for now
      const authToken = "your_auth_token";
      const currentUser = await getCurrentUser(authToken);
      setUser(currentUser);
      const userConversations = await getConversations(currentUser.id);
      setConversations(userConversations);
      if (userConversations.length > 0) {
        setSelectedConversationId(userConversations[0].id);
      }
    }
    fetchData();
  }, []);

  const selectedConversation = React.useMemo(() => {
    return conversations.find((c) => c.id === selectedConversationId);
  }, [conversations, selectedConversationId]);

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    
    // Mark messages as read
    setConversations(prev => prev.map(c => c.id === conversationId ? { ...c, unreadCount: 0 } : c));
  };

  const handleSendMessage = async (payload: SendMessagePayload) => {
    if (!selectedConversation || !user) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      timestamp: new Date(),
      sender: user,
      isMe: true,
      status: 'sending',
      ...payload,
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

    setConversations(newConversations);

    await sendMessage({
        conversationId: selectedConversation.id,
        senderId: user.id,
        ...payload,
    });
  };

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ConversationList
        user={user}
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onSelectConversation={handleSelectConversation}
      />
      <div className="flex-1 flex flex-col border-l border-border">
        <MessageView
          key={selectedConversationId}
          user={user}
          conversation={selectedConversation}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
