"use strict";
var Vue = require("vue");
var tools_1 = require("../utils/tools");
var utilities_1 = require("../utils/utilities");
function Directive(params) {
    var options = {};
    if (params) {
        var local = params.local;
        delete params.local;
        options = params;
        params = local;
    }
    return function (target) {
        var instance = tools_1.Construct(target);
        if (options.params && !options.paramWatchers)
            options.paramWatchers = {};
        for (var key in instance) {
            var isFunc_1 = typeof instance[key] === 'function';
            if (isFunc_1) {
                if (~['bind', 'update', 'unbind'].indexOf(key)) {
                    options[key] = instance[key];
                }
                else if (~['inserted', 'componentUpdated'].indexOf(key) && utilities_1.vueVersion === 2) {
                    options[key] = instance[key];
                }
                else if (options.paramWatchers && ~options.params.indexOf(key)) {
                    options.paramWatchers[key] = instance[key];
                }
            }
        }
        var attr = utilities_1.camelToKebabCase(target.name);
        var isFunc = Object.keys(options).length === 1 && options.update;
        if (params && utilities_1.vueVersion === 1) {
            return _a = {}, _a[attr] = isFunc ? options.update : options, _a;
        }
        else {
            if (isFunc) {
                Vue.directive(attr, options.update);
            }
            else {
                Vue.directive(attr, options);
            }
            return Vue.directive(attr);
        }
        var _a;
    };
}
exports.Directive = Directive;
//# sourceMappingURL=VueDirectiveDecorator.js.map