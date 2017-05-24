import { hash } from './tools';
import { camelToKebabCase } from './utilities';
import {
	Options, Plugins, CSSGenerator, KeyFramesRule, StyleRuleObject, StyleRules
} from 'vue-ts-decorate';

let newline = '\n';
let defaultOptions = {
	minify: false,
	keepCamelCase: false,
	combineSelectors: true
};

function toCSS(rules: StyleRuleObject, options: Options, indent?: string[]) {
	let css = '';
	indent = indent || options['indent'] || ['', '  '];
	for (let selector in rules) {
		// handling raw content
		if (~selector.indexOf("____raw")) {
			let rawSel = /(____raw_)/.exec(selector)[0];
			css += rules[selector][rawSel] + newline;
			// handling normal styles
		} else {
			let entityStyle = `${indent[0]}${selector} {${newline}`;
			let entity = '';
			for (let prop in rules[selector]) {
				let value = rules[selector][prop];
				if (value === '') {
					value = '""';
				}
				prop = prop.replace(/[$]\d*/, '');
				prop = options && options.keepCamelCase === true ? prop : camelToKebabCase(prop);
				entity += `${indent[1]}${prop}: ${value};${newline}`;
			}
			if (entity !== '') {
				entityStyle += entity;
				entityStyle += `${indent[0]}}${newline}`;
				css += entityStyle;
			}
		}
	}
	return css;
}

// combining selectors
function combineSelectors(rules: StyleRuleObject, preventCombining: string[], keepCamelCase: boolean) {
	let map = [], arr = {};
	preventCombining = [].concat(preventCombining || []);
	preventCombining.splice(0, 0, '');
	let prevent = preventCombining.join('|');
	// extracting every property
	for (let selector in rules) {
		let props = rules[selector];
		for (let prop in props) {
			map.push({
				selector: selector,
				prop: prop,
				value: props[prop],
				combine: prevent.indexOf('|' + prop) < 0 && selector.indexOf('@font-face') < 0
			});
		}
	}
	// combining
	for (let i = 0; i < map.length; i++) {
		if (map[i].combine === true && map[i].selector !== false) {
			for (let j = i + 1; j < map.length; j++) {
				let propi = keepCamelCase ? map[i].prop : camelToKebabCase(map[i].prop);
				let propj = keepCamelCase ? map[j].prop : camelToKebabCase(map[j].prop);
				if (propi === propj && map[i].value === map[j].value) {
					map[i].selector += ', ' + map[j].selector.replace(/[$]\d*/, '');
					map[j].selector = false; // marking for removal
				}
			}
		}
	}
	// preparing the result
	for (let i = 0; i < map.length; i++) {
		if (map[i].selector !== false) {
			if (!arr[map[i].selector]) {
				arr[map[i].selector] = {};
			}
			arr[map[i].selector][map[i].prop] = map[i].value;
		}
	}
	return arr;
}

function minify(content: string) {
	return content
		// Remove comments, newlines and tabs
		.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '')
		// Remove more than single adjacent spaces
		.replace(/ {2,}/g, ' ')
		.replace(/ ([{:}]) /g, '$1')
		.replace(/: /g, ':')
		.replace(/([;,]) /g, '$1')
		.replace(/ !/g, '!');
}

function processor(rules: { [stylesheet: string]: StyleRuleObject }, options?: Options) {
	options = options || defaultOptions;
	let css = '';
	for (let stylesheet in rules) {
		let r = rules[stylesheet];
		r = options.combineSelectors ? combineSelectors(r, options.preventCombining, options.keepCamelCase) : r;
		if (stylesheet === 'mainstream') {
			css += toCSS(r, options);
		} else {
			css += `${stylesheet} {${newline}${toCSS(r, options, ['  ', '    '])}}${newline}`;
		}
	}
	// Minification
	if (options.minify) {
		css = minify(css);
	}
	return css;
}

