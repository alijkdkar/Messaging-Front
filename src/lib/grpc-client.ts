import type { Conversation } from './types';
import { mockConversations } from './mock-data';

// This function simulates a gRPC call to fetch conversations.
// In a real application, this would be replaced with an actual gRPC client.
export async function getConversations(): Promise<Conversation[]> {
  
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 50));

  // The mock data already uses Date objects, so no conversion is needed here.
  // A real gRPC implementation would need to parse string/number timestamps into Date objects.
  return mockConversations;
}
