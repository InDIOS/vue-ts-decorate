import Vue = require('vue');
import { Construct, unCapitalize, vueVersion } from '../utils/utilities';

export function Filter(local) {
	return function (target: any) {
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
		if (local && vueVersion === 1) {
			return { [filter]: options.filter ? options.filter : options };
		} else {
			if (options.filter) {
				Vue.filter(filter, options.filter);
			} else {
				Vue.filter(filter, options);
			}
			return Vue.filter(filter);
		}
	};
}