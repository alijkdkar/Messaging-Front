// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var messaging_pb = require('./messaging_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_proto_GetConversationMessagesRequest(arg) {
  if (!(arg instanceof messaging_pb.GetConversationMessagesRequest)) {
    throw new Error('Expected argument of type proto.GetConversationMessagesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_GetConversationMessagesRequest(buffer_arg) {
  return messaging_pb.GetConversationMessagesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_GetConversationMessagesResponse(arg) {
  if (!(arg instanceof messaging_pb.GetConversationMessagesResponse)) {
    throw new Error('Expected argument of type proto.GetConversationMessagesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_GetConversationMessagesResponse(buffer_arg) {
  return messaging_pb.GetConversationMessagesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_Message(arg) {
  if (!(arg instanceof messaging_pb.Message)) {
    throw new Error('Expected argument of type proto.Message');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_Message(buffer_arg) {
  return messaging_pb.Message.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_SendMessageRequest(arg) {
  if (!(arg instanceof messaging_pb.SendMessageRequest)) {
    throw new Error('Expected argument of type proto.SendMessageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_SendMessageRequest(buffer_arg) {
  return messaging_pb.SendMessageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_SendMessageResponse(arg) {
  if (!(arg instanceof messaging_pb.SendMessageResponse)) {
    throw new Error('Expected argument of type proto.SendMessageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_SendMessageResponse(buffer_arg) {
  return messaging_pb.SendMessageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_SubscribeMessagesRequest(arg) {
  if (!(arg instanceof messaging_pb.SubscribeMessagesRequest)) {
    throw new Error('Expected argument of type proto.SubscribeMessagesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_SubscribeMessagesRequest(buffer_arg) {
  return messaging_pb.SubscribeMessagesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var MessagingServiceService = exports.MessagingServiceService = {
  // The request message containing the user's name.
sendMessage: {
    path: '/proto.MessagingService/SendMessage',
    requestStream: false,
    responseStream: false,
    requestType: messaging_pb.SendMessageRequest,
    responseType: messaging_pb.SendMessageResponse,
    requestSerialize: serialize_proto_SendMessageRequest,
    requestDeserialize: deserialize_proto_SendMessageRequest,
    responseSerialize: serialize_proto_SendMessageResponse,
    responseDeserialize: deserialize_proto_SendMessageResponse,
  },
  // Get all messages for a conversation
getConversationMessages: {
    path: '/proto.MessagingService/GetConversationMessages',
    requestStream: false,
    responseStream: false,
    requestType: messaging_pb.GetConversationMessagesRequest,
    responseType: messaging_pb.GetConversationMessagesResponse,
    requestSerialize: serialize_proto_GetConversationMessagesRequest,
    requestDeserialize: deserialize_proto_GetConversationMessagesRequest,
    responseSerialize: serialize_proto_GetConversationMessagesResponse,
    responseDeserialize: deserialize_proto_GetConversationMessagesResponse,
  },
  // Subscribe to real-time message updates
subscribeMessages: {
    path: '/proto.MessagingService/SubscribeMessages',
    requestStream: false,
    responseStream: true,
    requestType: messaging_pb.SubscribeMessagesRequest,
    responseType: messaging_pb.Message,
    requestSerialize: serialize_proto_SubscribeMessagesRequest,
    requestDeserialize: deserialize_proto_SubscribeMessagesRequest,
    responseSerialize: serialize_proto_Message,
    responseDeserialize: deserialize_proto_Message,
  },
};

exports.MessagingServiceClient = grpc.makeGenericClientConstructor(MessagingServiceService, 'MessagingService');
