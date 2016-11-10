import { parse } from 'himalaya';
import hash = require('hash-sum');
import absurd = require('absurd-css');
import { walk } from 'paul';
import { toHTML } from 'himalaya/translate';

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

export function Construct(target, ...args) {
	let constructor: any = () => new target(...args);
	constructor.prototype = target.prototype;
	return new constructor();
}

export function getAllProperties(obj: any) {
	let curr = obj;
	let allProps: Array<string> = [];
	do {
		let name: string = curr.constructor.name;
		if (name !== 'Object') {
			let props = Object.getOwnPropertyNames(curr);
			props.forEach(prop => {
				if (!~allProps.indexOf(prop) && prop !== 'constructor')
					allProps.push(prop);
			});
		} else break;
	} while (curr = Object.getPrototypeOf(curr));
	return allProps;
}

export function getValue(object: Object, propertys: string) {
	let result = null;
	let keys: string[] = [];
	if (typeof propertys === 'string') {
		keys = propertys.split('.');
	} else {
		throw new Error('Parameter propertys must be a string.');
	}
	let curr = keys.shift();
	if (!!object[curr]) {
		result = object[curr];
		if (typeof result === 'object' && keys.length > 0) {
			result = getValue(result, keys.join('.'));
		}
	}
	return result;
}

// stolen fron vueify/insert-css
const inserted = {};
export function insertCss(id: string, css: string) {
  if (inserted[id]) return;
  inserted[id] = true;
  let sty = document.createElement('style');
	sty.setAttribute('type', 'text/css');
	sty.id = id;
  sty.textContent = css;
  document.head.appendChild(sty);
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

export function getUniquePrefix(prefix: string, secret: string) {
	return prefix + '-' + hash(secret);
}

export function scopedHtml(html: string, prefix: string) {
	let tree = parse(html);
	walk(tree, (node: himalayajs.Element, walk: Function) => {
		if (node.tagName && ~node.tagName.indexOf('-')) return;
		if (!node.attributes || !node.attributes.className) {
			node.attributes = node.attributes || {};
			if (node.tagName === 'style') {
				node.attributes.id = prefix;
				node.content = scopedCss(node.content, prefix);
			} else if (!/(script|template)/.test(node.tagName)) {
				node.attributes.className = [prefix];
			}
		} else {
			node.attributes.className.unshift(prefix);
		}
		walk(node.children || []);
	});
	return toHTML(tree);
}

function imports(asd: absurdCss.Absurd, style: any) {
	if (typeof style === 'string') {
		asd.importCSS(style);
	} else if (typeof style === 'object' || typeof style === 'function') {
		asd.import(style);
	}
}

export function scopedCss(style: any, prefix: string) {
	prefix = prefix.indexOf('.') !== 0 ? '.' + prefix : prefix;
	let asd = absurd().scope(prefix);
	if (typeof style === 'object' && Array.isArray(style)) {
		for (let i = 0; i < style.length; i++) {
			let sty = style[i];
			imports(asd, sty);
		}
	} else {
		imports(asd, style);
	}
	return asd.compile({ minify: true });
}