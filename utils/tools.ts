// An samll implementation of ES6 Set. 
class Set {
	entries: Array<any>;	
	constructor(keys?: Array<any>) {
		this.entries = keys || [];
	}
	add(obj) {
		this.entries.push(obj);
		return this;
	}
	has(obj) {
		return this.entries.indexOf(obj) !== -1;
	}
	delete(obj) {
		let index = this.entries.indexOf(obj);
		if (~index) {
			this.entries.splice(index, 1);
		}
	}
	get size() {
		return this.entries.length;
	}
	toString() {
		return this.entries;
	}
}

// Polifill of ES6 Object.assign function.
export function assign<T, U>(target: T, source: U): T & U;
export function assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;
export function assign<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
export function assign<T, U, V, W, X>(target: T, source1: U, source2: V, source3: W, source4: X): T & U & V & W & X;
export function assign<T, U, V, W, X, Z>(target: T, source1: U, source2: V, source3: W, source4: X, source5: Z): T & U & V & W & X & Z;
export function assign(target: any, ...sources: any[]): any {
	'use strict';
	// We must check against these specific cases.
	if (target === undefined || target === null) {
		throw new TypeError('Cannot convert undefined or null to object');
	}
	let output: any = Object(target);
	for (let index = 0; index < sources.length; index++) {
		let source = sources[index];
		if (source !== undefined && source !== null) {
			for (let nextKey in source) {
				if (source.hasOwnProperty(nextKey) && !isCircular(source[nextKey])) {
					output[nextKey] = source[nextKey];
					if (typeof source[nextKey] === 'object') {
						output[nextKey] = assign({}, source[nextKey]);
					}
				} else {
					output[nextKey] = output;
				}
			}
		}
	}
	return output;
}

// http://stackoverflow.com/a/34909127
function isCircular(obj: any) {
  let detected = false;
  let stackSet = new Set();
  function detect(obj: any) {
    if (typeof obj !== 'object' || stackSet.has(obj)) {
      detected = typeof obj === 'object';
      return;
    }
    stackSet.add(obj);
    for (let k in obj) { //dive on the object's children
			if (obj.hasOwnProperty(k)) {
				detect(obj[k]);
			}
    }
    stackSet.delete(obj);
    return;
  }
  detect(obj);
  return detected;
}