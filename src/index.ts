import { isBuffer, isFunction } from "util";

export type BinaryType =
  | string
  | boolean
  | number
  | bigint
  | Buffer
  | Array<BinaryType>;

export interface BinaryParser {
  size: number;
  encode: (value: BinaryType) => Buffer;
  decode: (buf: Buffer) => BinaryType;
}

export interface StructParser {
  size: number;
  encode: (value: unknown) => Buffer;
  decode: <T = never>(buf: Buffer) => T;
  struct: BinaryStruct;
}

export interface BinaryStruct {
  [key: string]: BinaryParser | BinaryStruct | ChoiceParser;
}

export interface BinaryObject {
  [key: string]: BinaryType | BinaryObject;
}

export interface StructMap {
  [key: string]: StructParser;
  [key: number]: StructParser;
}

export type ChoiceParser = (obj: BinaryObject) => BinaryParser;

export const skip = (bytes: number): BinaryParser => ({
  size: bytes,
  encode: (buf: BinaryType) =>
    isBuffer(buf) ? buf : Buffer.alloc(bytes).fill(0),
  decode: (buf: Buffer) => buf,
});

export const string = (
  length: number,
  encoding: BufferEncoding,
): BinaryParser => ({
  size: length,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(length);
    buf.write(value.toString(), 0, length, encoding);
    return buf;
  },
  decode: (buf: Buffer) => buf.toString(encoding),
});

export const bool: BinaryParser = {
  size: 1,
  encode: (value: BinaryType) => Buffer.alloc(1).fill(Number(value)),
  decode: (buf: Buffer) => Boolean(buf[0]),
};

export const int64be: BinaryParser = {
  size: 8,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(8);
    buf.writeBigInt64BE(BigInt(value));
    return buf;
  },
  decode: (buf: Buffer) => buf.readBigInt64BE(),
};

export const int64le: BinaryParser = {
  size: 8,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(8);
    buf.writeBigInt64LE(BigInt(value));
    return buf;
  },
  decode: (buf: Buffer) => buf.readBigInt64LE(),
};

export const uint64be: BinaryParser = {
  size: 8,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(8);
    buf.writeBigUInt64BE(BigInt(value));
    return buf;
  },
  decode: (buf: Buffer) => buf.readBigInt64BE(),
};

export const uint64le: BinaryParser = {
  size: 8,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(8);
    buf.writeBigUInt64LE(BigInt(value));
    return buf;
  },
  decode: (buf: Buffer) => buf.readBigInt64LE(),
};

export const doublebe: BinaryParser = {
  size: 8,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(8);
    buf.writeDoubleBE(value as number);
    return buf;
  },
  decode: (buf: Buffer) => buf.readDoubleBE(),
};

export const doublele: BinaryParser = {
  size: 8,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(8);
    buf.writeDoubleLE(value as number);
    return buf;
  },
  decode: (buf: Buffer) => buf.readDoubleLE(),
};

export const floatbe: BinaryParser = {
  size: 4,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(4);
    buf.writeFloatBE(value as number);
    return buf;
  },
  decode: (buf: Buffer) => buf.readFloatBE(),
};

export const floatle: BinaryParser = {
  size: 4,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(4);
    buf.writeFloatLE(value as number);
    return buf;
  },
  decode: (buf: Buffer) => buf.readFloatLE(),
};

export const int8: BinaryParser = {
  size: 1,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(1);
    buf.writeInt8(value as number);
    return buf;
  },
  decode: (buf: Buffer) => buf.readInt8(),
};

export const int16be: BinaryParser = {
  size: 2,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(2);
    buf.writeInt16BE(value as number);
    return buf;
  },
  decode: (buf: Buffer) => buf.readInt16BE(),
};

export const int16le: BinaryParser = {
  size: 2,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(2);
    buf.writeInt16LE(value as number);
    return buf;
  },
  decode: (buf: Buffer) => buf.readInt16LE(),
};

export const int32be: BinaryParser = {
  size: 4,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(4);
    buf.writeInt32BE(value as number);
    return buf;
  },
  decode: (buf: Buffer) => buf.readInt32BE(),
};

export const int32le: BinaryParser = {
  size: 4,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(4);
    buf.writeInt32LE(value as number);
    return buf;
  },
  decode: (buf: Buffer) => buf.readInt32LE(),
};

export const intbe = (bytes: number): BinaryParser => ({
  size: bytes,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(bytes);
    buf.writeIntBE(value as number, 0, bytes);
    return buf;
  },
  decode: (buf: Buffer) => buf.readIntBE(0, bytes),
});

