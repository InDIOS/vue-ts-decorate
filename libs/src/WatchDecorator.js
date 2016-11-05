"use strict";
function Watch(name, options) {
    return function (target, key) {
        if (!target.$$watch)
            target.$$watch = {};
        var watched = name;
        var handler = target[key];
        if (typeof handler !== 'string') {
            if (!target.$$methodsToRemove)
                target.$$methodsToRemove = [];
            target.$$methodsToRemove.push(key);
        }
        if (options) {
            target.$$watch[watched] = options;
            target.$$watch[watched].handler = handler;
        }
        else {
            target.$$watch[watched] = handler;
        }
    };
}
exports.Watch = Watch;
//# sourceMappingURL=WatchDecorator.js.map