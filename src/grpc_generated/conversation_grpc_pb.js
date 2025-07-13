// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var conversation_pb = require('./conversation_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_messaging_AddParticipantRequest(arg) {
  if (!(arg instanceof conversation_pb.AddParticipantRequest)) {
    throw new Error('Expected argument of type messaging.AddParticipantRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messaging_AddParticipantRequest(buffer_arg) {
  return conversation_pb.AddParticipantRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_messaging_AddParticipantResponse(arg) {
  if (!(arg instanceof conversation_pb.AddParticipantResponse)) {
    throw new Error('Expected argument of type messaging.AddParticipantResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messaging_AddParticipantResponse(buffer_arg) {
  return conversation_pb.AddParticipantResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_messaging_CreateConversationRequest(arg) {
  if (!(arg instanceof conversation_pb.CreateConversationRequest)) {
    throw new Error('Expected argument of type messaging.CreateConversationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messaging_CreateConversationRequest(buffer_arg) {
  return conversation_pb.CreateConversationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_messaging_CreateConversationResponse(arg) {
  if (!(arg instanceof conversation_pb.CreateConversationResponse)) {
    throw new Error('Expected argument of type messaging.CreateConversationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messaging_CreateConversationResponse(buffer_arg) {
  return conversation_pb.CreateConversationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_messaging_DeleteConversationRequest(arg) {
  if (!(arg instanceof conversation_pb.DeleteConversationRequest)) {
    throw new Error('Expected argument of type messaging.DeleteConversationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messaging_DeleteConversationRequest(buffer_arg) {
  return conversation_pb.DeleteConversationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_messaging_DeleteConversationResponse(arg) {
  if (!(arg instanceof conversation_pb.DeleteConversationResponse)) {
    throw new Error('Expected argument of type messaging.DeleteConversationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messaging_DeleteConversationResponse(buffer_arg) {
  return conversation_pb.DeleteConversationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_messaging_GetConversationRequest(arg) {
  if (!(arg instanceof conversation_pb.GetConversationRequest)) {
    throw new Error('Expected argument of type messaging.GetConversationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messaging_GetConversationRequest(buffer_arg) {
  return conversation_pb.GetConversationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_messaging_GetConversationResponse(arg) {
  if (!(arg instanceof conversation_pb.GetConversationResponse)) {
    throw new Error('Expected argument of type messaging.GetConversationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messaging_GetConversationResponse(buffer_arg) {
  return conversation_pb.GetConversationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_messaging_ListConversationsRequest(arg) {
  if (!(arg instanceof conversation_pb.ListConversationsRequest)) {
    throw new Error('Expected argument of type messaging.ListConversationsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messaging_ListConversationsRequest(buffer_arg) {
  return conversation_pb.ListConversationsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_messaging_ListConversationsResponse(arg) {
  if (!(arg instanceof conversation_pb.ListConversationsResponse)) {
    throw new Error('Expected argument of type messaging.ListConversationsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messaging_ListConversationsResponse(buffer_arg) {
  return conversation_pb.ListConversationsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_messaging_ListParticipantsRequest(arg) {
  if (!(arg instanceof conversation_pb.ListParticipantsRequest)) {
    throw new Error('Expected argument of type messaging.ListParticipantsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messaging_ListParticipantsRequest(buffer_arg) {
  return conversation_pb.ListParticipantsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_messaging_ListParticipantsResponse(arg) {
  if (!(arg instanceof conversation_pb.ListParticipantsResponse)) {
    throw new Error('Expected argument of type messaging.ListParticipantsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messaging_ListParticipantsResponse(buffer_arg) {
  return conversation_pb.ListParticipantsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_messaging_RemoveParticipantRequest(arg) {
  if (!(arg instanceof conversation_pb.RemoveParticipantRequest)) {
    throw new Error('Expected argument of type messaging.RemoveParticipantRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messaging_RemoveParticipantRequest(buffer_arg) {
  return conversation_pb.RemoveParticipantRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_messaging_RemoveParticipantResponse(arg) {
  if (!(arg instanceof conversation_pb.RemoveParticipantResponse)) {
    throw new Error('Expected argument of type messaging.RemoveParticipantResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messaging_RemoveParticipantResponse(buffer_arg) {
  return conversation_pb.RemoveParticipantResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_messaging_UpdateConversationRequest(arg) {
  if (!(arg instanceof conversation_pb.UpdateConversationRequest)) {
    throw new Error('Expected argument of type messaging.UpdateConversationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messaging_UpdateConversationRequest(buffer_arg) {
  return conversation_pb.UpdateConversationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_messaging_UpdateConversationResponse(arg) {
  if (!(arg instanceof conversation_pb.UpdateConversationResponse)) {
    throw new Error('Expected argument of type messaging.UpdateConversationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messaging_UpdateConversationResponse(buffer_arg) {
  return conversation_pb.UpdateConversationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Service definitions
var ConversationServiceService = exports.ConversationServiceService = {
  // CRUD operations for conversations
createConversation: {
    path: '/messaging.ConversationService/CreateConversation',
    requestStream: false,
    responseStream: false,
    requestType: conversation_pb.CreateConversationRequest,
    responseType: conversation_pb.CreateConversationResponse,
    requestSerialize: serialize_messaging_CreateConversationRequest,
    requestDeserialize: deserialize_messaging_CreateConversationRequest,
    responseSerialize: serialize_messaging_CreateConversationResponse,
    responseDeserialize: deserialize_messaging_CreateConversationResponse,
  },
  getConversation: {
    path: '/messaging.ConversationService/GetConversation',
    requestStream: false,
    responseStream: false,
    requestType: conversation_pb.GetConversationRequest,
    responseType: conversation_pb.GetConversationResponse,
    requestSerialize: serialize_messaging_GetConversationRequest,
    requestDeserialize: deserialize_messaging_GetConversationRequest,
    responseSerialize: serialize_messaging_GetConversationResponse,
    responseDeserialize: deserialize_messaging_GetConversationResponse,
  },
  listConversations: {
    path: '/messaging.ConversationService/ListConversations',
    requestStream: false,
    responseStream: false,
    requestType: conversation_pb.ListConversationsRequest,
    responseType: conversation_pb.ListConversationsResponse,
    requestSerialize: serialize_messaging_ListConversationsRequest,
    requestDeserialize: deserialize_messaging_ListConversationsRequest,
    responseSerialize: serialize_messaging_ListConversationsResponse,
    responseDeserialize: deserialize_messaging_ListConversationsResponse,
  },
  updateConversation: {
    path: '/messaging.ConversationService/UpdateConversation',
    requestStream: false,
    responseStream: false,
    requestType: conversation_pb.UpdateConversationRequest,
    responseType: conversation_pb.UpdateConversationResponse,
    requestSerialize: serialize_messaging_UpdateConversationRequest,
    requestDeserialize: deserialize_messaging_UpdateConversationRequest,
    responseSerialize: serialize_messaging_UpdateConversationResponse,
    responseDeserialize: deserialize_messaging_UpdateConversationResponse,
  },
  deleteConversation: {
    path: '/messaging.ConversationService/DeleteConversation',
    requestStream: false,
    responseStream: false,
    requestType: conversation_pb.DeleteConversationRequest,
    responseType: conversation_pb.DeleteConversationResponse,
    requestSerialize: serialize_messaging_DeleteConversationRequest,
    requestDeserialize: deserialize_messaging_DeleteConversationRequest,
    responseSerialize: serialize_messaging_DeleteConversationResponse,
    responseDeserialize: deserialize_messaging_DeleteConversationResponse,
  },
  //   // Operations for participants
addParticipant: {
    path: '/messaging.ConversationService/AddParticipant',
    requestStream: false,
    responseStream: false,
    requestType: conversation_pb.AddParticipantRequest,
    responseType: conversation_pb.AddParticipantResponse,
    requestSerialize: serialize_messaging_AddParticipantRequest,
    requestDeserialize: deserialize_messaging_AddParticipantRequest,
    responseSerialize: serialize_messaging_AddParticipantResponse,
    responseDeserialize: deserialize_messaging_AddParticipantResponse,
  },
  removeParticipant: {
    path: '/messaging.ConversationService/RemoveParticipant',
    requestStream: false,
    responseStream: false,
    requestType: conversation_pb.RemoveParticipantRequest,
    responseType: conversation_pb.RemoveParticipantResponse,
    requestSerialize: serialize_messaging_RemoveParticipantRequest,
    requestDeserialize: deserialize_messaging_RemoveParticipantRequest,
    responseSerialize: serialize_messaging_RemoveParticipantResponse,
    responseDeserialize: deserialize_messaging_RemoveParticipantResponse,
  },
  //   rpc UpdateParticipant(UpdateParticipantRequest) returns (UpdateParticipantResponse);
listParticipants: {
    path: '/messaging.ConversationService/ListParticipants',
    requestStream: false,
    responseStream: false,
    requestType: conversation_pb.ListParticipantsRequest,
    responseType: conversation_pb.ListParticipantsResponse,
    requestSerialize: serialize_messaging_ListParticipantsRequest,
    requestDeserialize: deserialize_messaging_ListParticipantsRequest,
    responseSerialize: serialize_messaging_ListParticipantsResponse,
    responseDeserialize: deserialize_messaging_ListParticipantsResponse,
  },
};

exports.ConversationServiceClient = grpc.makeGenericClientConstructor(ConversationServiceService, 'ConversationService');
