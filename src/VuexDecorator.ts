import { getValue } from '../utils/utilities';

export function Getter(getter: string | Function) {
	return function (target: any, key: string) {
		//create the temp getters holder if non existane
		if (!target.$$getters) target.$$getters = {};
		if (typeof getter === 'function') {
			target.$$getters[key] = getter;
		} else {
			target.$$getters[key] = (state: Object) => {
				return getValue(state, getter);
			};
		}
		//remove it from the instance so it is not added to data
		delete target[key];
	};
}

export function Action(action: Function) {
	return function (target: any, key: string) {
		//create the temp actions holder if non existane
		if (!target.$$actions) target.$$actions = {};
		target.$$actions[key] = action;
		//remove it from the instance so it is not added to data
		delete target[key];
	};
}
