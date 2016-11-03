export { Prop } from './src/PropDecorator';
export { Watch } from './src/WatchDecorator';
export { Mixin } from './src/MixinsDecorator';
export { On, Once } from './src/EventsDecorator';
export { Filter } from './src/VueFilterDecorator';
export { Getter, Action } from './src/VuexDecorator';
export { Directive } from './src/VueDirectiveDecorator';
export { Component } from './src/VueComponentDecorator';

export abstract class VueDirective implements vuejs.Directive {
	arg: string;
	name: string;
	vm: vuejs.Vue;
	el: HTMLElement;
	descriptor: any;
	expression: string;
	modifiers: { [key: string]: boolean };
	abstract update(): void;
}