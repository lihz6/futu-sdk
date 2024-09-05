const FUTU_SIGN = 'ft-v1.0';
let nextSession = 1;

export const packBuffer = (cmd: number, protobuf: Uint8Array) => {
  const session = nextSession++;
  const buffer = Buffer.alloc(8 + 4 + 8 + protobuf.byteLength);
  let offset = buffer.write(FUTU_SIGN, 0, 'utf8');
  while (offset < 8) {
    offset = buffer.writeUint8(0, offset);
  }
  offset = buffer.writeUint32BE(cmd, offset);
  offset = buffer.writeBigUint64BE(BigInt(session), offset);
  buffer.set(protobuf, offset);
  return { message: buffer.buffer, session };
};

export const unpackBuffer = (arrayBuffer: ArrayBuffer) => {
  const buffer = Buffer.from(arrayBuffer);
  // const sign = buffer.toString('utf8', 0, 8).replace(/\0/g, '');
  // const cmd = buffer.readUint32BE(8);
  const session = Number(buffer.readBigUint64BE(12));
  const errorCode = buffer.readInt32BE(20);
  const errorMessage = buffer.toString('utf8', 24, 44).replace(/\0/g, '');
  const protobuf = new Uint8Array(buffer.subarray(44));
  new Uint8Array(buffer.subarray(44));
  return { session, message: { errorCode, errorMessage, protobuf } };
};
