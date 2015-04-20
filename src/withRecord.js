const conv = require('conv'),
    {Record} = require('immutable')

module.exports = function withRecord(compositeConv, RecordClass, name) {
    if (!(RecordClass && (RecordClass.prototype instanceof Record))) throw new Error('Not a record')
    return compositeConv.extendWith({
        class:     RecordClass,
        token:     name || RecordClass.prototype._name,
        namespace: 'immutable',
        dump:      (rec) => rec.toObject(),
        restore:   (obj) => RecordClass(obj)
    })
}