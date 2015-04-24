const {CompositeConv} = require('conv'),
    {Record} = require('immutable')

module.exports = class ImmutableConv extends CompositeConv {

    withRecord(RecordClass, name, namespace) {
        if (!(RecordClass && (RecordClass.prototype instanceof Record))) throw new Error('Not a record')
        name = name || RecordClass.prototype._name
        if (!name) throw new Error('Got unnamed record and missing name parameter')
        return this.extendWith({
            class:     RecordClass,
            token:     name,
            namespace: namespace || 'immutable',
            dump:      (rec) => rec.toObject(),
            restore:   (obj) => RecordClass(obj)
        })
    }

}