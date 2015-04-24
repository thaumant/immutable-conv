import {is, Record} from 'immutable'
import {assert} from 'chai'
import conv from '../dist/core'
import {CompositeConv} from 'conv'
import withRecord from '../dist/withRecord'

describe('withRecord()', () => {

    describe('result when calling with name parameter', () => {

        const Foo = Record({foo: 3}),
            foo = Foo(),
            fooConv = withRecord(conv, Foo, 'Foo'),
            fooDumped = {'$immutable.Foo': {foo: 3}}

        it('is a new converter', () => {
            assert.instanceOf(conv, CompositeConv)
            assert.notEqual(conv, fooConv)
        })

        it('dumps added record using given name as token', () => {
            assert.deepEqual(fooConv.dump(foo), fooDumped)
        })

        it('restores dumped record', () => {
            assert(is(foo, fooConv.restore(fooDumped)))
        })

    })

    describe('result when calling without name parameter', () => {

        const Bar = Record({bar: 14}, 'Bar'),
            bar = Bar(),
            barConv = withRecord(conv, Bar),
            barDumped = {'$immutable.Bar': {bar: 14}}

        it('is a new converter', () => {
            assert.instanceOf(conv, CompositeConv)
            assert.notEqual(conv, barConv)
        })

        it('dumps added record using record name as token', () => {
            assert.deepEqual(barConv.dump(bar), barDumped)
        })

        it('restores dumped record', () => {
            assert(is(bar, barConv.restore(barDumped)))
        })
        
    })

    describe('nested records', () => {
        let Foo = Record({foo: 3, bar: 14}, 'Foo'),
            Bar = Record({baz: 92, qux: 6}, 'Bar'),
            foo = Foo({bar: Bar()}),
            dumped = {'$immutable.Foo': {
                foo: 3,
                bar: {'$immutable.Bar': {baz: 92, qux: 6}}
            }},
            foobarConv = withRecord(withRecord(conv, Foo), Bar)

        it('dumps nested records', () => {
            assert.deepEqual(dumped, foobarConv.dump(foo))
        })

        it('dumps nested records', () => {
            assert(is(foo, foobarConv.restore(dumped)))
        })
    })

})