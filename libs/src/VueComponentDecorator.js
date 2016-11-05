"use strict";
var utilities_1 = require('../utils/utilities');
var Vue = require('vue');
var tools_1 = require('../utils/tools');
function Component(options) {
    if (!options)
        options = {};
    var tagName = options.tagName;
    delete options.tagName;
    return function (target) {
        var instance = utilities_1.Construct(target);
        if (!options.name)
            options.name = target.name;
        options = utilities_1.initOptions(options);
        options = utilities_1.parseOptions(instance, options);
        options = utilities_1.parseProps(instance, options);
        if (instance.$mixin$ && instance.$mixin$.length > 0) {
            options.mixins = options.mixins.concat(instance.$mixin$);
        }
        for (var key in instance.$$methodsToRemove) {
            delete options.methods[instance.$$methodsToRemove[key]];
        }
        options = utilities_1.cleanOptions(options);
        var data = options.data;
        options.data = function () { return tools_1.assign({}, data); };
        if (tagName) {
            tagName = utilities_1.camelToKebabCase(tagName);
            Vue.component(tagName, options);
            return Vue.component(tagName);
        }
        else {
            var el = options.el;
            delete options.el;
            var VueComponent = Vue.extend(options);
            return el ? new VueComponent().$mount(el) : VueComponent;
        }
    };
}
exports.Component = Component;
//# sourceMappingURL=VueComponentDecorator.js.map