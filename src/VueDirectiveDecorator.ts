import Vue = require('vue/dist/vue.common');
import { parentMethods } from '../utils/tools';
import { camelToKebabCase, vueVersion } from '../utils/utilities';

export interface DirectiveOptions {
	name: string;
	deep?: boolean;
	local?: boolean;
	twoWay?: boolean;
	params?: string[];
	priority?: number;
	terminal?: boolean;
	paramWatchers?: Object;
	acceptStatement?: boolean;
}

export function Directive(options: DirectiveOptions | string) {
	return function (target: any) {
		if (typeof options === 'string') {
			options = { name: options };
		}
		let local = options.local;
		delete options.local;
		let instance = new target();
		parentMethods(target, instance);
		if (options.params && !options.paramWatchers) options.paramWatchers = {};

		for (let key in instance) {
			let isFunc = typeof instance[key] === 'function';
			if (isFunc) {
				if (~['bind', 'update', 'unbind'].indexOf(key)) {
					options[key] = instance[key];
				} else if (~['inserted', 'componentUpdated'].indexOf(key) && vueVersion === 2) {
					options[key] = instance[key];
				} else if (options.paramWatchers && ~options.params.indexOf(key)) {
					options.paramWatchers[key] = instance[key];
				}
			}
		}

		if (!options.name) {
			console.warn(`[vue-ts-decorate] Property 'name' must be set in directives`);
		}
		
		let attr: string = camelToKebabCase(options.name);
		delete options.name;
		let updateFunc: boolean | Function = Object.keys(options).length === 1 && (<any>options).update;
		if (local) {
			return { [attr]: updateFunc || options };
		} else {
			if (updateFunc) {
				Vue.directive(attr, updateFunc);
			} else {
				Vue.directive(attr, options);
			}
			return Vue.directive(attr);
		}
	};
}
