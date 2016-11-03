"use strict";
var Set = (function () {
    function Set(keys) {
        this.entries = keys || [];
    }
    Set.prototype.add = function (obj) {
        this.entries.push(obj);
        return this;
    };
    Set.prototype.has = function (obj) {
        return this.entries.indexOf(obj) !== -1;
    };
    Set.prototype.delete = function (obj) {
        var index = this.entries.indexOf(obj);
        if (~index) {
            this.entries.splice(index, 1);
        }
    };
    Object.defineProperty(Set.prototype, "size", {
        get: function () {
            return this.entries.length;
        },
        enumerable: true,
        configurable: true
    });
    Set.prototype.toString = function () {
        return this.entries;
    };
    return Set;
}());
function assign(target) {
    'use strict';
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    var output = Object(target);
    for (var index = 0; index < sources.length; index++) {
        var source = sources[index];
        if (source !== undefined && source !== null) {
            for (var nextKey in source) {
                if (source.hasOwnProperty(nextKey) && !isCircular(source[nextKey])) {
                    output[nextKey] = source[nextKey];
                    if (typeof source[nextKey] === 'object') {
                        output[nextKey] = assign({}, source[nextKey]);
                    }
                }
                else {
                    output[nextKey] = output;
                }
            }
        }
    }
    return output;
}
exports.assign = assign;
function isCircular(obj) {
    var detected = false;
    var stackSet = new Set();
    function detect(obj) {
        if (typeof obj !== 'object' || stackSet.has(obj)) {
            detected = typeof obj === 'object';
            return;
        }
        stackSet.add(obj);
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                detect(obj[k]);
            }
        }
        stackSet.delete(obj);
        return;
    }
    detect(obj);
    return detected;
}
//# sourceMappingURL=tools.js.map