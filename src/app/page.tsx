import { getConversations } from '@/lib/grpc-client';
import { ChatClient } from '@/components/chat-client';

export default async function Home() {
  // In a real application, you would handle potential errors here.
  const conversations = await getConversations();

  return <ChatClient initialConversations={conversations} />;
}
