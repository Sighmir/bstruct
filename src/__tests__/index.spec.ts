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

  it("Empty struct should decode empty object from buffer", () => {
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

  it("Should encode value to buffer after converting to boolean", () => {
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

  it("Should encode value to buffer after converting to doublebe", () => {
    const buffer = m.doublebeStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(8, [0x7f, 0xf8], "be"));
  });

  it("Should encode value to buffer after converting to doublele", () => {
    const buffer = m.doubleleStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(8, [0x7f, 0xf8], "le"));
  });

  it("Should encode value to buffer after converting to floatbe", () => {
    const buffer = m.floatbeStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(4, [0x7f, 0xc0], "be"));
  });

  it("Should encode value to buffer after converting to floatle", () => {
    const buffer = m.floatleStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(4, [0x7f, 0xc0], "le"));
  });

  it("Should encode value to buffer after converting to int16be", () => {
    const buffer = m.int16beStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(2, [], "be"));
  });

  it("Should encode value to buffer after converting to int16le", () => {
    const buffer = m.int16leStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(2, [], "le"));
  });

  it("Should encode value to buffer after converting to int32be", () => {
    const buffer = m.int32beStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(4, [], "be"));
  });

  it("Should encode value to buffer after converting to int32le", () => {
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

  it("Should encode value to buffer after converting to int8", () => {
    const buffer = m.int8Struct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(1, []));
  });

  it("Should encode value to buffer after converting to intbe", () => {
    const buffer = m.intbeStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(6, [], "be"));
  });

  it("Should encode value to buffer after converting to intle", () => {
    const buffer = m.intleStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(6, [], "le"));
  });

  it("Should encode value to buffer as empty buffer", () => {
    const buffer = m.skipStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.emptyBuffer(10));
  });

  it("Should encode value to buffer after converting to uint16be", () => {
    const buffer = m.uint16beStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(2, [], "be"));
  });

  it("Should encode value to buffer after converting to uint16le", () => {
    const buffer = m.uint16leStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(2, [], "le"));
  });

  it("Should encode value to buffer after converting to uint32be", () => {
    const buffer = m.uint32beStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(4, [], "be"));
  });

  it("Should encode value to buffer after converting to uint32le", () => {
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

  it("Should encode value to buffer after converting to uint8", () => {
    const buffer = m.uint8Struct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(1, []));
  });

  it("Should encode value to buffer after converting to uintbe", () => {
    const buffer = m.uintbeStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(6, [], "be"));
  });

  it("Should encode value to buffer after converting to uintle", () => {
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

  it("Should encode value to buffer after converting to string", () => {
    const buffer = m.stringStruct.encode(m.invalidObj);
    expect(buffer).toEqual(m.invalidBuffer(5, [0x35], "be"));
  });
});
