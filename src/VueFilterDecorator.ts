import Vue = require('vue/dist/vue.common');
import { Construct } from '../utils/tools';

interface FilterOptions {
	read?: Function;
	write?: Function;
	filter?: Function;
}

export function Filter(filterName: string, local?: boolean) {
	return function (target: any) {
		let newInstance = Construct(target);

		let options: FilterOptions = {};
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
		
		if (!filterName) {
			console.warn(`[vue-ts-decorate] Parameter 'filterName' must be set in filters`);
		}

		if (local) {
			return { [filterName]: options.filter ? options.filter : options };
		} else {
			if (options.filter) {
				Vue.filter(filterName, options.filter);
			} else {
				Vue.filter(filterName, options);
			}
			return Vue.filter(filterName);
		}
	};
}