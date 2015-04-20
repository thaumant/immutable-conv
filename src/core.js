const conv = require('conv'),
    {List, Set, OrderedSet, Map, OrderedMap, Stack, Record} = require('immutable')

module.exports = conv.extendWith([
    {
        class:     List,
        token:     'List',
        namespace: 'immutable',
        dump:      'toArray',
        restore:   (arr) => List(arr)
    },
    {
        class:     Set,
        token:     'Set',
        namespace: 'immutable',
        dump:      'toArray',
        restore:   (arr) => Set(arr)
    },
    {
        class:     OrderedSet,
        token:     'OrderedSet',
        namespace: 'immutable',
        dump:      'toArray',
        restore:   (arr) => OrderedSet(arr)
    },
    {
        class:     Stack,
        token:     'Stack',
        namespace: 'immutable',
        dump:      'toArray',
        restore:   (arr) => Stack(arr)
    },
    {
        class:     Map,
        token:     'Map',
        namespace: 'immutable',
        dump:      (map) => map.entrySeq().toArray(),
        restore:   (pairs) => Map(pairs)
    },
    {
        class:     OrderedMap,
        token:     'OrderedMap',
        namespace: 'immutable',
        dump:      (map) => map.entrySeq().toArray(),
        restore:   (pairs) => OrderedMap(pairs)
    },
    {
        class:     Record,
        token:     'Record',
        namespace: 'immutable',
        dump:      () => { throw new Error('Dumping unregistered record') },
        restore:   () => { throw new Error('Restoring unregistered record') }
    },
    {
        class:     Seq,
        token:     'Seq',
        namespace: 'immutable',
        dump:      () => { throw new Error('Dumping Seq is forbidden, use conv.withSeqs()') },
        restore:   () => { throw new Error('Restoring Seq is forbidden, use conv.withSeqs()') }
    }
])