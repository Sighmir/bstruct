import * as m from "../__mocks__";

describe("bstruct", () => {
  it("Should encode object to buffer", () => {
    const buffer = m.validStruct.encode(m.validObj);
    expect(buffer).toEqual(m.validBuffer);
  });

  it("Should decode buffer to object", () => {
    const obj = m.validStruct.decode<typeof m.validObj>(m.validBuffer);
    obj.f = Number(obj.f.toFixed(2));
    obj.g = Number(obj.g.toFixed(2));
    expect(obj).toEqual({ ...m.validObj, r: m.emptyBuffer(5) });
  });

  it("Should throw RangeError when buffer not long enough for parser", () => {
    try {
      m.validStruct.decode(m.emptyBuffer(0));
    } catch (err) {
      expect(err.message).toEqual(
        "Attempt to access memory outside buffer bounds",
      );
    }
  });

  it("Empty struct should encode object to empty buffer", () => {
    const buffer = m.emptyStruct.encode(m.validObj);
    expect(buffer).toEqual(m.emptyBuffer(0));
  });

  it("Empty buffer should decode to empty object", () => {
    const obj = m.emptyStruct.decode(m.validBuffer);
    expect(obj).toEqual({});
  });

  it("Should throw TypeError on b.array when encoding invalid object", () => {
    try {
      m.arrayStruct.encode(m.invalidObj);
    } catch (err) {
      expect(err.message).toEqual("Expected array but value is string");
    }
  });

  it("Should encode value to buffer as boolean", () => {
    const buffer = m.boolStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(1, [1]));
  });

  it("Should throw TypeError on b.buffer when encoding invalid object", () => {
    try {
      m.bufferStruct.encode(m.invalidObj);
    } catch (err) {
      expect(err.message).toEqual("Expected buffer but value is string");
    }
  });

  it("Should encode value to buffer as doublebe", () => {
    const buffer = m.doublebeStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(8, [0x7f, 0xf8], "be"));
  });

  it("Should encode value to buffer as doublele", () => {
    const buffer = m.doubleleStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(8, [0x7f, 0xf8], "le"));
  });

  it("Should encode value to buffer as floatbe", () => {
    const buffer = m.floatbeStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(4, [0x7f, 0xc0], "be"));
  });

  it("Should encode value to buffer as floatle", () => {
    const buffer = m.floatleStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(4, [0x7f, 0xc0], "le"));
  });

  it("Should encode value to buffer as int16be", () => {
    const buffer = m.int16beStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(2, [], "be"));
  });

  it("Should encode value to buffer as int16le", () => {
    const buffer = m.int16leStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(2, [], "le"));
  });

  it("Should encode value to buffer as int32be", () => {
    const buffer = m.int32beStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(4, [], "be"));
  });

  it("Should encode value to buffer as int32le", () => {
    const buffer = m.int32leStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(4, [], "le"));
  });

  it("Should throw TypeError on b.int64be when encoding invalid object", () => {
    try {
      m.int64beStruct.encode(m.invalidObj);
    } catch (err) {
      expect(err.message).toEqual("Expected bigint but value is string");
    }
  });

  it("Should throw TypeError on b.int64le when encoding invalid object", () => {
    try {
      m.int64leStruct.encode(m.invalidObj);
    } catch (err) {
      expect(err.message).toEqual("Expected bigint but value is string");
    }
  });

  it("Should encode value to buffer as int8", () => {
    const buffer = m.int8Struct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(1, []));
  });

  it("Should encode value to buffer as intbe", () => {
    const buffer = m.intbeStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(6, [], "be"));
  });

  it("Should encode value to buffer as intle", () => {
    const buffer = m.intleStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(6, [], "le"));
  });

  it("Should encode value to buffer as empty buffer", () => {
    const buffer = m.skipStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.emptyBuffer(10));
  });

  it("Should encode value to buffer as uint16be", () => {
    const buffer = m.uint16beStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(2, [], "be"));
  });

  it("Should encode value to buffer as uint16le", () => {
    const buffer = m.uint16leStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(2, [], "le"));
  });

  it("Should encode value to buffer as uint32be", () => {
    const buffer = m.uint32beStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(4, [], "be"));
  });

  it("Should encode value to buffer as uint32le", () => {
    const buffer = m.uint32leStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(4, [], "le"));
  });

  it("Should throw TypeError on b.uint64be when encoding invalid object", () => {
    try {
      m.uint64beStruct.encode(m.invalidObj);
    } catch (err) {
      expect(err.message).toEqual("Expected bigint but value is string");
    }
  });

  it("Should throw TypeError on b.uint64le when encoding invalid object", () => {
    try {
      m.uint64leStruct.encode(m.invalidObj);
    } catch (err) {
      expect(err.message).toEqual("Expected bigint but value is string");
    }
  });

  it("Should encode value to buffer as uint8", () => {
    const buffer = m.uint8Struct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(1, []));
  });

  it("Should encode value to buffer as uintbe", () => {
    const buffer = m.uintbeStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(6, [], "be"));
  });

  it("Should encode value to buffer as uintle", () => {
    const buffer = m.uintleStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(6, [], "le"));
  });

  it("Should throw TypeError on b.choice without default when encoding invalid object", () => {
    try {
      m.choiceStruct.encode(m.invalidObj);
    } catch (err) {
      expect(err.message).toEqual(
        'Parser not found for key "o" of value invalid',
      );
    }
  });

  it("Should encode value to buffer using default choice", () => {
    const buffer = m.defaultChoiceStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.emptyBuffer(0));
  });

  it("Should encode value to buffer as string", () => {
    const buffer = m.stringStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(5, [0x35], "be"));
  });

  it("Should decode value from buffer as array", () => {
    const obj = m.arrayStruct.decode(m.otherBuffer);
    expect(obj).toEqual({ a: [25956, 25442, 24832, 1280, 0] });
  });

  it("Should decode value from buffer as boolean", () => {
    const obj = m.boolStruct.decode(m.otherBuffer);
    expect(obj).toEqual({ b: true });
  });

  it("Should decode value from buffer as buffer", () => {
    const obj = m.bufferStruct.decode(m.otherBuffer);
    expect(obj).toEqual({ c: m.otherBuffer.slice(0, 5) });
  });

  it("Should decode buffer from buffer as doublebe", () => {
    const obj = m.doublebeStruct.decode(m.otherBuffer);
    expect(obj).toEqual({ d: 2.6437886208657196e180 });
  });

  it("Should decode buffer from buffer as doublele", () => {
    const obj = m.doubleleStruct.decode(m.otherBuffer);
    expect(obj).toEqual({ e: 6.955422299199653e-309 });
  });

  it("Should decode buffer from buffer as floatbe", () => {
    const obj = m.floatbeStruct.decode(m.otherBuffer);
    expect(obj).toEqual({ f: 6.7408302962612004e22 });
  });

  it("Should decode buffer from buffer as floatle", () => {
    const obj = m.floatleStruct.decode(m.otherBuffer);
    expect(obj).toEqual({ g: 1.0486612732771272e21 });
  });

  it("Should decode value from buffer as int16be", () => {
    const buffer = m.int16beStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ h: 25956 });
  });

  it("Should decode value from buffer as int16le", () => {
    const buffer = m.int16leStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ i: 25701 });
  });

  it("Should decode value from buffer as int32be", () => {
    const buffer = m.int32beStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ j: 1701077858 });
  });

  it("Should decode value from buffer as int32le", () => {
    const buffer = m.int32leStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ k: 1650680933 });
  });

  it("Should decode value from buffer as int64be", () => {
    const buffer = m.int64beStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ l: BigInt(73060737696871232) * BigInt(100) });
  });

  it("Should decode value from buffer as int64le", () => {
    const buffer = m.int64leStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ m: BigInt(1407793146061925) });
  });

  it("Should decode value from buffer as int8", () => {
    const buffer = m.int8Struct.decode(m.otherBuffer);
    expect(buffer).toEqual({ n: 101 });
  });

  it("Should decode value from buffer as intbe", () => {
    const buffer = m.intbeStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ o: 111481838526720 });
  });

  it("Should decode value from buffer as intle", () => {
    const buffer = m.intleStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ p: 418262508645 });
  });

  it("Should decode value from buffer as buffer", () => {
    const buffer = m.skipStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({
      q: m.otherBuffer.slice(0, 5),
      r: m.otherBuffer.slice(5, 10),
    });
  });

  it("Should decode value from buffer as uint16be", () => {
    const buffer = m.uint16beStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ h: 25956 });
  });

  it("Should decode value from buffer as uint16le", () => {
    const buffer = m.uint16leStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ i: 25701 });
  });

  it("Should decode value from buffer as uint32be", () => {
    const buffer = m.uint32beStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ j: 1701077858 });
  });

  it("Should decode value from buffer as uint32le", () => {
    const buffer = m.uint32leStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ k: 1650680933 });
  });

  it("Should decode value from buffer as uint64be", () => {
    const buffer = m.uint64beStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ l: BigInt(73060737696871232) * BigInt(100) });
  });

  it("Should decode value from buffer as uint64le", () => {
    const buffer = m.uint64leStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ m: BigInt(1407793146061925) });
  });

  it("Should decode value from buffer as uint8", () => {
    const buffer = m.uint8Struct.decode(m.otherBuffer);
    expect(buffer).toEqual({ n: 101 });
  });

  it("Should decode value from buffer as uintbe", () => {
    const buffer = m.uintbeStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ o: 111481838526720 });
  });

  it("Should decode value from buffer as uintle", () => {
    const buffer = m.uintleStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ p: 418262508645 });
  });

  it("Should throw TypeError on b.choice without default when decoding invalid buffer", () => {
    try {
      m.choiceStruct.decode(m.otherBuffer);
    } catch (err) {
      expect(err.message).toEqual(
        'Parser not found for key "o" of value undefined',
      );
    }
  });

  it("Should decode value from buffer using default choice", () => {
    const buffer = m.defaultChoiceStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ t: {} });
  });

  it("Should decode value from buffer as string", () => {
    const buffer = m.stringStruct.decode(m.otherBuffer);
    expect(buffer).toEqual({ u: "edcba" });
  });
});
