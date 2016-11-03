import { assign } from '../utils/tools';
import {
	Construct, getAllProperties, routerFunctions, parseProps,
	vue1InstanceFunctions, vue2InstanceFunctions, initOptions,
	vueVersion, cleanOptions, parseOptions
} from '../utils/utilities';

export function Mixin(options?: any) {
	if (!options) options = {};
	delete options.tagName;
	return function (target: any) {
		clearObject(target);
		let proto = target.prototype;
		let mixin = initOptions(options);
		let instance = Construct(target);
		let keys = getAllProperties(instance);

		proto['$mixin$'] = proto['$mixin$'] || [];
		proto['$prop$'] = proto['$prop$'] || {};

		mixin = parseOptions(instance, mixin, keys);
		mixin = parseProps(instance, mixin);

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
				delete target.prototype[key]
			}
		}

		for (let key in instance.$$methodsToRemove) {
			delete mixin.methods[instance.$$methodsToRemove[key]]
		}

		mixin = cleanOptions(mixin);

		proto.$mixin$.push(mixin);
		assign(target, mixin);
		return target;
	}
}

function clearObject(target: any) {
	let keys = Object.keys(target);
	for (let key in keys) {
		let prop = keys[key];
		delete target[prop];
	}
}