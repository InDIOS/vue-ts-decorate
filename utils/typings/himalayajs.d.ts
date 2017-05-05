declare module 'himalaya' {
	export interface Node {
		type: string;
	}

	export interface Attributes {
		id?: string;
		title?: string;
		className?: Array<string>;
		[key: string]: any;
	}

	export interface Element extends Node {
		tagName?: string;
		content?: string;
		style?: Attributes;
		dataset?: Attributes;
		attributes?: Attributes;
		children?: Array<Element>;
	}

	export function parse(html: string): Array<Element>;
}

declare module 'himalaya/translate' {
	export function toHTML(tree: Object): string;
	export function toJade(tree: Object): string;
	export function toPug(tree: Object): string;
}