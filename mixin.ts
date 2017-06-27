import { parseProps, initOptions, cleanOptions, parseOptions } from './utils/utilities';
import Vue from 'vue';
import { getAllProperties, assign } from './utils/tools';
import { ComponentOptions } from 'vue-ts-decorate';

export interface MixinOptions extends ComponentOptions {
	global?: boolean;
}

export default function Mixin(options?: MixinOptions) {
	if (!options) options = {};
	delete options.componentTag;
	let isGlob = options.global;
	delete options.global;
	return function (target: any) {
		clearObject(target);
		let proto = target.prototype;
		let mixin = initOptions(options);
		let instance = new target();
		let keys = getAllProperties(instance);

		proto['$mixin$'] = proto['$mixin$'] || [];
		proto['$prop$'] = proto['$prop$'] || {};

		mixin = parseOptions(instance, mixin, keys);
		mixin = parseProps(mixin);

		let data = mixin.data;

		Object.keys(data).forEach(key => {
			if (!proto.$prop$[key]) {
				proto.$prop$[key] = instance[key];
			} else if (proto.$prop$[key] && proto.$prop$[key] !== instance[key]) {
				mixin.data[key] = instance[key];
			} else {
				delete data[key];
			}
		});

		if (Object.keys(data).length === 0) {
			delete mixin.data;
		} else {
			mixin.data = () => assign({}, data);
		}

		let keep = ['$$methodsToRemove', '$mixin$', '$prop$', 'constructor'];

		for (let key in target.prototype) {
			if (!~keep.indexOf(key)) {
				delete target.prototype[key];
			}
		}

		for (let key in instance.$$methodsToRemove) {
			delete mixin.methods[instance.$$methodsToRemove[key]];
		}

		mixin = cleanOptions(mixin);

		if (isGlob) {
			Vue.mixin(<any>mixin);
			return;
		}
		proto.$mixin$.push(mixin);
		assign(target, mixin);
		return target;
	};
}

function clearObject(target: any) {
	let keys = Object.keys(target);
	for (let key in keys) {
		let prop = keys[key];
		delete target[prop];
	}
}