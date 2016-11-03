"use strict";
function On(eventName) {
    return function (target, key, descriptor) {
        if (!target.$$events)
            target.$$events = {};
        target.$$events[eventName] = target[key];
        if (!target.$$methodsToRemove)
            target.$$methodsToRemove = [];
        target.$$methodsToRemove.push(key);
    };
}
exports.On = On;
function Once(eventName) {
    return function (target, key, descriptor) {
        if (!target.$$events)
            target.$$events = {};
        target.$$events[eventName] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            (_a = target[key]).call.apply(_a, [this].concat(args));
            this.$off(eventName, target.$$events[eventName]);
            var _a;
        };
        if (!target.$$methodsToRemove)
            target.$$methodsToRemove = [];
        target.$$methodsToRemove.push(key);
    };
}
exports.Once = Once;
//# sourceMappingURL=EventsDecorator.js.map