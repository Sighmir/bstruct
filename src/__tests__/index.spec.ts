import * as b from "../index";

const struct = b.struct({
  a: b.array(5, b.int16be),
  b: b.bool,
  c: b.buffer(5),
  d: b.doublebe,
  e: b.doublele,
  f: b.floatbe,
  h: b.floatle,
  i: b.int16be,
  j: b.int16le,
  k: b.int32be,
  l: b.int32le,
  m: b.int64be,
  n: b.int64le,
  o: b.int8,
  p: b.intbe(6),
  q: b.intle(6),
  r: b.skip(5),
  s: b.skip(5),
  t: b.struct({
    a: b.uint16be,
    b: b.uint16le,
    c: b.uint32be,
    d: b.uint32le,
    e: b.uint64be,
    f: b.uint64le,
    g: b.uint8,
    h: b.uintbe(6),
    i: b.uintle(6),
  }),
  u: b.choice("o", {
    5: b.struct({
      a: b.uint16le,
    }),
  }),
  v: b.string(5, "utf8"),
});

const obj = {
  a: [1, 2, 3, 4, 5],
  b: true,
  c: Buffer.alloc(5).fill(1),
  d: 5.2,
  e: 5.2,
  f: 5.2,
  h: 5.2,
  i: 5,
  j: 5,
  k: 5,
  l: 5,
  m: BigInt(3000000000),
  n: BigInt(3000000000),
  o: 5,
  p: 5,
  q: 5,
  r: Buffer.alloc(5).fill(1),
  s: undefined,
  t: {
    a: 5,
    b: 5,
    c: 5,
    d: 5,
    e: BigInt(3000000000),
    f: BigInt(3000000000),
    g: 5,
    h: 5,
    i: 5,
  },
  u: {
    a: 5,
  },
  v: "abcde",
};

const hex =
  "000100020003000400050101010101014014cccccccccccdcdcccccccccc144040a666666666a64000050500000000050500000000000000b2d05e00005ed0b200000000050000000000050500000000000101010101000000000000050500000000050500000000000000b2d05e00005ed0b2000000000500000000000505000000000005006162636465";

describe("binary", () => {
  it("Should encode object to buffer", () => {
    const buffer = struct.encode(obj);
    expect(buffer.toString("hex")).toEqual(hex);
  });

  it("Should decode buffer to object", () => {
    const buffer = Buffer.from(hex, "hex");
    const bobj = struct.decode<typeof obj>(buffer);
    bobj.f = Number(bobj.f.toFixed(2));
    bobj.h = Number(bobj.h.toFixed(2));
    expect(bobj).toEqual({ ...obj, s: Buffer.alloc(5).fill(0) });
  });
});
