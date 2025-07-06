import type { Conversation } from './types';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

// This function simulates a gRPC call to fetch conversations.
// In a real application, this would be replaced with an actual gRPC client.

// Import the generated gRPC client and types
// Assuming the generated files are in a 'grpc_generated' folder relative to the project root
// You might need to adjust the paths based on where you generated the files
import { ConversationServiceClient } from '../grpc_generated/conversation_grpc_pb';
import { ListConversationsRequest, Conversation as GrpcConversation } from '../grpc_generated/conversation_pb';

// Adjust path as needed
const CONVERSATION_PROTO_PATH = __dirname + '/../grpcProtos/conversation.proto';

const packageDefinition = protoLoader.loadSync(
  CONVERSATION_PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

const conversationProto: any = grpc.loadPackageDefinition(packageDefinition).messaging;

// Assuming your gRPC server is accessible at this address
const GRPC_SERVER_ADDRESS = 'ai-gap.ir';

// Create a gRPC client instance
const grpcClient = new ConversationServiceClient(
  GRPC_SERVER_ADDRESS,
  grpc.credentials.createInsecure() // Use createSsl for production with SSL
);

// This function makes the actual gRPC call to fetch conversations.
export async function getConversations(): Promise<Conversation[]> {
  return new Promise((resolve, reject) => {
    const request = new ListConversationsRequest();
    // You might want to set userId, page, and pageSize on the request
    // based on your application's logic
    // request.setUserId('some_user_id');
    // request.setPage(1);
    // request.setPageSize(10);

    grpcClient.listConversations(request, (error: any, response: any) => {
      if (error) {
        reject(error);
      } else {
        // Map the gRPC Conversation objects to your local Conversation type
        const conversations: Conversation[] = response.getConversationsList().map((grpcConv: GrpcConversation) => ({
          id: grpcConv.getId(),
          title: grpcConv.getTitle(),
          // Map other fields as needed, handling potential differences in types
          // For example, converting timestamps:
          // lastMessageAt: grpcConv.getLastMessageAt()?.toDate(),
          // createdAt: grpcConv.getCreatedAt()?.toDate(),
          // updatedAt: grpcConv.getUpdatedAt()?.toDate(),
          // deletedAt: grpcConv.getDeletedAt()?.toDate(),
          // ... other fields
        }));
        resolve(conversations);
      }
    });
  });
}
