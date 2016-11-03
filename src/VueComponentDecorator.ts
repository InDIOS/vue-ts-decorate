import {
	Construct, parseOptions, parseProps,
	camelToKebabCase, initOptions, cleanOptions
} from '../utils/utilities';
import Vue = require('vue');
import { assign } from '../utils/tools';

interface Options extends vuejs.ComponentOption {
	tagName?: string;
	vuex?: {
		getters?: Object,
		actions?: Object
	};
	route?: Object;
}

export function Component(options?: Options) {
	if (!options) options = {};
	let tagName = options.tagName;
	delete options.tagName;
	return function (target: any) {
		let instance = Construct(target);

		if (!options.name)
			options.name = target.name;
		
		options = initOptions(options);
		options = parseOptions(instance, options);
		options = parseProps(instance, options);

		if (instance.$mixin$ && instance.$mixin$.length > 0) {
			options.mixins = options.mixins.concat(instance.$mixin$);
		}		

		options = cleanOptions(options);
		let data = options.data;
		options.data = () => assign({}, data);

		if (tagName) {
			tagName = camelToKebabCase(tagName);
			Vue.component(tagName, options);
			return Vue.component(tagName);
		} else {
			let el = (<string | HTMLElement>options.el);
			delete options.el;
			let VueComponent = Vue.extend(options);
			return el ? new VueComponent().$mount(el) : VueComponent;
		}
	}
}
