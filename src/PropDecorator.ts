export function Prop(options?: vuejs.PropOption) {
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
		//remove it from the instance so it is not added to data
		delete target[key];
	}
}
