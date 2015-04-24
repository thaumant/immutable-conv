import {is, List, Set, OrderedSet, Stack, Map, OrderedMap, Record, Collection, Seq, Range, Repeat} from 'immutable'
import {assert} from 'chai'
import conv from '../dist/core.js'

describe('core types', () => {

    describe('List', () => {

        let lst = List.of(3, 14, 15),
            arr = [3, 14, 15],
            dumped = {'$immutable.List': arr}

        it('dumps to array', () => {
            assert.deepEqual(dumped, conv.dump(lst))
        })

        it('restores from array', () => {
            assert(is(lst, conv.restore(dumped)))
        })

    })

    describe('Set', () => {

        let set = Set.of(3, 14, 15),
            arr = [3, 14, 15],
            dumped = {'$immutable.Set': arr}

        it('dumps to array', () => {
            assert.deepEqual(dumped, conv.dump(set))
        })

        it('restores from array', () => {
            assert(is(set, conv.restore(dumped)))
        })

    })

    describe('OrderedSet', () => {

        let set = OrderedSet.of(3, 14, 15),
            arr = [3, 14, 15],
            dumped = {'$immutable.OrderedSet': arr}

        it('dumps to array', () => {
            assert.deepEqual(dumped, conv.dump(set))
        })

        it('restores from array', () => {
            assert(is(set, conv.restore(dumped)))
        })

    })

    describe('Stack', () => {

        let stack = Stack.of(3, 14, 15),
            arr = [3, 14, 15],
            dumped = {'$immutable.Stack': arr}

        it('dumps to array', () => {
            assert.deepEqual(dumped, conv.dump(stack))
        })

        it('restores from array', () => {
            assert(is(stack, conv.restore(dumped)))
        })

    })

    describe('Map', () => {

        let pairs = [[3, 14], [15, 92]],
            map = Map(pairs),
            dumped = {'$immutable.Map': pairs}

        it('dumps to array of pairs', () => {
            assert.deepEqual(dumped, conv.dump(map))
        })

        it('restores from array of pairs', () => {
            assert(is(map, conv.restore(dumped)))
        })

    })

    describe('OrderedMap', () => {

        let pairs = [[3, 14], [15, 92]],
            map = OrderedMap(pairs),
            dumped = {'$immutable.OrderedMap': pairs}

        it('dumps to array of pairs', () => {
            assert.deepEqual(dumped, conv.dump(map))
        })

        it('restores from array of pairs', () => {
            assert(is(map, conv.restore(dumped)))
        })

    })

    describe('Record', () => {

        let Foo = Record({foo: 3})

        it('throws an error when dumping', () => {
            let test = () => conv.dump(Foo())
            assert.throw(test, 'Dumping unregistered record')
        })

        it('throws an error when restoring', () => {
            let test = () => conv.restore({'$immutable.Record': {foo: 3}})
            assert.throw(test, 'Restoring unregistered record')
        })

    })

    describe('Range', () => {

        let range1 = Range(3, 14),
            range2 = Range(92, 6, 5),
            range3 = Range(35),
            dumped1 = {'$immutable.Range': [3, 14, 1]},
            dumped2 = {'$immutable.Range': [92, 6, -5]},
            dumped3 = {'$immutable.Range': [35, {$Infinity: 1}, 1]}

        it('dumps and restores a range with start and end', () => {
            assert.deepEqual(dumped1, conv.dump(range1))
            assert(is(range1, conv.restore(dumped1)))
        })

        it('dumps and restores a range with additional step', () => {
            assert.deepEqual(dumped2, conv.dump(range2))
            assert(is(range2, conv.restore(dumped2)))
        })

        it('dumps and restores an infinite range', () => {
            assert.deepEqual(dumped3, conv.dump(range3))
            assert(is(range3, conv.restore(dumped3)))
        })

    })

    describe('Repeat', () => {

        let repeat1 = Repeat(14, 3),
            repeat2 = Repeat(15),
            repeat3 = Repeat(Repeat(92, 6), 5),
            dumped1 = {'$immutable.Repeat': [14, 3]},
            dumped2 = {'$immutable.Repeat': [15, {$Infinity: 1}]},
            dumped3 = {'$immutable.Repeat': [{'$immutable.Repeat': [92, 6]}, 5]}

        it('dumps and restores a finite repeat', () => {
            assert.deepEqual(dumped1, conv.dump(repeat1))
            assert(is(repeat1, conv.restore(dumped1)))
        })

        it('dumps and restores an infinite repeat', () => {
            assert.deepEqual(dumped2, conv.dump(repeat2))
            assert(is(repeat2, conv.restore(dumped2)))
        })

        it('dumps and restores nested repeats', () => {
            assert.deepEqual(dumped3, conv.dump(repeat3))
            assert(is(repeat3, conv.restore(dumped3)))
        })

    })

    describe('other arbitrary iterables', () => {

        it('throws an error when dumping a collection', () => {
            let test = () => conv.dump(new Collection.Indexed([3, 14, 15]))
            assert.throw(test, 'Dumping an arbitrary immutable iterable is forbidden')
        })

        it('throws an error when dumping a sequence', () => {
            let test = () => conv.dump(new Seq.Indexed([3, 14, 15]))
            assert.throw(test, 'Dumping an arbitrary immutable iterable is forbidden')
        })

    })

    let nestedExample = Map([
        [Set.of(3, 14), 15],
        [92, List.of(6, 5)]
    ])

    let nestedDumped = {'$immutable.Map': [
        [{'$immutable.Set': [3, 14]}, 15],
        [92, {'$immutable.List': [6, 5]}]
    ]}

    describe('nested structures', () => {

        it('dumps nested immutable structures', () => {
            assert.deepEqual(nestedDumped, conv.dump(nestedExample))
        })

        it('restores nested structures', () => {
            assert(is(nestedExample, conv.restore(nestedDumped)))
        })

    })

    describe('serialization', () => {

        let serialized = JSON.stringify(nestedDumped)

        it('serializes nested immutable structures to JSON by default', () => {
            assert.strictEqual(serialized, conv.serialize(nestedExample))
        })

        it('restores nested immutable structures from JSON', () => {
            assert(is(nestedExample, conv.parse(serialized)))
        })

    })

})