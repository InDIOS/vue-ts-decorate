import Vue = require('vue');
import { Construct } from '../utils/tools';
import { camelToKebabCase, vueVersion } from '../utils/utilities';

interface Options {
	deep?: boolean;
	local?: boolean;
	twoWay?: boolean;
	params?: string[];
	priority?: number;
	terminal?: boolean;
	acceptStatement?: boolean;
}

export function Directive(params?: Options) {
	let options: any = {};
	if (params) {
		let local = params.local;
		delete params.local;
		options = params;
		params = local;
	}
	return function (target: any) {
		let instance = Construct(target);

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

		let attr: string = camelToKebabCase(target.name);
		let isFunc = Object.keys(options).length === 1 && options.update;
		if (params && vueVersion === 1) {
			return { [attr]: isFunc ? options.update : options };
		} else {
			if (isFunc) {
				Vue.directive(attr, options.update);
			} else {
				Vue.directive(attr, options);
			}
			return Vue.directive(attr);
		}
	};
}
