// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var auth_pb = require('./auth_pb.js');

function serialize_proto_LoginRequest(arg) {
  if (!(arg instanceof auth_pb.LoginRequest)) {
    throw new Error('Expected argument of type proto.LoginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_LoginRequest(buffer_arg) {
  return auth_pb.LoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_LoginResponse(arg) {
  if (!(arg instanceof auth_pb.LoginResponse)) {
    throw new Error('Expected argument of type proto.LoginResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_LoginResponse(buffer_arg) {
  return auth_pb.LoginResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_LogoutRequest(arg) {
  if (!(arg instanceof auth_pb.LogoutRequest)) {
    throw new Error('Expected argument of type proto.LogoutRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_LogoutRequest(buffer_arg) {
  return auth_pb.LogoutRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_LogoutResponse(arg) {
  if (!(arg instanceof auth_pb.LogoutResponse)) {
    throw new Error('Expected argument of type proto.LogoutResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_LogoutResponse(buffer_arg) {
  return auth_pb.LogoutResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_RefreshTokenRequest(arg) {
  if (!(arg instanceof auth_pb.RefreshTokenRequest)) {
    throw new Error('Expected argument of type proto.RefreshTokenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_RefreshTokenRequest(buffer_arg) {
  return auth_pb.RefreshTokenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_RefreshTokenResponse(arg) {
  if (!(arg instanceof auth_pb.RefreshTokenResponse)) {
    throw new Error('Expected argument of type proto.RefreshTokenResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_RefreshTokenResponse(buffer_arg) {
  return auth_pb.RefreshTokenResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_RegisterRequest(arg) {
  if (!(arg instanceof auth_pb.RegisterRequest)) {
    throw new Error('Expected argument of type proto.RegisterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_RegisterRequest(buffer_arg) {
  return auth_pb.RegisterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_RegisterResponse(arg) {
  if (!(arg instanceof auth_pb.RegisterResponse)) {
    throw new Error('Expected argument of type proto.RegisterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_RegisterResponse(buffer_arg) {
  return auth_pb.RegisterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_UserStatusRequest(arg) {
  if (!(arg instanceof auth_pb.UserStatusRequest)) {
    throw new Error('Expected argument of type proto.UserStatusRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_UserStatusRequest(buffer_arg) {
  return auth_pb.UserStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_UserStatusResponse(arg) {
  if (!(arg instanceof auth_pb.UserStatusResponse)) {
    throw new Error('Expected argument of type proto.UserStatusResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_UserStatusResponse(buffer_arg) {
  return auth_pb.UserStatusResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_VerifyTokenRequest(arg) {
  if (!(arg instanceof auth_pb.VerifyTokenRequest)) {
    throw new Error('Expected argument of type proto.VerifyTokenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_VerifyTokenRequest(buffer_arg) {
  return auth_pb.VerifyTokenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_VerifyTokenResponse(arg) {
  if (!(arg instanceof auth_pb.VerifyTokenResponse)) {
    throw new Error('Expected argument of type proto.VerifyTokenResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_VerifyTokenResponse(buffer_arg) {
  return auth_pb.VerifyTokenResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var AuthServiceService = exports.AuthServiceService = {
  login: {
    path: '/proto.AuthService/Login',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.LoginRequest,
    responseType: auth_pb.LoginResponse,
    requestSerialize: serialize_proto_LoginRequest,
    requestDeserialize: deserialize_proto_LoginRequest,
    responseSerialize: serialize_proto_LoginResponse,
    responseDeserialize: deserialize_proto_LoginResponse,
  },
  register: {
    path: '/proto.AuthService/Register',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.RegisterRequest,
    responseType: auth_pb.RegisterResponse,
    requestSerialize: serialize_proto_RegisterRequest,
    requestDeserialize: deserialize_proto_RegisterRequest,
    responseSerialize: serialize_proto_RegisterResponse,
    responseDeserialize: deserialize_proto_RegisterResponse,
  },
  refreshToken: {
    path: '/proto.AuthService/RefreshToken',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.RefreshTokenRequest,
    responseType: auth_pb.RefreshTokenResponse,
    requestSerialize: serialize_proto_RefreshTokenRequest,
    requestDeserialize: deserialize_proto_RefreshTokenRequest,
    responseSerialize: serialize_proto_RefreshTokenResponse,
    responseDeserialize: deserialize_proto_RefreshTokenResponse,
  },
  logout: {
    path: '/proto.AuthService/Logout',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.LogoutRequest,
    responseType: auth_pb.LogoutResponse,
    requestSerialize: serialize_proto_LogoutRequest,
    requestDeserialize: deserialize_proto_LogoutRequest,
    responseSerialize: serialize_proto_LogoutResponse,
    responseDeserialize: deserialize_proto_LogoutResponse,
  },
  verifyToken: {
    path: '/proto.AuthService/VerifyToken',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.VerifyTokenRequest,
    responseType: auth_pb.VerifyTokenResponse,
    requestSerialize: serialize_proto_VerifyTokenRequest,
    requestDeserialize: deserialize_proto_VerifyTokenRequest,
    responseSerialize: serialize_proto_VerifyTokenResponse,
    responseDeserialize: deserialize_proto_VerifyTokenResponse,
  },
  getUserStatus: {
    path: '/proto.AuthService/GetUserStatus',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.UserStatusRequest,
    responseType: auth_pb.UserStatusResponse,
    requestSerialize: serialize_proto_UserStatusRequest,
    requestDeserialize: deserialize_proto_UserStatusRequest,
    responseSerialize: serialize_proto_UserStatusResponse,
    responseDeserialize: deserialize_proto_UserStatusResponse,
  },
};

exports.AuthServiceClient = grpc.makeGenericClientConstructor(AuthServiceService, 'AuthService');
