const ImmutableConv = require('./ImmutableConv'),
    {List, Set, OrderedSet, Map, OrderedMap, Stack, Range, Repeat, Record, Iterable} = require('immutable')


const immutableConv = new ImmutableConv([
    {
        class:     List,
        token:     'List',
        namespace: 'immutable',
        dump:      'toArray',
        restore:   (arr) => new List(arr)
    },
    {
        class:     Set,
        token:     'Set',
        namespace: 'immutable',
        dump:      'toArray',
        restore:   (arr) => new Set(arr)
    },
    {
        class:     OrderedSet,
        token:     'OrderedSet',
        namespace: 'immutable',
        dump:      'toArray',
        restore:   (arr) => new OrderedSet(arr)
    },
    {
        class:     Stack,
        token:     'Stack',
        namespace: 'immutable',
        dump:      'toArray',
        restore:   (arr) => new Stack(arr)
    },
    {
        class:     Map,
        token:     'Map',
        namespace: 'immutable',
        dump:      (map) => map.entrySeq().toArray(),
        restore:   (pairs) => new Map(pairs)
    },
    {
        class:     OrderedMap,
        token:     'OrderedMap',
        namespace: 'immutable',
        dump:      (map) => map.entrySeq().toArray(),
        restore:   (pairs) => new OrderedMap(pairs)
    },
    {
        token:     'Range',
        namespace: 'immutable',
        class:     Range,
        dump:      (r) => [r._start, r._end, r._step],
        restore:   (d) => new Range(d[0], d[1], d[2])
    },
    {
        token:     'Repeat',
        namespace: 'immutable',
        class:     Repeat,
        dump:      (r) => [r._value, r.size],
        restore:   (dumped) => new Repeat(dumped[0], dumped[1])
    },
    {
        class:     Record,
        token:     'Record',
        namespace: 'immutable',
        dump:      () => { throw new Error('Dumping unregistered record') },
        restore:   () => { throw new Error('Restoring unregistered record') }
    },
    {
        class:     Iterable,
        token:     'Iterable',
        namespace: 'immutable',
        dump:      () => { throw new Error('Dumping an arbitrary immutable iterable is forbidden') },
        restore:   () => { throw new Error('Restoring an arbitrary immutable iterable is forbidden') }
    }
])


module.exports = immutableConv.extendWith(require('conv'))