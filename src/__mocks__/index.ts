import * as b from "../index";

export const emptyStruct = b.struct({});

export const arrayStruct = b.struct({
  a: b.array(5, b.int16be),
});

export const boolStruct = b.struct({
  b: b.bool,
});

export const bufferStruct = b.struct({
  c: b.buffer(5),
});

export const doublebeStruct = b.struct({
  d: b.doublebe,
});

export const doubleleStruct = b.struct({
  e: b.doublele,
});

export const floatbeStruct = b.struct({
  f: b.floatbe,
});

export const floatleStruct = b.struct({
  g: b.floatle,
});

export const int16beStruct = b.struct({
  h: b.int16be,
});

export const int16leStruct = b.struct({
  i: b.int16le,
});

export const int32beStruct = b.struct({
  j: b.int32be,
});

export const int32leStruct = b.struct({
  k: b.int32le,
});

export const int64beStruct = b.struct({
  l: b.int64be,
});

export const int64leStruct = b.struct({
  m: b.int64le,
});

export const int8Struct = b.struct({
  n: b.int8,
});

export const intbeStruct = b.struct({
  o: b.intbe(6),
});

export const intleStruct = b.struct({
  p: b.intle(6),
});

export const skipStruct = b.struct({
  q: b.skip(5),
  r: b.skip(5),
});

export const uint16beStruct = b.struct({
  h: b.uint16be,
});

export const uint16leStruct = b.struct({
  i: b.uint16le,
});

export const uint32beStruct = b.struct({
  j: b.uint32be,
});

export const uint32leStruct = b.struct({
  k: b.uint32le,
});

export const uint64beStruct = b.struct({
  l: b.uint64be,
});

export const uint64leStruct = b.struct({
  m: b.uint64le,
});

export const uint8Struct = b.struct({
  n: b.uint8,
});

export const uintbeStruct = b.struct({
  o: b.uintbe(6),
});

export const uintleStruct = b.struct({
  p: b.uintle(6),
});

export const subStruct = b.struct({
  s: b.struct({
    ...uint16beStruct.struct,
    ...uint16leStruct.struct,
    ...uint32beStruct.struct,
    ...uint32leStruct.struct,
    ...uint64beStruct.struct,
    ...uint64leStruct.struct,
    ...uint8Struct.struct,
    ...uintbeStruct.struct,
    ...uintleStruct.struct,
  }),
});

export const choiceStruct = b.struct({
  t: b.choice("o", {
    5: b.struct({
      a: b.uint16le,
    }),
  }),
});

export const defaultChoiceStruct = b.struct({
  t: b.choice("o", {}, b.struct({})),
});

export const stringStruct = b.struct({
  u: b.string(5, "utf8"),
});

export const validStruct = b.struct({
  ...arrayStruct.struct,
  ...boolStruct.struct,
  ...bufferStruct.struct,
  ...doublebeStruct.struct,
  ...doubleleStruct.struct,
  ...floatbeStruct.struct,
  ...floatleStruct.struct,
  ...int16beStruct.struct,
  ...int16leStruct.struct,
  ...int32beStruct.struct,
  ...int32leStruct.struct,
  ...int64beStruct.struct,
  ...int64leStruct.struct,
  ...int8Struct.struct,
  ...intbeStruct.struct,
  ...intleStruct.struct,
  ...skipStruct.struct,
  ...subStruct.struct,
  ...choiceStruct.struct,
  ...stringStruct.struct,
});

export const validObj = {
  a: [1, 2, 3, 4, 5],
  b: true,
  c: Buffer.alloc(5).fill(1),
  d: 5.2,
  e: 5.2,
  f: 5.2,
  g: 5.2,
  h: 5,
  i: 5,
  j: 5,
  k: 5,
  l: BigInt(3000000000),
  m: BigInt(3000000000),
  n: 5,
  o: 5,
  p: 5,
  q: Buffer.alloc(5).fill(1),
  r: undefined,
  s: {
    h: 5,
    i: 5,
    j: 5,
    k: 5,
    l: BigInt(3000000000),
    m: BigInt(3000000000),
    n: 5,
    o: 5,
    p: 5,
  },
  t: {
    a: 5,
  },
  u: "abcde",
};

export const invalidObj = {
  a: "invalid",
  b: "invalid",
  c: "invalid",
  d: "invalid",
  e: "invalid",
  f: "invalid",
  g: "invalid",
  h: "invalid",
  i: "invalid",
  j: "invalid",
  k: "invalid",
  l: "invalid",
  m: "invalid",
  n: "invalid",
  o: "invalid",
  p: "invalid",
  q: "invalid",
  r: "invalid",
  s: {
    h: "invalid",
    i: "invalid",
    j: "invalid",
    k: "invalid",
    l: "invalid",
    m: "invalid",
    n: "invalid",
    o: "invalid",
    p: "invalid",
  },
  t: {
    a: "invalid",
  },
  u: 5,
};

export const validHex =
  "000100020003000400050101010101014014cccccccccccdcdcccccccccc144040a666666666a64000050500000000050500000000000000b2d05e00005ed0b200000000050000000000050500000000000101010101000000000000050500000000050500000000000000b2d05e00005ed0b2000000000500000000000505000000000005006162636465";

export const validBuffer = Buffer.from(validHex, "hex");
export const otherBuffer = Buffer.from(validBuffer).reverse();
export const emptyBuffer = (length: number): Buffer => Buffer.alloc(length);
export const invalidBuffer = (
  length: number,
  arr: number[],
  endianness?: "be" | "le",
): Buffer => {
  const buffer = Buffer.alloc(length);
  if (!endianness || endianness === "be") {
    for (let i = 0; i < length; i++) {
      buffer[i] = arr[i] || 0;
    }
  } else {
    for (let i = length; i > 0; i--) {
      buffer[length - i] = arr[i - 1] || 0;
    }
  }
  return buffer;
};
