"use strict";
function Prop(options) {
    return function (target, key) {
        if (!target.$$props)
            target.$$props = {};
        if (!options)
            options = null;
        if (!options && target[key]) {
            options = {};
            options['default'] = target[key];
        }
        else if (options && target[key]) {
            options['default'] = target[key];
        }
        target.$$props[key] = options;
        delete target[key];
    };
}
exports.Prop = Prop;
//# sourceMappingURL=PropDecorator.js.map