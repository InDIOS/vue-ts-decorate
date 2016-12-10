"use strict";
var utilities_1 = require("../utils/utilities");
var Vue = require("vue");
var tools_1 = require("../utils/tools");
function Component(options) {
    if (!options)
        options = {};
    var tagName = options.tagName;
    var style = options.style;
    delete options.tagName;
    delete options.style;
    return function (target) {
        var instance = tools_1.Construct(target);
        if (!options.name)
            options.name = target.name;
        options = utilities_1.initOptions(options);
        options = utilities_1.parseOptions(instance, options);
        options = utilities_1.parseProps(options);
        if (instance.$mixin$ && instance.$mixin$.length > 0) {
            options.mixins = options.mixins.concat(instance.$mixin$);
        }
        for (var key in instance.$$methodsToRemove) {
            delete options.methods[instance.$$methodsToRemove[key]];
        }
        options = utilities_1.cleanOptions(options);
        var data = options.data;
        options.data = function () { return tools_1.assign({}, data); };
        if (style || (options.template && ~options.template.indexOf('</style>'))) {
            var prefix = tools_1.getUniquePrefix('vcomp', tagName || target.name);
            options.template = tools_1.scopedHtml(options.template, prefix);
            if (style) {
                style = tools_1.scopedCss(style, prefix);
                tools_1.insertCss(prefix, style);
            }
        }
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