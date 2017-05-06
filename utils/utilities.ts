import Vue = require('vue');
import { ComponentOptions } from '../types/index';
import { assign, getAllProperties } from './tools';

export const routerHooks = [
	'data', 'deactivate',  'canReuse',
	'canActivate', 'canDeactivate',
];

const vueInstanceHooks = [
	'created', 'destroyed', 'beforeDestroy'
];

export const vue1InstanceHooks = [
	'init', 'beforeCompile', 'compiled',
	'ready', 'attached', 'detached', 'activate'
].concat(vueInstanceHooks);

export const vue2InstanceHooks = [
	'beforeRouteEnter', 'beforeRouteLeave', 'staticRenderFns',
	'activated', 'mounted', 'beforeCreate', 'beforeUpdate',
	'updated', 'deactivated', 'beforeMount', 'render', 'renderError'
].concat(vueInstanceHooks);

export let vueVersion: number = Vue['version'].indexOf('1.') === 0 ? 1 : 2;

export type Constructor = {
	new (...args: any[]): any;
};

export interface InternalOptions extends ComponentOptions {
	data?: Object | Function;
	vuex?: {
		getters?: { [key: string]: Function }
		actions?: { [key: string]: Function }
	};
	router?: Object;
	methods?: { [key: string]: Object };
	computed?: Object;
	props?: Object;
	watch?: { [key: string]: Object };
	events?: { [key: string]: Object };
	[key: string]: any;
}

export function initOptions(options: InternalOptions) {
	if (!options.vuex) options.vuex = {};
	if (!options.router) options.router = {};
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

export function cleanOptions(options: InternalOptions) {
	for (let key in options) {
		if (typeof options[key] === 'object' && Object.keys(options[key]).length === 0) {
			delete options[key];
		}
	}
	return options;
}

export function camelToKebabCase(str: string) {
	let kebab = str.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`);
	if (kebab.charAt(0) === '-') kebab = kebab.substring(1);
	return kebab;
}

export function parseOptions(instance: any, options: InternalOptions, keys?: string[]) {
	if (!keys) {
		keys = getAllProperties(instance);
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
				if (~routerHooks.indexOf(key) && vueVersion === 1) {
					options.router[key] = instance[key];
				} else if (vueVersion === 2) {
					if (~vue2InstanceHooks.indexOf(key)) {
						options[key] = instance[key];
					} else {
						options.methods[key] = instance[key];
					}
				} else {
					if (~vue1InstanceHooks.indexOf(key)) {
						options[key] = instance[key];
					} else {
						options.methods[key] = instance[key];
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
		} else if (key === '$$events' && vueVersion === 1) {
			if (!options.events) options.events = {};
			for (let event in instance.$$events) {
				options.events[event] = instance.$$events[event];
			}
		} else if (key === '$$actions' && vueVersion === 1) {
			if (!options.vuex.actions) options.vuex.actions = {};
			for (let action in instance.$$actions) {
				options.vuex.actions[action] = instance.$$actions[action];
			}
		} else if (key === '$$getters' && vueVersion === 1) {
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

export function parseProps(options: InternalOptions) {
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

	if (options.components) {
		for (let key in options.components) {
			let component = options.components[key];
			delete options.components[key];
			key = camelToKebabCase(key);
			if (component[key]) component = component[key];
			options.components[key] = component;
		}
	}

	return options;
}
