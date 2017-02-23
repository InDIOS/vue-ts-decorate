declare namespace himalayajs {
	interface Node {
		type: string;
	}

	interface Attributes {
		id?: string;
		title?: string;
		className?: Array<string>;
		[key: string]: any;
	}

	interface Element extends Node {
		tagName?: string;
		content?: string;
		style?: Attributes;
		dataset?: Attributes;
		attributes?: Attributes;
		children?: Array<Element>;
	}
}

declare module 'himalaya' {
	export function parse(html: string): Array<himalayajs.Element>;
}

declare module 'himalaya/translate' {
	export function toHTML(tree: Object): string;
	export function toJade(tree: Object): string;
	export function toPug(tree: Object): string;
}