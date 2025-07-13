import type { Conversation, User, Message } from './types';
import * as grpc from '@grpc/grpc-js';
import { ConversationServiceClient } from '../grpc_generated/conversation_grpc_pb';
import {
  ListConversationsRequest,
  GetConversationRequest,
  ListParticipantsRequest,
  Conversation as GrpcConversation,
  Participant as GrpcParticipant
} from '../grpc_generated/conversation_pb';
import { AuthServiceClient } from '../grpc_generated/auth_grpc_pb';
import {
  GetConversationMessagesRequest,
  SendMessageRequest,
  Message as GrpcMessage
} from '../grpc_generated/messaging_pb';
import { MessagingServiceClient } from '../grpc_generated/messaging_grpc_pb';
import { UserServiceClient } from '../grpc_generated/users_grpc_pb';
import { GetUserRequest, GetUserResponse } from '../grpc_generated/users_pb';
import { VerifyTokenRequest } from '../grpc_generated/auth_pb';

const GRPC_SERVER_ADDRESS = 'ai-gap.ir';

const conversationClient = new ConversationServiceClient(
  GRPC_SERVER_ADDRESS,
  grpc.credentials.createInsecure()
);

const authClient = new AuthServiceClient(
  GRPC_SERVER_ADDRESS,
  grpc.credentials.createInsecure()
);

const messagingClient = new MessagingServiceClient(
  GRPC_SERVER_ADDRESS,
  grpc.credentials.createInsecure()
);

const userClient = new UserServiceClient(
  GRPC_SERVER_ADDRESS,
  grpc.credentials.createInsecure()
);

async function getUser(userId: string): Promise<User> {
  return new Promise((resolve, reject) => {
    const request = new GetUserRequest();
    request.setUserId(userId);
    userClient.getUser(request, (error: any, response: GetUserResponse) => {
      if (error) {
        return reject(error);
      }
      resolve({
        id: response.getUserId(),
        name: response.getDisplayName() || `${response.getFirstName()} ${response.getLastName()}`,
        avatarUrl: response.getAvatarUrl(),
        status: response.getIsOnline() ? 'online' : 'offline',
      });
    });
  });
}

export async function getConversations(userId: string): Promise<Conversation[]> {
  return new Promise((resolve, reject) => {
    const request = new ListConversationsRequest();
    request.setUserId(userId);

    conversationClient.listConversations(request, async (error: any, response: any) => {
      if (error) {
        return reject(error);
      }

      const conversations: GrpcConversation[] = response.getConversationsList();
      const detailedConversations = await Promise.all(conversations.map(async (grpcConv) => {
        const members = await getConversationMembers(grpcConv.getId());
        const messages = await getMessages(grpcConv.getId());
        return {
          id: grpcConv.getId(),
          name: grpcConv.getTitle(),
          avatarUrl: grpcConv.getAvatarUrl(),
          isGroup: grpcConv.getType() === 2,
          members,
          messages,
          unreadCount: grpcConv.getUnreadCount(),
        };
      }));

      resolve(detailedConversations);
    });
  });
}

export async function getConversation(id: string): Promise<Conversation> {
    return new Promise((resolve, reject) => {
        const request = new GetConversationRequest();
        request.setId(id);
        conversationClient.getConversation(request, async (error: any, response: any) => {
            if (error) {
                return reject(error);
            }
            const grpcConv = response.getConversation();
            const members = await getConversationMembers(grpcConv.getId());
            const messages = await getMessages(grpcConv.getId());
            resolve({
                id: grpcConv.getId(),
                name: grpcConv.getTitle(),
                avatarUrl: grpcConv.getAvatarUrl(),
                isGroup: grpcConv.getType() === 2,
                members,
                messages,
                unreadCount: grpcConv.getUnreadCount(),
            });
        });
    });
}

async function getConversationMembers(conversationId: string): Promise<User[]> {
  return new Promise((resolve, reject) => {
    const request = new ListParticipantsRequest();
    request.setConversationId(conversationId);
    conversationClient.listParticipants(request, async (error: any, response: any) => {
      if (error) {
        return reject(error);
      }
      const participants: GrpcParticipant[] = response.getParticipantsList();
      const users = await Promise.all(participants.map(p => getUser(p.getUserId())));
      resolve(users);
    });
  });
}

export async function getMessages(conversationId: string): Promise<Message[]> {
    return new Promise((resolve, reject) => {
        const request = new GetConversationMessagesRequest();
        request.setConversationId(conversationId);
        messagingClient.getConversationMessages(request, async (error: any, response: any) => {
            if (error) {
                return reject(error);
            }
            const grpcMessages: GrpcMessage[] = response.getMessagesList();
            const messages = await Promise.all(grpcMessages.map(async (grpcMsg) => {
                const sender = await getUser(grpcMsg.getSender());
                return {
                    id: grpcMsg.getId(),
                    text: grpcMsg.getTextContent(),
                    timestamp: new Date(grpcMsg.getCreatedAt()!.getSeconds() * 1000),
                    sender,
                    isMe: false, // This will be set in the component
                    type: 'text', // This will need to be mapped
                };
            }));
            resolve(messages);
        });
    });
}

export async function getCurrentUser(token: string): Promise<User> {
    return new Promise((resolve, reject) => {
        const request = new VerifyTokenRequest();
        request.setToken(token);
        authClient.verifyToken(request, (error: any, response: any) => {
            if (error) {
                return reject(error);
            }
            resolve({
                id: response.getUserId(),
                name: response.getFullName(),
                avatarUrl: '', // Not available in verify token response
                status: 'online',
            });
        });
    });
}
