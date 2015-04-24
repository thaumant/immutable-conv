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
