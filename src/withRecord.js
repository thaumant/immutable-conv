const conv = require('conv'),
    {Record} = require('immutable')

module.exports = function withRecord(compositeConv, RecordClass, name) {
    if (!(RecordClass && (RecordClass.prototype instanceof Record))) throw new Error('Not a record')
    name = name || RecordClass.prototype._name
    if (!name) throw new Error('Named record or name parameter required')
    return compositeConv.extendWith({
        class:     RecordClass,
        token:     name,
        namespace: 'immutable',
        dump:      (rec) => rec.toObject(),
        restore:   (obj) => RecordClass(obj)
    })
}