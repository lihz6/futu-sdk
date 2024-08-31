import * as protobuf from 'protobufjs/minimal';
import * as Long from 'long';

protobuf.util.Long = Long;
protobuf.configure();

export { default } from './proto';
export * from './proto';
