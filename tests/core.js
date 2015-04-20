import {is, List, Set, OrderedSet, Stack, Map, OrderedMap, Record, Seq} from 'immutable'
import {assert} from 'chai'
import conv from '../dist/core.js'

describe('core', () => {

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