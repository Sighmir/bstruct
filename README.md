# b-struct

[npm-url]: https://npmjs.org/package/b-struct
[npm-image]: https://img.shields.io/npm/v/b-struct.svg
[pipeline-image]: https://github.com/Sighmir/b-struct/workflows/CI/CD/badge.svg
[pipeline-url]: https://github.com/Sighmir/b-struct/actions?query=workflow%3ACI%2FCD
[coverage-image]: https://codecov.io/gh/Sighmir/b-struct/graph/badge.svg
[coverage-url]: https://codecov.io/gh/Sighmir/b-struct
[quality-image]: https://sonarcloud.io/api/project_badges/measure?project=b-struct&metric=alert_status
[quality-url]: https://sonarcloud.io/dashboard?id=b-struct
[depstat-url]: https://david-dm.org/Sighmir/b-struct
[depstat-image]: https://david-dm.org/Sighmir/b-struct/status.svg
[devdepstat-url]: https://david-dm.org/Sighmir/b-struct?type=dev
[devdepstat-image]: https://david-dm.org/Sighmir/b-struct/dev-status.svg

[![NPM version][npm-image]][npm-url]
[![Pipeline Status][pipeline-image]][pipeline-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Sonarcloud Status][quality-image]][quality-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Dev Dependency Status][devdepstat-image]][devdepstat-url]

Declaratively encode and decode binary data by Guilherme Caulada

Inspired by [restructure](https://github.com/foliojs/restructure) and [binary-parser](https://github.com/keichi/binary-parser)

## Example

```ts
import * as b from "b-struct";

export const login = b.struct({
  length: b.int16le,
  op: b.int16le,
  s1: b.skip(20),
  account: b.string(33, "utf8"),
  s2: b.skip(26),
  password: b.string(16, "base64"),
});

const loginObj = {
  length: 4080,
  op: 3,
  account: "abcde",
  password: "ZWZnaGkK",
};

const buf = login.encode(loginObj);
const obj = login.decode<typeof loginObj>(buf);
```

## API

### b.struct({})

Create a binary structure encoder/decoder, functions encode and decode are available, property struct returns the argument used to build the structure encode/decoder, property size returns the added size of all binary parsers used on the structure.

### b.skip(bytes)

Skip a certain amount of bytes, if the variable is a buffer on the encoded object, simply copy it to the new buffer, if it's something else, create a new buffer and fill it with zeros. When decoding it simply copies part of the buffer to the new object.

### b.string(length, encoding)

Parse bytes as a string. Encoding can be any BufferEncoding.

### b.bool

Parse bytes as boolean.

### b.[u]int{8, 16, 32, 64}{le, be}

Parse bytes as integer.

### b.float{le, be}

Parse bytes as float.

### b.double{le, be}

Parse bytes as double.

### b.buffer(bytes)

Copy part of the buffer to the object when decoding, or a buffer variable from the object to the new buffer when encoding.

### b.array(length, parser)

Parse an array using one of the previous parsers.

### b.choice(key, structs)

Uses the value of a variable on the parent object to pick a parser for a nested object. You can also use b.struct as a parser for nested objects.

## License

```
b-struct - Declaratively encode and decode binary data
Copyright (C) 2020  Guilherme Caulada

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
