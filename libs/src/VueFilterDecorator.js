"use strict";
var Vue = require('vue');
var tools_1 = require('../utils/tools');
var utilities_1 = require('../utils/utilities');
function Filter(local) {
    return function (target) {
        var newInstance = tools_1.Construct(target);
        var options = {};
        if (newInstance.filter) {
            options.filter = newInstance.filter;
        }
        else {
            for (var key in newInstance) {
                var isFunc = typeof newInstance[key] === 'function';
                if ((key === 'read' || key === 'write') && isFunc) {
                    options[key] = newInstance[key];
                }
            }
        }
        var filter = utilities_1.unCapitalize(target.name);
        if (local && utilities_1.vueVersion === 1) {
            return (_a = {}, _a[filter] = options.filter ? options.filter : options, _a);
        }
        else {
            if (options.filter) {
                Vue.filter(filter, options.filter);
            }
            else {
                Vue.filter(filter, options);
            }
            return Vue.filter(filter);
        }
        var _a;
    };
}
exports.Filter = Filter;
//# sourceMappingURL=VueFilterDecorator.js.map