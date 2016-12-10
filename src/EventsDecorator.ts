//@On annotation, takes an event name. this is only valid for methods
export function On(eventName: string) {
	return function (target: any, key: string) {
		//create the temp events holder if non existane
		if (!target.$$events) target.$$events = {};
		target.$$events[eventName] = target[key];
		//make sure the function does not end up in methods
		if (!target.$$methodsToRemove) target.$$methodsToRemove = [];
		target.$$methodsToRemove.push(key);
	};
}

//@Once annotation, same as @On but will remove the handler when fired
export function Once(eventName: string) {
	return function (target: any, key: string) {
		//create the temp props holder if non existane
		if (!target.$$events) target.$$events = {};
		target.$$events[eventName] = function (...args: any[]) {
			target[key].call(this, ...args);
			this.$off(eventName, target.$$events[eventName]);
		};
		//make sure the function does not end up in methods
		if (!target.$$methodsToRemove) target.$$methodsToRemove = [];
		target.$$methodsToRemove.push(key);
	};
}