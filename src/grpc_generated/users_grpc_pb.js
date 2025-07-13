// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var users_pb = require('./users_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_proto_AddUserRequest(arg) {
  if (!(arg instanceof users_pb.AddUserRequest)) {
    throw new Error('Expected argument of type proto.AddUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_AddUserRequest(buffer_arg) {
  return users_pb.AddUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_AddUserResponse(arg) {
  if (!(arg instanceof users_pb.AddUserResponse)) {
    throw new Error('Expected argument of type proto.AddUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_AddUserResponse(buffer_arg) {
  return users_pb.AddUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_GetUserRequest(arg) {
  if (!(arg instanceof users_pb.GetUserRequest)) {
    throw new Error('Expected argument of type proto.GetUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_GetUserRequest(buffer_arg) {
  return users_pb.GetUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_GetUserResponse(arg) {
  if (!(arg instanceof users_pb.GetUserResponse)) {
    throw new Error('Expected argument of type proto.GetUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_GetUserResponse(buffer_arg) {
  return users_pb.GetUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServiceService = exports.UserServiceService = {
  addUser: {
    path: '/proto.UserService/AddUser',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.AddUserRequest,
    responseType: users_pb.AddUserResponse,
    requestSerialize: serialize_proto_AddUserRequest,
    requestDeserialize: deserialize_proto_AddUserRequest,
    responseSerialize: serialize_proto_AddUserResponse,
    responseDeserialize: deserialize_proto_AddUserResponse,
  },
  getUser: {
    path: '/proto.UserService/GetUser',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.GetUserRequest,
    responseType: users_pb.GetUserResponse,
    requestSerialize: serialize_proto_GetUserRequest,
    requestDeserialize: deserialize_proto_GetUserRequest,
    responseSerialize: serialize_proto_GetUserResponse,
    responseDeserialize: deserialize_proto_GetUserResponse,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService, 'UserService');
