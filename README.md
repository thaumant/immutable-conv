# immutable-conv [![Build Status](https://travis-ci.org/thaumant/immutable-conv.svg?branch=master)](https://travis-ci.org/thaumant/immutable-conv)

Serialize and restore immutable collections.

## Quick start
```javascript
import conv from 'immutable-conv'
import {is, List, Map} from 'immutable'

let lst = List([3, 14, 15]),
    serialized = conv.serialize(lst)

serialized === '{"$immutable.List":[3,14,15]}' // true
is(conv.parse(serialized), lst) // true


// conv.dump() returns the collection represented as a plain JSON structure
let map = (new Map())
    .set(3, List([14]))
    .set(List([15]), 9);
let dumped = conv.dump(map)
/* returns the structure:
{ "$immutable.Map": [
    [ 3, { "$immutable.List": [ 14 ] } ],
    [ { "$immutable.List": [ 15 ] }, 9 ]
] }
*/
is(conv.restore(dumped), map) // true

```

Following types are serializeable:
- List
- Set
- OrderedSet
- Stack
- Map
- OrderedMap
- Range
- Repeat

Range and Repeat may be infinite:
```javascript
conv.serialize(Range(10))
// '{"$immutable.Range":[10,{"$Infinity":1},1]}'
```

Serializing arbitrary Seq, Collection or Iterable classes is not supported.

## Registering records
Records are not serializeable and should be added using `#withRecord()` method.
```javascript
let Foo = Record({bar: null}),
    foo = Foo({bar: 3})

// This would throw [Error: Dumping unregistered record]
// conv.serialize(foo)

conv = conv.withRecord(Foo, 'Foo')
// Method returns new converter.
// A name (second argument) is required for unnamed records
conv.serialize(foo) // {"$immutable.Foo": 3}


let Baz = Record({qux: null}, 'Baz'),
    baz = Baz({qux: 14})

conv = conv.withRecord(Baz, null, 'mux')
// name is optional for named records
// third optional argument is a namespace
conv.serialize(baz) // {"$mux.Baz": 14}
```

## Documentation
Immutable-conv is based on [conv](https://github.com/thaumant/conv). See the conv readme for basic api and examples.
