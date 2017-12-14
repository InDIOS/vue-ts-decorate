import Vue from 'vue';
import { parentMethods } from './utils/tools';

interface FilterOptions {
	read?: Function;
	write?: Function;
	filter?: Function;
}

export default function Filter(filterName: string, local?: boolean) {
	return function (target: any): any {
		let newInstance = new target();
		parentMethods(target, newInstance);
		let options: FilterOptions = {};
		if (newInstance.filter) {
			options.filter = newInstance.filter.bind(newInstance);
		} else {
			for (let key in newInstance) {
				let isFunc = typeof newInstance[key] === 'function';
				if ((key === 'read' || key === 'write') && isFunc) {
					options[key] = newInstance[key].bind(newInstance);
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
				Vue.filter(filterName, <any>options);
			}
			return Vue.filter(filterName);
		}
	};
}