export const intle = (bytes: number): BinaryParser => ({
  size: bytes,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(bytes);
    buf.writeIntLE(value as number, 0, bytes);
    return buf;
  },
  decode: (buf: Buffer) => buf.readIntLE(0, bytes),
});

export const uint8: BinaryParser = {
  size: 1,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(1);
    buf.writeUInt8(value as number);
    return buf;
  },
  decode: (buf: Buffer) => buf.readInt8(),
};

export const uint16be: BinaryParser = {
  size: 2,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(2);
    buf.writeUInt16BE(value as number);
    return buf;
  },
  decode: (buf: Buffer) => buf.readInt16BE(),
};

export const uint16le: BinaryParser = {
  size: 2,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(2);
    buf.writeUInt16LE(value as number);
    return buf;
  },
  decode: (buf: Buffer) => buf.readInt16LE(),
};

export const uint32be: BinaryParser = {
  size: 4,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(4);
    buf.writeUInt32BE(value as number);
    return buf;
  },
  decode: (buf: Buffer) => buf.readInt32BE(),
};

export const uint32le: BinaryParser = {
  size: 4,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(4);
    buf.writeUInt32LE(value as number);
    return buf;
  },
  decode: (buf: Buffer) => buf.readInt32LE(),
};

export const uintbe = (bytes: number): BinaryParser => ({
  size: bytes,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(bytes);
    buf.writeUIntBE(value as number, 0, bytes);
    return buf;
  },
  decode: (buf: Buffer) => buf.readUIntBE(0, bytes),
});

export const uintle = (bytes: number): BinaryParser => ({
  size: bytes,
  encode: (value: BinaryType) => {
    const buf = Buffer.alloc(bytes);
    buf.writeUIntLE(value as number, 0, bytes);
    return buf;
  },
  decode: (buf: Buffer) => buf.readUIntLE(0, bytes),
});

export const buffer = (bytes: number): BinaryParser => ({
  size: bytes,
  encode: (value: BinaryType) => value as Buffer,
  decode: (buf: Buffer) => Buffer.from(buf, 0, bytes),
});

export const array = (length: number, parser: BinaryParser): BinaryParser => ({
  size: length * parser.size,
  encode: (value: BinaryType) =>
    (value as Array<BinaryType>).reduce(
      (buf, val) => Buffer.concat([buf as Buffer, parser.encode(val)]),
      Buffer.alloc(0),
    ) as Buffer,
  decode: (buf: Buffer) =>
    new Array(length)
      .fill(0)
      .map((_, i) =>
        parser.decode(buf.slice(i * parser.size, (i + 1) * parser.size)),
      ),
});

export const choice = (key: string, map: StructMap) => (
  obj: BinaryObject,
): BinaryParser => {
  const _key = obj[key] as string | number;
  const parser = map[_key];
  return {
    size: parser.size,
    encode: parser.encode,
    decode: parser.decode,
  };
};

const getSize = (obj: BinaryStruct | BinaryParser): number =>
  Object.values(obj).reduce(
    (total, prop) =>
      prop.size ? total + (prop.size as number) : total + getSize(prop),
    0,
  );

const getParser = (
  bstruct: BinaryStruct,
  key: string,
  obj: BinaryObject,
): BinaryParser => {
  let parser = bstruct[key] as BinaryParser;
  const fnparser = bstruct[key] as ChoiceParser;
  if (isFunction(parser)) {
    parser = fnparser(obj);
  }
  return parser;
};

export const struct = (bstruct: BinaryStruct): StructParser => {
  const encode = (obj: unknown): Buffer => {
    const bobj = obj as BinaryObject;
    return Object.keys(bstruct)
      .map((key) => {
        const parser = getParser(bstruct, key, bobj);
        return parser.encode(bobj[key] as BinaryType);
      })
      .reduce((buf, chunk) => Buffer.concat([buf, chunk]), Buffer.alloc(0));
  };

  const decode = <T>(buf: Buffer): T => {
    let offset = 0;
    const obj: BinaryObject = {};
    Object.keys(bstruct).forEach((key) => {
      const parser = getParser(bstruct, key, obj);
      const chunk = buf.slice(offset, offset + (parser.size as number));
      obj[key] = parser.decode(chunk);
      offset += parser.size;
    });
    return (obj as unknown) as T;
  };

  return {
    size: getSize(bstruct),
    encode,
    decode,
    struct: bstruct,
  };
};
