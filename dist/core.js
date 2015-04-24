'use strict';

var conv = require('conv');
var _require = require('immutable');

var List = _require.List;
var Set = _require.Set;
var OrderedSet = _require.OrderedSet;
var Map = _require.Map;
var OrderedMap = _require.OrderedMap;
var Stack = _require.Stack;
var Range = _require.Range;
var Repeat = _require.Repeat;
var Record = _require.Record;
var Iterable = _require.Iterable;

module.exports = conv.extendWith([{
    'class': List,
    token: 'List',
    namespace: 'immutable',
    dump: 'toArray',
    restore: function (arr) {
        return new List(arr);
    }
}, {
    'class': Set,
    token: 'Set',
    namespace: 'immutable',
    dump: 'toArray',
    restore: function (arr) {
        return new Set(arr);
    }
}, {
    'class': OrderedSet,
    token: 'OrderedSet',
    namespace: 'immutable',
    dump: 'toArray',
    restore: function (arr) {
        return new OrderedSet(arr);
    }
}, {
    'class': Stack,
    token: 'Stack',
    namespace: 'immutable',
    dump: 'toArray',
    restore: function (arr) {
        return new Stack(arr);
    }
}, {
    'class': Map,
    token: 'Map',
    namespace: 'immutable',
    dump: function (map) {
        return map.entrySeq().toArray();
    },
    restore: function (pairs) {
        return new Map(pairs);
    }
}, {
    'class': OrderedMap,
    token: 'OrderedMap',
    namespace: 'immutable',
    dump: function (map) {
        return map.entrySeq().toArray();
    },
    restore: function (pairs) {
        return new OrderedMap(pairs);
    }
}, {
    token: 'Range',
    namespace: 'immutable',
    'class': Range,
    dump: function (r) {
        return [r._start, r._end, r._step];
    },
    restore: function (d) {
        return new Range(d[0], d[1], d[2]);
    }
}, {
    token: 'Repeat',
    namespace: 'immutable',
    'class': Repeat,
    dump: function (r) {
        return [r._value, r.size];
    },
    restore: function (dumped) {
        return new Repeat(dumped[0], dumped[1]);
    }
}, {
    'class': Record,
    token: 'Record',
    namespace: 'immutable',
    dump: function () {
        throw new Error('Dumping unregistered record');
    },
    restore: function () {
        throw new Error('Restoring unregistered record');
    }
}, {
    'class': Iterable,
    token: 'Iterable',
    namespace: 'immutable',
    dump: function () {
        throw new Error('Dumping an arbitrary immutable iterable is forbidden');
    },
    restore: function () {
        throw new Error('Restoring an arbitrary immutable iterable is forbidden');
    }
}]);