import Vue from 'vue';
import { ComponentOptions } from 'vue-ts-decorate';
import { assign, scopedCss, /*scopedHtml, */insertCss, deleteCss } from './utils/tools';
import {
	parseOptions, parseProps, camelToKebabCase, initOptions,
	cleanOptions, InternalOptions, vueVersion
} from './utils/utilities';

export default function Component(options?: ComponentOptions) {
	let opt: InternalOptions = options || {};
	let tagName = opt.componentTag;
	delete opt.componentTag;
	return (target: any): any => {
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

		if (opt.style && opt.COMP_HASH_ID) {
			let { className, styleText } = scopedCss(opt.style, opt.COMP_HASH_ID);
			opt.style = { class: className, text: styleText, src: opt.style };
			let insertIn = vueVersion === 1 ? 'init' : 'beforeCreate';

			// opt.template = scopedHtml(opt.template, className);

			if (opt.init || opt.beforeMount) {
				let orgMethod = opt.init || opt.beforeMount;
				opt[insertIn] = doStyle('insert', orgMethod);
			} else if (!opt.init || !opt.beforeMount) {
				opt[insertIn] = doStyle('insert');
			}

			if (opt.beforeDestroy) {
				let orgMethod = opt.beforeDestroy;
				opt.beforeDestroy = doStyle('delete', orgMethod);
			} else {
				opt.beforeDestroy = doStyle('delete');
			}
		}

		/*if (vueVersion === 2 && opt.template) {
			if (!opt.render || !opt.staticRenderFns) {
				let renders = Vue['compile'](opt.template);
				opt.render = opt.render || renders.render;
				opt.staticRenderFns = opt.staticRenderFns || renders.staticRenderFns;
				delete opt.template;
			}
		}*/

		if (tagName) {
			tagName = camelToKebabCase(tagName);
			Vue.component(tagName, <any>opt);
			return Vue.component(tagName);
		} else {
			return Vue.extend(<any>opt);
		}
	};
}

function doStyle(action: string, orgMethod?: Function) {
	return function () {
		switch (action) {
			case 'insert':
				insertCss(this.$options.style.class, this.$options.style.text);
				break;
			case 'delete':
				deleteCss(this.$options.style.class);
				break;
		}
		if (orgMethod) {
			orgMethod.call(this);
		}
	};
}
