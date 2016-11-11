"use strict";
var paul_1 = require('paul');
var himalaya_1 = require('himalaya');
var hash = require('hash-sum');
var absurd = require('absurd-css');
var translate_1 = require('himalaya/translate');
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
function Construct(target) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var constructor = function () { return new (target.bind.apply(target, [void 0].concat(args)))(); };
    constructor.prototype = target.prototype;
    return new constructor();
}
exports.Construct = Construct;
function getAllProperties(obj) {
    var curr = obj;
    var allProps = [];
    do {
        var name_1 = curr.constructor.name;
        if (name_1 !== 'Object') {
            var props = Object.getOwnPropertyNames(curr);
            props.forEach(function (prop) {
                if (!~allProps.indexOf(prop) && prop !== 'constructor')
                    allProps.push(prop);
            });
        }
        else
            break;
    } while (curr = Object.getPrototypeOf(curr));
    return allProps;
}
exports.getAllProperties = getAllProperties;
function getValue(object, propertys) {
    var result = null;
    var keys = [];
    if (typeof propertys === 'string') {
        keys = propertys.split('.');
    }
    else {
        throw new Error('Parameter propertys must be a string.');
    }
    var curr = keys.shift();
    if (!!object[curr]) {
        result = object[curr];
        if (typeof result === 'object' && keys.length > 0) {
            result = getValue(result, keys.join('.'));
        }
    }
    return result;
}
exports.getValue = getValue;
function insertCss(id, css) {
    var isNew = false;
    var sty = document.head.querySelector('#' + id);
    if (!sty) {
        isNew = true;
        sty = document.createElement('style');
        sty.setAttribute('type', 'text/css');
        sty.id = id;
    }
    sty.textContent = css;
    if (isNew) {
        document.head.appendChild(sty);
    }
}
exports.insertCss = insertCss;
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
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                detect(obj[key]);
            }
        }
        stackSet.delete(obj);
        return;
    }
    detect(obj);
    return detected;
}
function getUniquePrefix(prefix, secret) {
    return prefix + '-' + hash(secret);
}
exports.getUniquePrefix = getUniquePrefix;
function scopedHtml(html, prefix) {
    var tree = himalaya_1.parse(html);
    paul_1.walk(tree, function (node, walk) {
        if (node.tagName && ~node.tagName.indexOf('-'))
            return;
        if (!node.attributes || !node.attributes.className) {
            node.attributes = node.attributes || {};
            if (node.tagName === 'style') {
                node.attributes.id = prefix;
                node.content = scopedCss(node.content, prefix);
            }
            else if (!/(script|template)/.test(node.tagName)) {
                node.attributes.className = [prefix];
            }
        }
        else {
            node.attributes.className.unshift(prefix);
        }
        walk(node.children || []);
    });
    return translate_1.toHTML(tree);
}
exports.scopedHtml = scopedHtml;
function imports(asd, style) {
    if (typeof style === 'string') {
        asd.importCSS(style);
    }
    else if (typeof style === 'object' || typeof style === 'function') {
        asd.import(style);
    }
}
function scopedCss(style, prefix) {
    prefix = prefix.indexOf('.') !== 0 ? '.' + prefix : prefix;
    var asd = absurd().scope(prefix);
    if (Array.isArray(style)) {
        for (var i = 0; i < style.length; i++) {
            var sty = style[i];
            imports(asd, sty);
        }
    }
    else {
        imports(asd, style);
    }
    return asd.compile({ minify: true });
}
exports.scopedCss = scopedCss;
//# sourceMappingURL=tools.js.map