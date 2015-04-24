'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _require = require('conv');

var CompositeConv = _require.CompositeConv;
var _require2 = require('immutable');

var Record = _require2.Record;

module.exports = (function (_CompositeConv) {
    function ImmutableConv() {
        _classCallCheck(this, ImmutableConv);

        if (_CompositeConv != null) {
            _CompositeConv.apply(this, arguments);
        }
    }

    _inherits(ImmutableConv, _CompositeConv);

    _createClass(ImmutableConv, [{
        key: 'withRecord',
        value: function withRecord(RecordClass, name, namespace) {
            if (!(RecordClass && RecordClass.prototype instanceof Record)) throw new Error('Not a record');
            name = name || RecordClass.prototype._name;
            if (!name) throw new Error('Got unnamed record and missing name parameter');
            return this.extendWith({
                'class': RecordClass,
                token: name,
                namespace: namespace || 'immutable',
                dump: function (rec) {
                    return rec.toObject();
                },
                restore: function (obj) {
                    return RecordClass(obj);
                }
            });
        }
    }]);

    return ImmutableConv;
})(CompositeConv);