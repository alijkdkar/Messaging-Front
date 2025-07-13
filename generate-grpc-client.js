const path = require('path');
const { execSync } = require('child_process');

const PROTO_DIR = path.resolve(__dirname, 'grpcProtos');
const OUT_DIR = path.resolve(__dirname, 'src/grpc_generated');

const protoFiles = [
  'auth.proto',
  'conversation.proto',
  'messaging.proto',
  'users.proto',
];

const protoPaths = protoFiles.map(file => path.join(PROTO_DIR, file));

const grpcToolsPath = path.resolve(__dirname, 'node_modules/.bin/grpc_tools_node_protoc');

const command = [
  `${grpcToolsPath}`,
  `--js_out=import_style=commonjs,binary:${OUT_DIR}`,
  `--grpc_out=grpc_js:${OUT_DIR}`,
  `--plugin=protoc-gen-grpc=${path.resolve(__dirname, 'node_modules/.bin/grpc_tools_node_protoc_plugin')}`,
  `-I ${PROTO_DIR}`,
  ...protoPaths,
].join(' ');

try {
  execSync(`mkdir -p ${OUT_DIR}`);
  execSync(command);
  console.log('gRPC client code generated successfully!');
} catch (error) {
  console.error('Error generating gRPC client code:', error);
}
