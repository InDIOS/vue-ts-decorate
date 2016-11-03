"use strict";
var Vue = require('vue');
var utilities_1 = require('../utils/utilities');
function Filter(target, key, descriptor) {
    if (key && descriptor && utilities_1.vueVersion === 1) {
        if (!target.$$filters)
            target.$$filters = {};
        target.$$filters[key] = target[key];
        if (!target.$$methodsToRemove)
            target.$$methodsToRemove = [];
        target.$$methodsToRemove.push(key);
    }
    else if (target && !key && !descriptor) {
        var newInstance = utilities_1.Construct(target);
        var options = {};
        if (newInstance.filter) {
            options.filter = newInstance.filter;
        }
        else {
            for (var key_1 in newInstance) {
                var isFunc = typeof newInstance[key_1] === 'function';
                if ((key_1 === 'read' || key_1 === 'write') && isFunc) {
                    options[key_1] = newInstance[key_1];
                }
            }
        }
        var filter = utilities_1.unCapitalize(target.name);
        if (options.filter) {
            Vue.filter(filter, options.filter);
        }
        else {
            Vue.filter(filter, options);
        }
        return Vue.filter(filter);
    }
}
exports.Filter = Filter;
//# sourceMappingURL=VueFilterDecorator.js.map