interface WatchOption {
	deep?: boolean;
	immidiate?: boolean;
}

export function Watch(name: string)
export function Watch(name: string, options: WatchOption)
export function Watch(name: string, options?: WatchOption) {
	return function (target: any, key: string) {
		if (!target.$$watch) target.$$watch = {};
		let watched = name;
		let handler: (val: any, oldVal: any) => void = target[key];
		//if watch is called on a function, make sure the function does not end up in methods
		if (typeof handler != 'string') {
			if (!target.$$methodsToRemove) target.$$methodsToRemove = [];
			target.$$methodsToRemove.push(key);
		}
		if (options) {
			target.$$watch[watched] = options;
			target.$$watch[watched].handler = handler;
		} else {
			target.$$watch[watched] = handler;
		}
	}
}