import {
	parseOptions, parseProps,
	camelToKebabCase, initOptions, cleanOptions
} from '../utils/utilities';
import Vue = require('vue');
import { assign, Construct, scopedCss, scopedHtml, getUniquePrefix, insertCss } from '../utils/tools';

interface Options extends vuejs.ComponentOption {
	tagName?: string;
	style?: any;
}

export function Component(options?: Options) {
	if (!options) options = {};
	let tagName = options.tagName;
	let style = options.style;
	delete options.tagName;
	delete options.style;
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

		for (let key in instance.$$methodsToRemove) {
			delete options.methods[instance.$$methodsToRemove[key]];
		}

		options = cleanOptions(options);
		let data = options.data;
		options.data = () => assign({}, data);

		if (style || (options.template && ~options.template.indexOf('</style>'))) {
			let prefix = getUniquePrefix('vcomp', tagName || target.name);
			options.template = scopedHtml(options.template, prefix);
			if (style) {
				style = scopedCss(style, prefix);
				insertCss(prefix, style);
			}
		}

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
	};
}