function abstractStyle(options: Options) {
	const localPlugins: Plugins = {};
	let HASHCLASS = '____HASHCLASS____';

	localPlugins['keyframes'] = keyframes;

	let abtStyle: any = (objRules: Object) => {

		let ruleResgitered = [];
		let allRules = { mainstream: {} };
		options = { ...{ combineSelectors: true, preventCombining: ['@font-face'] }, ...(options || {}) };

		function execPlugins(selector, property, value, stylesheet, parentSelector) {
			let { prop, prefix } = nonPrefixProp(property);
			let plugin = localPlugins[prop];
			if (typeof plugin !== 'undefined') {
				let pluginResponse = plugin(value, prefix);
				if (pluginResponse) {
					addRule(selector, pluginResponse, stylesheet, parentSelector);
				}
				return true;
			} else {
				return false;
			}
		}

		function addRule(selector, props, stylesheet, parentSelector?) {
			stylesheet = stylesheet || 'mainstream';
			// catching null values
			if (props === null || typeof props === 'undefined' || props === false) {
				return;
			}
			if (!parentSelector && !selector) {
				selector = '';
			}
			// classify
			if (typeof props.classify !== 'undefined' && props.classify === true) {
				props = typeof props.toJSON !== 'undefined' ? props.toJSON() : props.toString();
			}
			// multiple selectors
			if (/, ?/g.test(selector) && options.combineSelectors) {
				let parts = selector.replace(/, /g, ',').split(',');
				for (let i = 0; i < parts.length; i++) {
					let p = parts[i];
					addRule(p, props, stylesheet, parentSelector);
				}
				return;
			}
			// check for plugin
			if (execPlugins(null, selector, props, stylesheet, parentSelector)) {
				return;
			}
			// if array is passed
			if (typeof props.length !== 'undefined' && typeof props === 'object') {
				for (let i = 0; i < props.length; i++) {
					let prop = props[i];
					if (prop) {
						addRule(selector, prop, stylesheet, parentSelector);
					}
				}
				return;
			}

			let _props = {},
				_selector = selector,
				_objects = {},
				_functions = {};
			// processing props
			for (let prop in props) {
				// classify
				let value = props[prop];
				if (value && typeof value.classify !== 'undefined' && value.classify === true) {
					value = typeof value.toJSON !== 'undefined' ? value.toJSON() : value.toString();
				}
				let type = typeof value;
				if (type !== 'object' && type !== 'function' && value !== false && value !== true) {
					if (execPlugins(selector, prop, value, stylesheet, parentSelector) === false) {
						// moving the selector to the top of the chain
						if (_selector.indexOf('^') === 0) {
							_selector = _selector.substr(1, _selector.length - 1) + (typeof parentSelector !== 'undefined' ? ' ' + parentSelector : '');
						} else {
							_selector = typeof parentSelector !== 'undefined' ? parentSelector + ' ' + selector : selector;
						}
						_props[prop] = value;
						addPrefixes(prop, _props);
					}
				} else if (type === 'object') {
					_objects[prop] = value;
				} else if (type === 'function') {
					_functions[prop] = value;
				}
			}

			ruleResgitered.push({
				selector: _selector,
				props: _props,
				stylesheet: stylesheet
			});

			for (let prop in _objects) {
				// check for pseudo classes			
				if (prop.charAt(0) === ':') {
					addRule(selector + prop, _objects[prop], stylesheet, parentSelector);
					// check for ampersand operator
				} else if (/&/g.test(prop)) {
					if (/, ?/g.test(prop) && options.combineSelectors) {
						let parts = prop.replace(/, /g, ',').split(',');
						for (let i = 0; i < parts.length; i++) {
							let part = parts[i];
							if (part.indexOf('&') >= 0) {
								addRule(part.replace(/&/g, selector), _objects[prop], stylesheet, parentSelector);
							} else {
								addRule(part, _objects[prop], stylesheet, typeof parentSelector !== 'undefined' ? parentSelector + ' ' + selector : selector);
							}
						}
					} else {
						addRule(prop.replace(/&/g, selector), _objects[prop], stylesheet, parentSelector);
					}
					// check for media query
				} else if (prop.indexOf('@media') === 0 || prop.indexOf('@supports') === 0) {
					addRule(selector, _objects[prop], prop, parentSelector);
					// check for media query
				} else if (selector.indexOf('@media') === 0 || prop.indexOf('@supports') === 0) {
					addRule(prop, _objects[prop], selector, parentSelector);
					// moving the selector to the top of the chain
				} else if (selector.indexOf('^') === 0) {
					// selector, props, stylesheet, parentSelector
					let sel = selector.substr(1, selector.length - 1) + (typeof parentSelector !== 'undefined' ? ' ' + parentSelector : '') + ' ' + prop;
					addRule(sel, _objects[prop], stylesheet);
					// check for plugins
				} else if (execPlugins(selector, prop, _objects[prop], stylesheet, parentSelector) === false) {
					addRule(prop, _objects[prop], stylesheet, (parentSelector ? parentSelector + ' ' : '') + selector);
				}
			}

			for (let prop in _functions) {
				let obj = {};
				obj[prop] = _functions[prop]();
				addRule(selector, obj, stylesheet, parentSelector);
			}
		}

		try {
			let stylesheet = 'mainstream';
			for (let selector in <Object>objRules) {
				addRule(selector, <Object>objRules[selector], stylesheet);
			}
			// looping through the rules for registering
			for (let i = 0; i < ruleResgitered.length; i++) {
				stylesheet = ruleResgitered[i].stylesheet;
				let props = ruleResgitered[i].props;
				let selector = addScope(ruleResgitered[i].selector, `.${HASHCLASS}`);
				// overwrite already added value
				allRules[stylesheet] = allRules[stylesheet] || {};
				let rules = allRules[stylesheet];
				let current = rules[selector] || {};
				for (let prop in props) {
					let value = props[prop];
					if (typeof value !== 'object') {
						if (value.toString().charAt(0) === '+') {
							if (current && current[prop]) {
								current[prop] = current[prop] + ', ' + value.substr(1, value.length - 1);
							} else {
								current[prop] = value.substr(1, value.length - 1);
							}
						} else if (value.toString().charAt(0) === '>') {
							if (current && current[prop]) {
								current[prop] = current[prop] + ' ' + value.substr(1, value.length - 1);
							} else {
								current[prop] = value.substr(1, value.length - 1);
							}
						} else {
							current[prop] = value;
						}
					}
				}
				rules[selector] = current;
			}
		} catch (err) {
			throw new Error('Error adding: ' + JSON.stringify({ rules: objRules, error: err.toString() }));
		}

		let styleText = processor(allRules, options);
		let toHash = minify(styleText.replace(new RegExp(`\\.${HASHCLASS}`, 'g'), ''));
		let className = `scope_${hash(toHash)}`;
		styleText = styleText.replace(new RegExp(HASHCLASS, 'g'), className);

		return { className, styleText };
	};

	abtStyle.prop = (pluginName: string, pluginAction: (value: any) => StyleRules) => {
		localPlugins[pluginName] = pluginAction;
		return abtStyle;
	};

	abtStyle.process = (rules: StyleRuleObject, options: Options) => {
		return processor({ mainstream: rules }, options);
	};

	abtStyle.raw = (rules: StyleRuleObject, options: Options) => {
		return rawContent(processor({ mainstream: rules }, options));
	};

	return <CSSGenerator>abtStyle;
};

