"use strict";
var Vue = require('vue');
var tools_1 = require('../utils/tools');
var utilities_1 = require('../utils/utilities');
function Mixin(options) {
    if (!options)
        options = {};
    delete options.tagName;
    var isGlob = options.global;
    delete options.global;
    return function (target) {
        clearObject(target);
        var proto = target.prototype;
        var mixin = utilities_1.initOptions(options);
        var instance = utilities_1.Construct(target);
        var keys = utilities_1.getAllProperties(instance);
        proto['$mixin$'] = proto['$mixin$'] || [];
        proto['$prop$'] = proto['$prop$'] || {};
        mixin = utilities_1.parseOptions(instance, mixin, keys);
        mixin = utilities_1.parseProps(instance, mixin);
        var data = mixin.data;
        Object.keys(data).forEach(function (key) {
            if (!proto.$prop$[key]) {
                proto.$prop$[key] = instance[key];
            }
            else if (proto.$prop$[key] && proto.$prop$[key] !== instance[key]) {
                mixin.data[key] = instance[key];
            }
            else {
                delete data[key];
            }
        });
        if (Object.keys(data).length === 0) {
            delete mixin.data;
        }
        else {
            mixin.data = function () { return tools_1.assign({}, data); };
        }
        var keep = ['$$methodsToRemove', '$mixin$', '$prop$', 'constructor'];
        for (var key in target.prototype) {
            if (!~keep.indexOf(key)) {
                delete target.prototype[key];
            }
        }
        for (var key in instance.$$methodsToRemove) {
            delete mixin.methods[instance.$$methodsToRemove[key]];
        }
        mixin = utilities_1.cleanOptions(mixin);
        if (isGlob) {
            Vue.mixin(mixin);
            return;
        }
        proto.$mixin$.push(mixin);
        tools_1.assign(target, mixin);
        return target;
    };
}
exports.Mixin = Mixin;
function clearObject(target) {
    var keys = Object.keys(target);
    for (var key in keys) {
        var prop = keys[key];
        delete target[prop];
    }
}
//# sourceMappingURL=MixinsDecorator.js.map