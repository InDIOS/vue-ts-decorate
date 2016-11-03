import Vue = require('vue');
import { Construct, unCapitalize, vueVersion } from '../utils/utilities';

export function Filter(target: any, key?: string, descriptor?: PropertyDescriptor) {
	if (key && descriptor && vueVersion === 1) {
		//create the temp filters holder if non existane
		if (!target.$$filters) target.$$filters = {};
		target.$$filters[key] = target[key];
		//make sure the function does not end up in methods
		if (!target.$$methodsToRemove) target.$$methodsToRemove = [];
		target.$$methodsToRemove.push(key);
	} else if (target && !key && !descriptor) {
		let newInstance = Construct(target);

		let options: any = {};
		if (newInstance.filter) {
			options.filter = newInstance.filter;
		} else {
			for (let key in newInstance) {
				let isFunc = typeof newInstance[key] === 'function';
				if ((key === 'read' || key === 'write') && isFunc) {
					options[key] = newInstance[key];
				}
			}
		}

		let filter: string = unCapitalize(target.name);
		if (options.filter) {
			Vue.filter(filter, options.filter);
		} else {
			Vue.filter(filter, options);
		}
		return Vue.filter(filter);
	}
}