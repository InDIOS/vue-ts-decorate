import { Constructor } from './utils/utilities';

export interface PropOption {
	type?: Constructor | Constructor[] | null;
	required?: boolean;
	default?: any;
	twoWay?: boolean;
	validator?(value: any): boolean;
	coerce?(value: any): any;
}

export default function Prop(options?: PropOption) {
	return function (target: any, key: string) {
		//create the temp props holder if non existane
		if (!target.$$props) target.$$props = {};

		if (!options) options = null;

		if (!options && target[key]) {
			options = {};
			options['default'] = target[key];
		} else if (options && target[key]) {
			options['default'] = target[key];
		}

		target.$$props[key] = options;
		//remove it from the instance so it is not added to data or methods
		if (!target.$$methodsToRemove) target.$$methodsToRemove = [];
		target.$$methodsToRemove.push(key);
		delete target[key];
	};
}
