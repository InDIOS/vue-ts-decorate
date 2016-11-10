import Vue = require('vue');
import { assign } from './tools';

export const routerFunctions = [
	'data', 'deactivate',
	'canActivate', 'canDeactivate', 'canReuse'
];

const vueInstanceFunctions = [
	'created', 'destroyed', 'beforeDestroy'
];

export const vue1InstanceFunctions = [
	'init', 'beforeCompile', 'compiled',
	'ready', 'attached', 'detached', 'activate'
].concat(vueInstanceFunctions);

export const vue2InstanceFunctions = [
	'activated', 'mounted', 'beforeCreate', 'beforeUpdate',
	'updated', 'deactivated', 'beforeMount', 'render'
].concat(vueInstanceFunctions);

export let vueVersion: number = (<any>Vue).version.indexOf('1.') === 0 ? 1 : 2;

export function initOptions(options: any) {
	if (!options.vuex) options.vuex = {};
	if (!options.route) options.route = {};
	if (!options.mixins) options.mixins = [];
	if (!options.methods) options.methods = {};
	if (!options.computed) options.computed = {};
	if (options.data) {
		if (typeof options.data === 'function') {
			let data = options.data();
			options.data = data;
		}
	} else {
		options.data = {};
	}
	return options;
}

export function cleanOptions(options: any) {
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

export function camelToKebabCase(str: string) {
	let kebab = str.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`);
	if (kebab.charAt(0) === '-') kebab = kebab.substring(1);
	return kebab;
}

export function unCapitalize(str: string) {
	return str.charAt(0).toLowerCase() + str.slice(1);
}

export function parseOptions(instance: any, options: any, keys?: string[]) {
	if (!keys) {
		keys = [];
		for (let key in instance) keys.push(key);
	}
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i];
		if (key.charAt(0) !== '$' && key.charAt(0) !== '_') {
			let prop_desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instance), key);
			if (prop_desc && prop_desc.get) {
				let computed_obj: any = {};
				if (prop_desc.set) {
					computed_obj.get = prop_desc.get;
					computed_obj.set = prop_desc.set;
				} else {
					computed_obj = prop_desc.get;
				}
				options.computed[key] = computed_obj;
			}
			else if (typeof (instance[key]) === 'function') {
				if (key !== 'constructor') {
					if (~routerFunctions.indexOf(key)) {
						options.route[key] = instance[key];
					} else if (vueVersion === 2) {
						if (~vue2InstanceFunctions.indexOf(key)) {
							options[key] = instance[key];
						} else {
							options.methods[key] = instance[key];
						}
					} else {
						if (~vue1InstanceFunctions.indexOf(key)) {
							options[key] = instance[key];
						} else {
							options.methods[key] = instance[key];
						}
					}
				}
			} else {
				options.data[key] = instance[key];
			}
		} else if (key === '$$props') {
			if (!options.props) options.props = {};
			for (let prop in instance.$$props) {
				options.props[prop] = instance.$$props[prop];
			}
		} else if (key === '$$watch') {
			if (!options.watch) options.watch = {};
			for (let watch in instance.$$watch) {
				options.watch[watch] = instance.$$watch[watch];
			}
		} else if (key === '$$events') {
			if (!options.events) options.events = {};
			for (let event in instance.$$events) {
				options.events[event] = instance.$$events[event];
			}
		} else if (key === '$$actions') {
			if (!options.vuex.actions) options.vuex.actions = {};
			for (let action in instance.$$actions) {
				options.vuex.actions[action] = instance.$$actions[action];
			}
		} else if (key === '$$getters') {
			if (!options.vuex.getters) options.vuex.getters = {};
			for (let getter in instance.$$getters) {
				options.vuex.getters[getter] = instance.$$getters[getter];
			}
		} else if (key === '$$filters') {
			if (!options.filters) options.filters = {};
			for (let filter in instance.$$filters) {
				options.filters[filter] = instance.$$filters[filter];
			}
		}
	}
	return options;
}

export function parseProps(instance: any, options: any) {
	for (let key in options.props) {
		let default_val = options.data[key];
		if (default_val === null || default_val === undefined)
			default_val = options.methods[key];
		if (default_val !== null && default_val !== undefined) {
			if (!options.props[key])
				options.props[key] = {};
			if (typeof default_val === 'function')
				options.props[key].type = Function;
			if (typeof default_val === 'object') {
				let dafault = {};
				dafault = assign(default_val, false);
				default_val = () => assign(dafault, false);
			}
			options.props[key].default = default_val;
		}
		delete options.data[key];
		delete options.methods[key];
	}

	if (options.directives) {
		for (let key in options.directives) {
			let directive = options.directives[key];
			delete options.directives[key];
			key = camelToKebabCase(key);
			if (directive[key]) directive = directive[key];
			options.directives[key] = directive;
		}
	}

	return options;
}
