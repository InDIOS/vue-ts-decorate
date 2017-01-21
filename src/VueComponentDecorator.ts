import {
	parseOptions, parseProps, ComponentOptions,
	camelToKebabCase, initOptions, cleanOptions
} from '../utils/utilities';
import Vue = require('vue/dist/vue.common');
import {
	assign, Construct, scopedCss,
	scopedHtml, getUniquePrefix, insertCss
} from '../utils/tools';

export function Component(options?: ComponentOptions) {
	if (!options) options = {};
	let tagName = options.componentTag;
	let style = options.style;
	let name = options.name;
	delete options.componentTag;
	delete options.style;
	delete options.name;
	return function (target: any) {
		let instance = Construct(target);
		
		options = initOptions(options);
		options = parseOptions(instance, options);
		options = parseProps(options);

		if (instance.$mixin$ && instance.$mixin$.length > 0) {
			options.mixins = options.mixins.concat(instance.$mixin$);
		}		

		for (let key in instance.$$methodsToRemove) {
			delete (<any>options).methods[instance.$$methodsToRemove[key]];
		}

		options = cleanOptions(options);
		let data = (<any>options).data;
		(<any>options).data = () => assign({}, data);

		if (style || (options.template && ~options.template.indexOf('</style>'))) {
			let prefix = getUniquePrefix('vcomp', tagName || name || target.name);
			options.template = scopedHtml(options.template, prefix);
			if (style) {
				style = scopedCss(style, prefix);
				insertCss(prefix, style as string);
			}
		}

		if (Vue.compile && options.template) {
			if (!(<any>options).render || !(<any>options).staticRenderFns) {
				let renders = Vue.compile(options.template);
				(<any>options).render = (<any>options).render || renders.render;
				(<any>options).staticRenderFns = (<any>options).staticRenderFns || renders.staticRenderFns;
				delete options.template;
			}
		}

		if (tagName) {
			tagName = camelToKebabCase(tagName);
			Vue.component(tagName, options);
			return Vue.component(tagName);
		} else {
			return !!options.el ? new Vue(options) : Vue.extend(options);
		}
	};
}
