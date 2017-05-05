import Vue = require('vue/dist/vue.common');
import { ComponentOptions } from '../types/index';
import { assign, scopedCss, scopedHtml, insertCss, deleteCss } from '../utils/tools';
import {
	parseOptions, parseProps, camelToKebabCase, initOptions,
	cleanOptions, InternalOptions, vueVersion
} from '../utils/utilities';

export function Component(options?: ComponentOptions) {
	let opt: InternalOptions = options || {};
	let tagName = opt.componentTag;
	let style = opt.style;
	delete opt.componentTag;
	delete opt.style;
	return (target: any) => {
		let instance = new target();
		opt = initOptions(opt);
		opt = parseOptions(instance, opt);
		opt = parseProps(opt);

		if (instance.$mixin$ && instance.$mixin$.length > 0) {
			opt.mixins = opt.mixins.concat(instance.$mixin$);
		}

		for (let key in instance.$$methodsToRemove) {
			delete opt.methods[instance.$$methodsToRemove[key]];
		}

		opt = cleanOptions(opt);
		let data = opt.data;
		opt.data = () => assign({}, data);

		if (style && opt.template) {
			let { className, styleText } = scopedCss(style);
			let insertIn = vueVersion === 1 ? 'attached' : 'beforeMount';

			opt.template = scopedHtml(opt.template, className);

			if (opt.attached || opt.beforeMount) {
				let orgMethod = opt.attached || opt.beforeMount;
				opt[insertIn] = insertStyle(className, styleText, orgMethod);
			} else if (!opt.attached || !opt.beforeMount) {
				opt[insertIn] = insertStyle(className, styleText);
			}

			if (opt.beforeDestroy) {
				let orgMethod = opt.beforeDestroy;
				opt.beforeDestroy = deleteStyle(className, orgMethod);
			} else {
				opt.beforeDestroy = deleteStyle(className);
			}
		}

		if (tagName) {
			tagName = camelToKebabCase(tagName);
			Vue.component(tagName, opt);
			return Vue.component(tagName);
		} else {
			return !!opt.el ? new Vue(opt) : Vue.extend(opt);
		}
	};
}

function insertStyle(id: string, style: string, orgMethod?: Function) {
	return function () {
		insertCss(id, style);
		if (orgMethod) {
			orgMethod.call(this);
		}
	};
}

function deleteStyle(id: string, orgMethod?: Function) {
	return function () {
		deleteCss(id);
		if (orgMethod) {
			orgMethod.call(this);
		}
	};
}