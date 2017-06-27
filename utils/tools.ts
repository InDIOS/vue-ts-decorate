// import { walk } from 'paul';
import abs = require('./cssProcesor');
// import { parse, Element } from 'himalaya';
// import { toHTML } from 'himalaya/translate';
// import { camelToKebabCase } from './utilities';
import { StyleObject, StyleRuleObject } from 'vue-ts-decorate';

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

export function parentMethods(target: Function, instance: Object) {
	if (Array.prototype['findIndex']) {
		Object.getOwnPropertyNames(target.prototype).forEach(prop => {
			instance[prop] = target.prototype[prop];
		});
	}
}

export function getAllProperties(obj: any) {
	let curr = obj;
	let allProps: Array<string> = [];
	do {
		let name: string = curr.constructor.name;
		if (name !== 'Object' && name !== 'Vue') {
			let props = Object.getOwnPropertyNames(curr);
			props.forEach(prop => {
				if (!~allProps.indexOf(prop) && prop !== 'constructor')
					allProps.push(prop);
			});
		} else break;
	} while (curr = Object.getPrototypeOf(curr));
	return allProps;
}

export function getDeepValue(object: Object, propertys: string) {
	let keys: string[] = [];
	if (typeof propertys === 'string') {
		keys = propertys.split('.');
	} else {
		throw new Error('Parameter propertys must be a string.');
	}
	return keys.reduce((o, p) => (o || {})[p], object);;
}

// stolen fron vueify/insert-css
export function insertCss(id: string, css: string) {
	let isNew = false;
	let sty = document.head.querySelector('#' + id);
	if (!sty) {
		isNew = true;
		sty = document.createElement('style');
		sty.id = id;
		sty.setAttribute('refs', '1');
	}
	if (sty.textContent !== css) {
		sty.textContent = css;
	}

	if (isNew) {
		document.head.appendChild(sty);
	} else {
		let count = parseInt(sty.getAttribute('refs'), 10);
		count++;
		sty.setAttribute('refs', count.toString());
	}
}

export function deleteCss(id: string) {
	let sty = <HTMLStyleElement>document.head.querySelector('#' + id);
	if (sty) {
		let count = parseInt(sty.getAttribute('refs'), 10);
		count--;
		if (count === 0) {
			document.head.removeChild(sty);
		} else {
			sty.setAttribute('refs', count.toString());
		}
	}
}

// Polifill of ES6 Object.assign function.
export function assign<T, U>(target: T, source: U): T & U;
export function assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;
export function assign<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
export function assign<T, U, V, W, X>(target: T, source1: U, source2: V, source3: W, source4: X): T & U & V & W & X;
export function assign<T, U, V, W, X, Z>(target: T, source1: U, source2: V, source3: W, source4: X, source5: Z): T & U & V & W & X & Z;
export function assign(target: any, ...sources: any[]): any {
	// We must check against these specific cases.
	if (target === undefined || target === null) {
		throw new TypeError('Cannot convert undefined or null to object');
	}
	let output: any = Object(target);
	for (let i = 0; i < sources.length; i++) {
		let source = sources[i];
		if (source !== undefined && source !== null) {
			for (let nextKey in source) {
				if (source.hasOwnProperty(nextKey) && !isCircular(source[nextKey])) {
					output[nextKey] = source[nextKey];
					if (Array.isArray(source[nextKey])) {
						output[nextKey] = source[nextKey].slice();
					} else if (Object.prototype.toString.call(source[nextKey]) === '[object Date]') {
						output[nextKey] = new Date(source[nextKey].valueOf());
					} else if (typeof source[nextKey] === 'object') {
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
function isCircular(obj: Object) {
	let detected = false;
	let stackSet = new Set();
	function detect(obj: Object) {
		if (typeof obj !== 'object' || stackSet.has(obj)) {
			detected = typeof obj === 'object';
			return;
		}
		stackSet.add(obj);
		for (let key in obj) { // dive on the object's children
			if (obj.hasOwnProperty(key)) {
				detect(obj[key]);
			}
		}
		stackSet.delete(obj);
		return;
	}
	detect(obj);
	return detected;
}
/*
export function scopedHtml(html: string, className: string) {
	let tree = parse(html);
	walk(tree, (node: Element, walk: Function) => {
		if (node.tagName && ~node.tagName.indexOf('-')) {
			if (!node.attributes || !node.attributes.className) {
				node.attributes = node.attributes || {};
				node.attributes.className = [className];
			} else {
				node.attributes.className.unshift(className);
			}
			return;
		}
		if (!node.attributes || !node.attributes.className) {
			node.attributes = node.attributes || {};
			if (node.tagName === 'template') {
				let attrs = Object.keys(node.attributes)
					.filter(at => !!~camelToKebabCase(at).indexOf('v-') || at === 'scope') || [];
				if (attrs.length > 0) {
					node.children[0].content = scopedHtml(node.children[0].content, className);
				}
			} else if (node.tagName !== 'script' && node.tagName !== 'style') {
				node.attributes.className = [className];
			}
		} else {
			node.attributes.className.unshift(className);
		}
		walk(node.children || []);
	});
	return toHTML(tree);
}*/

function pad(hash: string, len: number) {
	while (hash.length < len) {
		hash = `0${hash}`;
	}
	return hash;
}

function fold(hash: number, text: string) {
	let i, chr, len;
	if (text.length === 0) {
		return hash;
	}
	for (i = 0, len = text.length; i < len; i++) {
		chr = text.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0;
	}
	return hash < 0 ? hash * -2 : hash;
}

export function hash(value: string) {
	let preHash = fold(0, value);
	if (value === null) {
		preHash = fold(preHash, 'null');
	} else if (value === undefined) {
		preHash = fold(preHash, 'undefined');
	} else {
		preHash = fold(preHash, value.toString());
	}
	return pad(preHash.toString(16), 8);
}

export function scopedCss(style: StyleObject | StyleRuleObject, hash: string) {
	const css = abs({ minify: true });
	let rules = style['rules'] ? <StyleRuleObject>style['rules'] : <StyleRuleObject>style;
	if (style['props']) {
		let props = style['props'];
		for (let prop in props) {
			if (props.hasOwnProperty(prop)) {
				css.prop(prop, props[prop]);
			}
		}
	}
	return css(rules, hash);
}