export = abstractStyle;

function rawContent(raw: string) {
	let id = '____raw_', object = { [id]: { [id]: raw } };
	return object;
}

function keyframes(value: KeyFramesRule) {
	if (typeof value === 'object') {
		let frames;
		if (typeof value['frames'] !== 'undefined') {
			frames = value['frames'];
		}
		let key = `@keyframes ${value['name']}`;
		let wkey = `@-webkit-keyframes ${value['name']}`;
		let frm = processor({ mainstream: frames }, { combineSelectors: false, indent: ['  ', '    '] });
		return rawContent(`${key} {\n${frm}}\n${wkey} {\n${frm}}`);
	}
}

function removeExtraSpaces(sel) {
	return sel.trim()
		.replace(/\s*(,)\s*/g, '$1')
		.replace(/\s*(>)\s*/g, '$1')
		.replace(/\s*(\+)\s*/g, '$1')
		.replace(/\s*(~)\s*/g, '$1');
}

function include(sel: string) {
	return !!(~sel.indexOf(' ') || ~sel.indexOf(',') || ~sel.indexOf('>') || ~sel.indexOf('+') || ~sel.indexOf('~'));
}

function addScope(sel: string, scope: string) {
	sel = removeExtraSpaces(sel);
	let prefix = sel.charAt(0);
	if (include(sel)) {
		if (~sel.indexOf(' ')) {
			sel = addScopeToList(sel, scope, ' ');
		} else if (~sel.indexOf(',')) {
			sel = addScopeToList(sel, scope, ', ');
		} else if (~sel.indexOf('>')) {
			sel = addScopeToList(sel, scope, ' > ');
		} else if (~sel.indexOf('+')) {
			sel = addScopeToList(sel, scope, ' + ');
		} else if (~sel.indexOf('~')) {
			sel = addScopeToList(sel, scope, ' ~ ');
		}
	} else if (prefix === '.' || prefix === '#' || prefix === '[') {
		sel = scope + sel;
	} else if (~sel.indexOf(':')) {
		let parts = sel.split(':');
		sel = parts[0] + scope + ':' + parts.slice(1).join(':');
	} else if (prefix !== '@') {
		let parts = sel.split(' ');
		sel = parts[0] + scope + ' ' + parts.slice(1).join(' ');
	}
	return sel.trim();
}

