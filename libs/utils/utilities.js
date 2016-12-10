"use strict";
var Vue = require("vue");
var tools_1 = require("./tools");
exports.routerHooks = [
    'data', 'deactivate', 'canReuse',
    'canActivate', 'canDeactivate',
];
var vueInstanceHooks = [
    'created', 'destroyed', 'beforeDestroy'
];
exports.vue1InstanceHooks = [
    'init', 'beforeCompile', 'compiled',
    'ready', 'attached', 'detached', 'activate'
].concat(vueInstanceHooks);
exports.vue2InstanceHooks = [
    'beforeRouteEnter', 'beforeRouteLeave',
    'activated', 'mounted', 'beforeCreate', 'beforeUpdate',
    'updated', 'deactivated', 'beforeMount', 'render'
].concat(vueInstanceHooks);
exports.vueVersion = Vue.version.indexOf('1.') === 0 ? 1 : 2;
function initOptions(options) {
    if (!options.vuex)
        options.vuex = {};
    if (!options.route)
        options.route = {};
    if (!options.mixins)
        options.mixins = [];
    if (!options.methods)
        options.methods = {};
    if (!options.computed)
        options.computed = {};
    if (options.data) {
        if (typeof options.data === 'function') {
            var data = options.data();
            options.data = data;
        }
    }
    else {
        options.data = {};
    }
    return options;
}
exports.initOptions = initOptions;
function cleanOptions(options) {
    if (Object.keys(options.vuex).length === 0) {
        delete options.vuex;
    }
    if (Object.keys(options.route).length === 0) {
        delete options.route;
    }
    if (Object.keys(options.computed).length === 0) {
        delete options.computed;
    }
    if (Object.keys(options.methods).length === 0) {
        delete options.methods;
    }
    if (options.mixins.length === 0) {
        delete options.mixins;
    }
    return options;
}
exports.cleanOptions = cleanOptions;
function camelToKebabCase(str) {
    var kebab = str.replace(/([A-Z])/g, function ($1) { return "-" + $1.toLowerCase(); });
    if (kebab.charAt(0) === '-')
        kebab = kebab.substring(1);
    return kebab;
}
exports.camelToKebabCase = camelToKebabCase;
function unCapitalize(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
exports.unCapitalize = unCapitalize;
function parseOptions(instance, options, keys) {
    if (!keys) {
        keys = [];
        for (var key in instance)
            keys.push(key);
    }
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key.charAt(0) !== '$' && key.charAt(0) !== '_') {
            var prop_desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instance), key);
            if (prop_desc && prop_desc.get) {
                var computed_obj = {};
                if (prop_desc.set) {
                    computed_obj.get = prop_desc.get;
                    computed_obj.set = prop_desc.set;
                }
                else {
                    computed_obj = prop_desc.get;
                }
                options.computed[key] = computed_obj;
            }
            else if (typeof (instance[key]) === 'function') {
                if (key !== 'constructor') {
                    if (~exports.routerHooks.indexOf(key) && exports.vueVersion === 1) {
                        options.route[key] = instance[key];
                    }
                    else if (exports.vueVersion === 2) {
                        if (~exports.vue2InstanceHooks.indexOf(key)) {
                            options[key] = instance[key];
                        }
                        else {
                            options.methods[key] = instance[key];
                        }
                    }
                    else {
                        if (~exports.vue1InstanceHooks.indexOf(key)) {
                            options[key] = instance[key];
                        }
                        else {
                            options.methods[key] = instance[key];
                        }
                    }
                }
            }
            else {
                options.data[key] = instance[key];
            }
        }
        else if (key === '$$props') {
            if (!options.props)
                options.props = {};
            for (var prop in instance.$$props) {
                options.props[prop] = instance.$$props[prop];
            }
        }
        else if (key === '$$watch') {
            if (!options.watch)
                options.watch = {};
            for (var watch in instance.$$watch) {
                options.watch[watch] = instance.$$watch[watch];
            }
        }
        else if (key === '$$events') {
            if (!options.events)
                options.events = {};
            for (var event_1 in instance.$$events) {
                options.events[event_1] = instance.$$events[event_1];
            }
        }
        else if (key === '$$actions' && exports.vueVersion === 1) {
            if (!options.vuex.actions)
                options.vuex.actions = {};
            for (var action in instance.$$actions) {
                options.vuex.actions[action] = instance.$$actions[action];
            }
        }
        else if (key === '$$getters' && exports.vueVersion === 1) {
            if (!options.vuex.getters)
                options.vuex.getters = {};
            for (var getter in instance.$$getters) {
                options.vuex.getters[getter] = instance.$$getters[getter];
            }
        }
        else if (key === '$$filters') {
            if (!options.filters)
                options.filters = {};
            for (var filter in instance.$$filters) {
                options.filters[filter] = instance.$$filters[filter];
            }
        }
    }
    return options;
}
exports.parseOptions = parseOptions;
function parseProps(options) {
    var _loop_1 = function (key) {
        var default_val = options.data[key];
        if (default_val === null || default_val === undefined)
            default_val = options.methods[key];
        if (default_val !== null && default_val !== undefined) {
            if (!options.props[key])
                options.props[key] = {};
            if (typeof default_val === 'function')
                options.props[key].type = Function;
            if (typeof default_val === 'object') {
                var dafault_1 = {};
                dafault_1 = tools_1.assign(default_val, false);
                default_val = function () { return tools_1.assign(dafault_1, false); };
            }
            options.props[key].default = default_val;
        }
        delete options.data[key];
        delete options.methods[key];
    };
    for (var key in options.props) {
        _loop_1(key);
    }
    if (options.directives) {
        for (var key in options.directives) {
            var directive = options.directives[key];
            delete options.directives[key];
            key = camelToKebabCase(key);
            if (directive[key])
                directive = directive[key];
            options.directives[key] = directive;
        }
    }
    return options;
}
exports.parseProps = parseProps;
//# sourceMappingURL=utilities.js.map