import {is, Record} from 'immutable'
import {assert} from 'chai'
import {CompositeConv} from 'conv'
import ImmutableConv from '../dist/ImmutableConv'

describe('ImmutableConv', () => {

    describe('#withRecord()', () => {

        let conv = new ImmutableConv([])

        describe('result when calling with name parameter', () => {

            let Foo = Record({foo: 3}),
                foo = Foo(),
                fooConv = conv.withRecord(Foo, 'Foo'),
                fooDumped = {'$immutable.Foo': {foo: 3}}

            it('is a new instance of ImmutableConv', () => {
                assert.instanceOf(conv, ImmutableConv)
                assert.notEqual(conv, fooConv)
            })

            it('dumps added record using given name as token', () => {
                assert.deepEqual(fooConv.dump(foo), fooDumped)
            })

            it('restores dumped record', () => {
                assert(is(foo, fooConv.restore(fooDumped)))
            })

            it('overrides name for named record', () => {
                let fooConv2 = conv.withRecord(Foo, 'Bar'),
                    dumped2 = {'$immutable.Bar': {foo: 3}}
                assert.deepEqual(dumped2, fooConv2.dump(foo))
            })

        })

        describe('result when calling without name parameter', () => {

            let Bar = Record({bar: 14}, 'Bar'),
                bar = Bar(),
                barConv = conv.withRecord(Bar),
                barDumped = {'$immutable.Bar': {bar: 14}}

            it('is a new instance of ImmutableConv', () => {
                assert.instanceOf(conv, ImmutableConv)
                assert.notEqual(conv, barConv)
            })

            it('dumps added record using record name as token', () => {
                assert.deepEqual(barConv.dump(bar), barDumped)
            })

            it('restores dumped record', () => {
                assert(is(bar, barConv.restore(barDumped)))
            })

            it('throws an error if given record has no name', () => {
                let Foo = Record({foo: 3}),
                    test = () => conv.withRecord(Foo)
                assert.throw(test, 'Got unnamed record and missing name parameter')
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
                foobarConv = conv.withRecord(Foo).withRecord(Bar)

            it('dumps nested records', () => {
                assert.deepEqual(dumped, foobarConv.dump(foo))
            })

            it('dumps nested records', () => {
                assert(is(foo, foobarConv.restore(dumped)))
            })
        })


        describe('namespace', () => {

            let Foo = Record({foo: 3}),
                foo = Foo(),
                fooConv = conv.withRecord(Foo, 'Foo', 'bar'),
                fooDumped = {'$bar.Foo': {foo: 3}}

            it('takes record namespace as fourth optional argument', () => {
                assert.deepEqual(fooDumped, fooConv.dump(foo))
                assert(is(foo, fooConv.restore(fooDumped)))
            })
        })

    })

})