function addScopeToList(sel: string, scope: string, sep: string) {
	if (!~sel.indexOf('@')) {
		sel = sel.split(sep !== ' ' ? sep.trim() : sep)
			.map(select => addScope(select, scope)).join(sep);
	}
	return sel;
}

// http://docs.emmet.io/css-abbreviations/vendor-prefixes/ (w: webkit, m: moz, s: ms, o: o)
function prefixExtract(prop: string) {
	let result: { prefix?: string | boolean, prop?: string } = {};
	let match = prop.match(/^\-(w|m|s|o)+\-/);
	if ((match || prop.charAt(0) === '-') && !prop.match(/^\-(webkit|moz|ms)+\-/)) {
		if (match !== null && match[0]) {
			result = { prefix: match[0].replace(/-/g, '') };
			result.prop = prop.replace(match[0], '');
		} else {
			result = { prefix: '' };
			result.prop = prop.substr(1, prop.length);
		}
	} else {
		result = {
			prefix: false,
			prop: prop
		};
	}
	return result;
}

function addPrefixes(prop: string, obj: Object) {
	let originalProp = prop, p = prefixExtract(prop), value = obj[prop];
	if (p.prefix !== false) {
		delete obj[originalProp];
		obj[p.prop] = value;
		let isEmpty = p.prefix === '';
		if (isEmpty || ~(<string>p.prefix).indexOf('w')) {
			obj[`-webkit-${p.prop}`] = value;
		}
		if (isEmpty || ~(<string>p.prefix).indexOf('m')) {
			obj[`-moz-${p.prop}`] = value;
		}
		if (isEmpty || ~(<string>p.prefix).indexOf('s')) {
			obj[`-ms-${p.prop}`] = value;
		}
		if (isEmpty || ~(<string>p.prefix).indexOf('o')) {
			obj[`-o-${p.prop}`] = value;
		}
	}
}

function nonPrefixProp(prop: string) {
	let p = prefixExtract(prop);
	if (p.prefix !== false) {
		if (p.prefix === '') {
			p.prefix = '-';
		} else {
			p.prefix = `-${p.prefix}-`;
		}
	}
	return p;
}