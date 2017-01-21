export { Prop } from './src/PropDecorator';
export { Watch } from './src/WatchDecorator';
export { Mixin } from './src/MixinsDecorator';
export { On, Once } from './src/EventsDecorator';
export { Filter } from './src/VueFilterDecorator';
export { Getter, Action } from './src/VuexDecorator';
export { Directive } from './src/VueDirectiveDecorator';
export { Component } from './src/VueComponentDecorator';

export abstract class VueDirective {
	arg: string;
	name: string;
	vm: Object;
	el: HTMLElement;
	descriptor: any;
	expression: string;
	modifiers: { [key: string]: boolean };
	abstract update(): void;
}